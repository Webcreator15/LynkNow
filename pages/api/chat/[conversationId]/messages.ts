import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { conversationId } = req.query as { conversationId: string };
  const { userId, content } = req.body as { userId: string; content: string };
  if (!conversationId || !userId || !content?.trim()) {
    return res.status(400).json({ error: "missing fields" });
  }

  const isParticipant = await prisma.conversationParticipant.findFirst({
    where: { conversationId, userId },
  });
  if (!isParticipant) return res.status(403).json({ error: "not a participant" });

  const msg = await prisma.message.create({
    data: { conversationId, senderId: userId, content: content.trim() },
  });

  res.status(200).json(msg);
}

