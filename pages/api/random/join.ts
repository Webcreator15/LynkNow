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

