import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId } = req.body as { userId: string };
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    await prisma.randomQueue.deleteMany({ where: { userId } });
    return res.status(200).json({ ok: true });
  } catch (e: any) {
    return res.status(500).json({ error: String(e) });
  }
}

