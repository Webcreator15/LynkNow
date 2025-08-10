import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head><title>LynkNow — Accueil</title><meta name="description" content="Rencontres amoureuses et amicales avec chat aléatoire anonyme." /></Head>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rencontres, maintenant.</h1>
          <p className="text-gray-600 mb-8">Un seul compte, deux profils : <b>Amour</b> et <b>Amitié</b>. Et un <b>chat aléatoire anonyme</b> qui protège votre identité jusqu’au consentement mutuel.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/signin" className="bg-[var(--lynk-red)] text-white px-5 py-3 rounded-lg hover:bg-red-600">Se connecter</Link>
            <Link href="/signup" className="px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50">S’inscrire</Link>
          </div>
        </section>
      </main>
    </>
  );
}
