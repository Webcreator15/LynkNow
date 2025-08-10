import Head from "next/head";
import Header from "../components/Header";
import RequireAuth from "../components/RequireAuth";
import Tabs from "../components/Tabs";
import ProfileCard from "../components/ProfileCard";

export default function Friendship() {
  return (
    <>
      <Head><title>Amitié — LynkNow</title></Head>
      <Header />
      <RequireAuth>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Tabs />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileCard name="Thomas" age={27} city="Toulouse, France" img="https://images.unsplash.com/photo-1600486913747-55e0876a2b2a?q=80&w=1200&auto=format&fit=crop" bio="Fan de jeux vidéo & techno. Cherche des amis pour jouer et discuter." />
            <ProfileCard name="Léa" age={24} city="Bordeaux, France" img="https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1200&auto=format&fit=crop" bio="Droit, lecture, sorties culturelles." />
          </div>
        </main>
      </RequireAuth>
    </>
  );
}
