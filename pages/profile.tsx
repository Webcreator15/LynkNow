import Head from "next/head";
import Header from "../components/Header";
import RequireAuth from "../components/RequireAuth";
import { useState } from "react";

export default function Profile() {
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  return (
    <>
      <Head><title>Profil — LynkNow</title></Head>
      <Header />
      <RequireAuth>
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-4">Profil général</h1>
            <form className="grid md:grid-cols-2 gap-4" onSubmit={(e)=>{e.preventDefault(); alert("Enregistré (démo)");}}>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">Ville</span>
                <input value={city} onChange={e=>setCity(e.target.value)} type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Paris" />
              </label>
              <label className="md:col-span-2 block">
                <span className="block text-sm font-medium text-gray-700 mb-1">Bio</span>
                <textarea value={bio} onChange={e=>setBio(e.target.value)} className="w-full border rounded-lg px-4 py-2" rows={4} placeholder="Votre description…" />
              </label>
              <div className="md:col-span-2"><button className="bg-[var(--lynk-red)] text-white px-4 py-2 rounded-lg">Enregistrer</button></div>
            </form>
          </section>
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-3">Profils dédiés</h2>
            <p className="text-gray-600 mb-4">Créez un profil spécifique pour chaque intention.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Amour</h3>
                  <button className="text-sm px-3 py-1 rounded bg-red-50 text-[var(--lynk-red)] hover:bg-red-100">Créer / Éditer</button>
                </div>
              </div>
              <div className="border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Amitié</h3>
                  <button className="text-sm px-3 py-1 rounded bg-red-50 text-[var(--lynk-red)] hover:bg-red-100">Créer / Éditer</button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </RequireAuth>
    </>
  );
}
