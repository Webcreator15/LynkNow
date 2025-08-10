import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status, router]);
  if (status !== "authenticated") return <div className="p-6 text-center text-gray-500">Chargement…</div>;
  return <>{children}</>;
}
