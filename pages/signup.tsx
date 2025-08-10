import Head from "next/head";
import Header from "../components/Header";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    if (res.ok) router.push("/signin");
    else alert("Inscription impossible");
  }

  return (
    <>
      <Head><title>S’inscrire — LynkNow</title></Head>
      <Header />
      <main className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Créer un compte</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <input type="text" placeholder="Prénom" className="w-full border rounded-lg px-4 py-2" value={name} onChange={e=>setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-2" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" className="w-full border rounded-lg px-4 py-2" value={password} onChange={e=>setPassword(e.target.value)} required />
          <button className="w-full bg-[var(--lynk-red)] text-white py-2 rounded-lg">S’inscrire</button>
        </form>
      </main>
    </>
  );
}
