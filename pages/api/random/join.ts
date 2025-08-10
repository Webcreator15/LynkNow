import { PrismaClient, IntentType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, intent = 'CHAT' } = req.body as { userId: string; intent?: IntentType };
  if (!userId) return res.status(400).json({ error: 'userId required' });

  try {
    const result = await prisma.$transaction(async (tx) => {
      const other = await tx.randomQueue.findFirst({
        where: { intent, NOT: { userId } },
        orderBy: { enqueuedAt: 'asc' },
      });

      if (!other) {
        await tx.randomQueue.upsert({
          where: { userId },
          update: { intent, enqueuedAt: new Date() },
          create: { userId, intent },
        });
        return { matched: false as const };
      }

      const conv = await tx.conversation.create({ data: {} });

      await tx.conversationParticipant.createMany({
        data: [
          { conversationId: conv.id, userId },
          { conversationId: conv.id, userId: other.userId },
        ],
      });

      await tx.randomQueue.deleteMany({ where: { userId: { in: [userId, other.userId] } } });

      return { matched: true as const, conversationId: conv.id, peerId: other.userId };
    });

    res.status(200).json(result);
  } catch (e: any) {
    res.status(500).json({ error: String(e) });
  }
}

import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId } = req.body as { userId: string };
  if (!userId) return res.status(400).json({ error: 'userId required' });

  try {
    console.log('[JOIN] userId=', userId);

    // Chercher quelqu’un d’autre dans la file
    const other = await prisma.randomQueue.findFirst({
      where: { NOT: { userId } },
      orderBy: { enqueuedAt: 'asc' },
    });
    console.log('[JOIN] other found =', other?.userId ?? null);

    if (!other) {
      // Me mettre (ou me remettre) dans la file
      const up = await prisma.randomQueue.upsert({
        where: { userId },
        update: { enqueuedAt: new Date() },
        create: { userId },
      });
      console.log('[JOIN] queued =', up.userId);
      return res.status(200).json({ matched: false });
    }

    // Créer la conversation et les 2 participants
    const conv = await prisma.conversation.create({ data: {} });
    console.log('[JOIN] conversation created =', conv.id);

    await prisma.conversationParticipant.createMany({
      data: [
        { conversationId: conv.id, userId },
        { conversationId: conv.id, userId: other.userId },
      ],
    });
    console.log('[JOIN] participants created');

    // Vider la file pour ces 2 users
    await prisma.randomQueue.deleteMany({ where: { userId: { in: [userId, other.userId] } } });
    console.log('[JOIN] queue cleaned');

    return res.status(200).json({ matched: true, conversationId: conv.id, peerId: other.userId });
  } catch (e: any) {
    console.error('[JOIN][ERROR]', e);
    return res.status(500).json({ error: String(e) });
  }
}

