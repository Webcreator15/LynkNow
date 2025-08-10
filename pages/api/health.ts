import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r: any = await prisma.$queryRaw`SELECT NOW() as now`;
    res.status(200).json({ ok: true, now: r[0].now });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: String(e) });
  }
}
