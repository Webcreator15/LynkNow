import Head from "next/head";
import Header from "../components/Header";
import RequireAuth from "../components/RequireAuth";

export default function Settings() {
  return (
    <>
      <Head><title>Paramètres — LynkNow</title></Head>
      <Header />
      <RequireAuth>
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
            <div className="space-y-6">
              <fieldset className="border rounded-xl p-4">
                <legend className="font-semibold">Confidentialité</legend>
                <label className="flex items-center gap-3 mt-2"><input type="checkbox" className="w-4 h-4" /> Cacher ma distance</label>
                <label className="flex items-center gap-3 mt-2"><input type="checkbox" className="w-4 h-4" /> Cacher mon statut en ligne</label>
                <label className="flex items-center gap-3 mt-2"><input type="checkbox" className="w-4 h-4" /> N’accepter que les messages de mes matchs</label>
              </fieldset>
            </div>
          </section>
        </main>
      </RequireAuth>
    </>
  );
}
