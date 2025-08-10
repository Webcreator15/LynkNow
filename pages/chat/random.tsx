import { useEffect, useRef, useState } from 'react';

export default function RandomChat() {
  const [userId] = useState(() => crypto.randomUUID()); // TODO: remplace par l'id de l'utilisateur connecté
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [joining, setJoining] = useState(false);

  async function join() {
    setJoining(true);
    const r = await fetch('/api/random/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, intent: 'CHAT' }),
    }).then(r => r.json());
    setJoining(false);
    if (r.matched) setConversationId(r.conversationId);
    else alert("En attente d'un partenaire… ouvre un 2e onglet et clique aussi sur Rejoindre 😉");
  }

  async function leave() {
    await fetch('/api/random/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    setConversationId(null);
    setMessages([]);
  }

  async function send() {
    if (!conversationId || !inputRef.current?.value) return;
    const content = inputRef.current.value.trim();
    if (!content) return;
    inputRef.current.value = '';
    await fetch(`/api/chat/${conversationId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderId: userId, content }),
    });
  }

  // Polling simple (1s) — on passera en temps réel ensuite
  useEffect(() => {
    if (!conversationId) return;
    let alive = true;
    (async () => {
      while (alive) {
        const data = await fetch(`/api/chat/${conversationId}/messages`).then(r => r.json());
        setMessages(data);
        await new Promise(r => setTimeout(r, 1000));
      }
    })();
    return () => { alive = false; };
  }, [conversationId]);

  return (
    <div style={{ maxWidth: 640, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Chat aléatoire</h1>
      {!conversationId ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={join} disabled={joining}>{joining ? 'Recherche…' : 'Rejoindre'}</button>
          <button onClick={leave}>Quitter la file</button>
        </div>
      ) : (
        <>
          <div style={{ border: '1px solid #ddd', padding: 12, height: 320, overflowY: 'auto', margin: '12px 0' }}>
            {messages.map((m: any) => (
              <div key={m.id} style={{ margin: '6px 0' }}>
                <b>{m.senderId === userId ? 'Moi' : 'Partenaire'}</b>: {m.content}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input ref={inputRef} placeholder="Votre message…" style={{ flex: 1 }} />
            <button onClick={send}>Envoyer</button>
            <button onClick={leave}>Terminer</button>
          </div>
        </>
      )}
      <p style={{ opacity: .5, marginTop: 8 }}>id (temporaire) : {userId}</p>
    </div>
  );
}

