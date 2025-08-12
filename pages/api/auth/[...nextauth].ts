import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export default NextAuth({
  debug: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
            });

        if (!user) return null;

    
        const hashed = (user as any).password ?? (user as any).passwordHash ?? null;
        if (!hashed) return null;

        const ok = await bcrypt.compare(credentials.password, String(hashed));
        if (!ok) return null;

        // NextAuth a besoin d'un objet minimal { id, name, email }
        return { id: String(user.id), name: user.name ?? user.email, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});

