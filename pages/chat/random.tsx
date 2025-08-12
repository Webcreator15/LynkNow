"use client";
// pages/chat/random.tsx
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import { useSession } from "next-auth/react";

type Msg = { id: string; senderId: string; content: string; createdAt: string };

export default function RandomChatPage() {
  // const { data } = useSession();
  // const userId = data?.user?.id as string | undefined;

  // Pour tester sans login :
  const [userId] = useState(() => "user_" + Math.floor(Math.random() * 100000));

  const [status, setStatus] = useState<"search" | "chat" | "error">("search");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  // ✅ Ref du poll, typée proprement
  const pollRef = useRef<number | null>(null);

  // 1) JOIN queue & match
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    let joinTimeout: number | undefined;

    const tryJoin = async () => {
      try {
        const res = await fetch("/api/random/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // tu peux ajouter intent: "CHAT" si tu gères les intentions côté API
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (cancelled) return;

        if (data.matched) {
          setConversationId(data.conversationId);
          setPeerId(data.peerId ?? null);
          setStatus("chat");
        } else {
          // pas encore de pair → on retente
          joinTimeout = window.setTimeout(tryJoin, 2500);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setStatus("error");
      }
    };

    tryJoin();

    // LEAVE la queue si on quitte la page
    return () => {
      cancelled = true;
      if (joinTimeout) window.clearTimeout(joinTimeout);

      fetch("/api/random/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }).catch(() => {});

      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [userId]);

  // 2) Polling des messages quand la conversation est créée
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const res = await fetch(`/api/chat/${conversationId}/messages`);
      const data = (await res.json()) as Msg[];
      setMessages(data);
    };

    fetchMessages();
    pollRef.current = window.setInterval(fetchMessages, 2000);

    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [conversationId]);

  // 3) Envoyer un message
  const send = async () => {
    if (!conversationId || !input.trim() || !userId) return;
    const content = input.trim();
    setInput("");

    // rendu optimiste
    setMessages((m) => [
      ...m,
      {
        id: "temp-" + Date.now(),
        senderId: userId,
        content,
        createdAt: new Date().toISOString(),
      },
    ]);

    await fetch(`/api/chat/${conversationId}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, content }),
    }).catch((e) => {
      console.error(e);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Onglets comme /love /friendship /chat aléatoire */}
      <div className="flex gap-6 mb-6 border-b pb-2 text-sm">
        <Link href="/love" className="text-gray-500 hover:text-gray-900">
          Amour
        </Link>
        <Link href="/friendship" className="text-gray-500 hover:text-gray-900">
          Amitié
        </Link>
        <span className="font-semibold text-rose-600">Chat aléatoire</span>
      </div>

      {status === "search" && (
        <div className="rounded-2xl border p-8 text-center">
          <p className="text-lg">Recherche d’un partenaire…</p>
          <p className="text-gray-500 mt-2">
            Reste sur cette page, on te connecte dès que possible.
          </p>
          <div className="animate-pulse mt-6 text-3xl">💬</div>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-2xl border p-8 text-center text-red-600">
          Une erreur est survenue. Réessaie plus tard.
        </div>
      )}

      {status === "chat" && conversationId && (
        <div className="rounded-2xl border p-4 flex flex-col h-[70vh]">
          <div className="border-b pb-3 mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Conversation</div>
              <div className="font-semibold">
                Anonyme avec {peerId ?? "?"}
              </div>
            </div>
            <button
              className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-50"
              onClick={() => location.reload()}
              title="Quitter et recommencer"
            >
              Quitter
            </button>
          </div>

          <div className="flex-1 overflow-auto space-y-2">
            {messages.map((m) => {
              const mine = m.senderId === userId;
              return (
                <div
                  key={m.id}
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    mine ? "ml-auto bg-rose-600 text-white" : "bg-gray-100"
                  }`}
                >
                  <div className="text-sm">{m.content}</div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t flex gap-2">
            <input
              className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-200"
              placeholder="Écrire un message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              onClick={send}
              className="px-4 py-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

