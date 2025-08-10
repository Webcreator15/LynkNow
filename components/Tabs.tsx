import Link from "next/link";
import { Heart, Users, MessageSquare } from "lucide-react";
import { useRouter } from "next/router";

export default function Tabs() {
  const { pathname } = useRouter();
  const active = (path: string) => pathname === path ? "tab-active" : "text-gray-600";
  return (
    <div className="flex border-b border-gray-200 mb-6" role="tablist" aria-label="Sections LynkNow">
      <Link href="/love" className={`px-6 py-3 text-sm font-medium ${active("/love")}`}>
        <span className="inline-flex items-center"><Heart className="w-4 h-4 mr-2"/>Amour</span>
      </Link>
      <Link href="/friendship" className={`px-6 py-3 text-sm font-medium ${active("/friendship")}`}>
        <span className="inline-flex items-center"><Users className="w-4 h-4 mr-2"/>Amitié</span>
      </Link>
      <Link href="/chat" className={`px-6 py-3 text-sm font-medium ${active("/chat")}`}>
        <span className="inline-flex items-center"><MessageSquare className="w-4 h-4 mr-2"/>Chat aléatoire</span>
      </Link>
    </div>
  );
}
