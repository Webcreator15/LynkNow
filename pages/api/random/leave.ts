import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId } = req.body as { userId: string };
  if (!userId) return res.status(400).json({ error: 'userId required' });

  await prisma.randomQueue.deleteMany({ where: { userId } });
  res.status(200).json({ ok: true });
}

