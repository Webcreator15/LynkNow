import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { conversationId } = req.query as { conversationId: string };
  const since = req.query.since ? new Date(String(req.query.since)) : null;

  if (!conversationId) return res.status(400).json({ error: 'conversationId required' });

  try {
    const msgs = await prisma.message.findMany({
      where: { conversationId, ...(since ? { createdAt: { gt: since } } : {}) },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });
    res.status(200).json(msgs);
  } catch (e: any) {
    res.status(500).json({ error: String(e) });
  }
}

