import Head from "next/head";
import Header from "../components/Header";
import RequireAuth from "../components/RequireAuth";
import Tabs from "../components/Tabs";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{me:boolean; text:string; time:string}[]>([
    { me:false, text:"Hey there! How are you doing today?", time:"10:30" },
    { me:true, text:"I'm good, thanks! Just finished work.", time:"10:32" }
  ]);
  const [text, setText] = useState("");

  function send() {
    if(!text.trim()) return;
    const t = new Date().toTimeString().slice(0,5);
    setMessages(prev => [...prev, { me:true, text, time:t }]);
    setText("");
    setTimeout(()=> setMessages(prev => [...prev, { me:false, text:"Réponse auto (démo) 😉", time:new Date().toTimeString().slice(0,5) }]), 800);
  }

  return (
    <>
      <Head><title>Chat — LynkNow</title></Head>
      <Header />
      <RequireAuth>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Tabs />
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm" aria-label="Liste des conversations">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-lg">Chats</h3>
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop" alt="" className="w-12 h-12 rounded-full object-cover" />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">User123</h4>
                      <p className="text-sm text-gray-500">Online</p>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">2 min</div>
                  </div>
                </li>
              </ul>
              <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-[var(--lynk-red)] text-white py-2 rounded-lg hover:bg-red-600">Nouveau chat aléatoire</button>
              </div>
            </aside>

            <section className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm flex flex-col" aria-label="Conversation active" style={{height:'calc(100vh - 250px)'}}>
              <header className="p-4 border-b border-gray-200 flex items-center">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop" alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="ml-3"><h4 className="font-medium">User123</h4><p className="text-xs text-gray-500">En ligne</p></div>
              </header>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m, i)=> (
                  <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
                    <div className={`chat-bubble rounded-lg p-3 ${m.me ? "bg-[var(--lynk-red)] text-white" : "bg-gray-100"}`}>
                      <p>{m.text}</p>
                      <p className={`text-xs mt-1 ${m.me ? "text-white/80" : "text-gray-500"}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={(e)=>{e.preventDefault(); send();}} className="flex items-center">
                  <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Écrire un message…" className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[var(--lynk-red)] focus:border-transparent" />
                  <button type="submit" className="ml-2 text-gray-700 hover:text-[var(--lynk-red)]">Envoyer</button>
                </form>
                <div className="mt-2 flex justify-center">
                  <button className="bg-[var(--lynk-red)] text-white px-4 py-2 rounded-lg hover:bg-red-600">Lever l’anonymat</button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </RequireAuth>
    </>
  );
}
