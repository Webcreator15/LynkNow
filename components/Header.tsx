import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Heart, MessageCircle, Settings, User } from "lucide-react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Accueil LynkNow">
          <Heart className="text-lynk-red w-8 h-8 mr-2" />
          <span className="text-2xl font-bold text-[var(--lynk-red)]">Lynk<span className="text-black">Now</span></span>
        </Link>
        <nav aria-label="Navigation principale">
          <ul className="flex items-center gap-4">
            <li><Link className="text-gray-600 hover:text-[var(--lynk-red)]" href="/chat" aria-label="Messages"><MessageCircle className="w-6 h-6" /></Link></li>
            <li><Link className="text-gray-600 hover:text-[var(--lynk-red)]" href="/profile" aria-label="Mon profil"><User className="w-6 h-6" /></Link></li>
            <li><Link className="text-gray-600 hover:text-[var(--lynk-red)]" href="/settings" aria-label="Paramètres"><Settings className="w-6 h-6" /></Link></li>
            {session ? (
              <li><button className="text-gray-600 hover:text-[var(--lynk-red)]" onClick={()=>signOut()}>Se déconnecter</button></li>
            ) : (
              <li><Link href="/signin" className="text-gray-600 hover:text-[var(--lynk-red)]">Se connecter</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
