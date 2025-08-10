import Head from "next/head";
import Header from "../components/Header";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/love" });
  }

  return (
    <>
      <Head><title>Se connecter — LynkNow</title></Head>
      <Header />
      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Connexion</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" className="w-full border rounded-lg px-4 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="w-full bg-[var(--lynk-red)] text-white py-2 rounded-lg">Se connecter</button>
        </form>
        <div className="my-4 text-center text-gray-500">ou</div>
        <button onClick={()=>signIn("google", { callbackUrl: "/love" })} className="w-full border py-2 rounded-lg hover:bg-gray-50">Continuer avec Google</button>
      </main>
    </>
  );
}
