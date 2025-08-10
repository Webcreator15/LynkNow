# LynkNow — Next.js MVP

MVP complet : Next.js (pages router) + NextAuth (credentials + Google) + Prisma (Postgres) + Tailwind + pages Amour/Amitié/Chat.

## ⚙️ Installation

```bash
npm install
cp .env.example .env
# Éditez .env (DATABASE_URL, NEXTAUTH_SECRET, etc.)
npx prisma migrate dev --name init
npm run dev
```

Ouvrez http://localhost:3000

## 🔐 Comptes

- Inscription : /signup (crée un utilisateur avec email/mot de passe)
- Connexion : /signin (credentials ou Google si configuré)

## 🗄️ Base de données (PostgreSQL)

- Hébergement conseillé : Neon, Supabase.
- Migrations :
  - Dev : `npx prisma migrate dev`
  - Prod : `npm run migrate:deploy`

## 🚀 Déploiement (Vercel + Neon)

1. Poussez le repo sur GitHub.
2. Importez sur **Vercel**.
3. Ajoutez les **variables d’environnement** :
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (ex: https://lynknow.vercel.app)
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (optionnel)
4. Build & Deploy.
5. Exécutez les migrations :
   ```bash
   DATABASE_URL="postgres://..." npx prisma migrate deploy
   ```

## 📡 Temps réel (optionnel)

Intégrez **Pusher** ou **Supabase Realtime**. Un stub `lib/pusher.ts` est fourni.

## 🧩 Structure

- `pages` : routes UI + API NextAuth + signup
- `components` : Header, Tabs, RequireAuth, ProfileCard
- `lib` : Prisma, Auth, Pusher stub
- `prisma/schema.prisma` : modèles (User, Profile, Conversation, Message, ...)

## 🔒 RGPD (à prévoir)

- Export/suppression des données, mentions légales, bannière cookies selon besoin.
