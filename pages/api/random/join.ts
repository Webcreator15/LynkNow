
import { prisma } from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { IntentType } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, intent = IntentType.CHAT } = req.body as {
    userId: string;
    intent?: IntentType;
  };
  if (!userId) return res.status(400).json({ error: "userId required" });

  try {
    const result = await prisma.$transaction(async (tx) => {
      // chercher un autre user déjà en file pour le même intent
      const other = await tx.randomQueue.findFirst({
        where: { intent, NOT: { userId } },
        orderBy: { enqueuedAt: "asc" },
      });

      // si personne, on (ré)ajoute l’utilisateur à la file puis on sort
      if (!other) {
        await tx.randomQueue.upsert({
          where: { userId },
          update: { intent, enqueuedAt: new Date() },
          create: { userId, intent },
        });
        return { matched: false as const };
      }

      // créer la conversation + 2 participants
      const conv = await tx.conversation.create({ data: {} });
      await tx.conversationParticipant.createMany({
        data: [
          { conversationId: conv.id, userId },
          { conversationId: conv.id, userId: other.userId },
        ],
      });

      // vider la file pour ces 2 users
      await tx.randomQueue.deleteMany({
        where: { userId: { in: [userId, other.userId] } },
      });

      return {
        matched: true as const,
        conversationId: conv.id,
        peerId: other.userId,
      };
    });

    return res.status(200).json(result);
  } catch (e: any) {
    console.error("[JOIN][ERROR]", e);
    return res.status(500).json({ error: "internal_error" });
  }
}

