import Head from "next/head";
import Header from "../components/Header";
import RequireAuth from "../components/RequireAuth";
import Tabs from "../components/Tabs";
import ProfileCard from "../components/ProfileCard";

export default function Love() {
  return (
    <>
      <Head><title>Amour — LynkNow</title></Head>
      <Header />
      <RequireAuth>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Tabs />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCard name="Sophie" age={28} city="Paris, France" img="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop" bio="Passionnée d'art et de voyages. Je cherche quelqu'un pour partager des moments simples." />
            <ProfileCard name="Clara" age={25} city="Lyon, France" img="https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1200&auto=format&fit=crop" bio="Étudiante en médecine, nature & animaux. Relation sérieuse." />
            <ProfileCard name="Emma" age={30} city="Marseille, France" img="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1200&auto=format&fit=crop" bio="Cheffe cuisinière, curieuse et ouverte." />
          </div>
        </main>
      </RequireAuth>
    </>
  );
}
