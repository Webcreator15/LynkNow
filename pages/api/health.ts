import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const r = await prisma.$queryRaw<{ now: Date }[]>`SELECT NOW() as now`;
    return res.status(200).json({ ok: true, now: r[0].now });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
}

