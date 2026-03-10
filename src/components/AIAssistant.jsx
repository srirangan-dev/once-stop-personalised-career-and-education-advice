import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "📐 Explain Pythagoras theorem",
  "⚗️ What is photosynthesis?",
  "📊 Difference between mean & median",
  "🧬 What is DNA replication?",
  "⚡ Explain Ohm's Law simply",
  "📜 What caused World War I?"
];

const SYSTEM_PROMPT = `You are PathFinder's AI study assistant for Indian students (Class 9–College).
STRICT RULES:
1. ONLY answer academic questions.
2. If not study related reply: "I can only help with study-related questions. Try asking me about a subject! 📚"
3. Keep answers SHORT (3–5 sentences).
4. Use bullet points only when needed.
5. No introductions. No repeating questions.
6. Use CBSE/ICSE context when possible.
7. End with one helpful tip.
8. Max 1–2 emojis.`;

// ✅ Hardcoded for dev — change to "" when deployed on same domain
const BASE_URL = "";

async function callAI(apiMessages) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: apiMessages, system: SYSTEM_PROMPT })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Server error ${res.status}`);
  }

  const data = await res.json();
  if (!data.reply) throw new Error("Empty response from server");
  return data.reply;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! 👋 I'm your PathFinder Study AI. Ask me any subject doubt! 📚" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.slice(1).map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content
      }));
      const reply = await callAI(apiMessages);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `⚠️ ${err.message}`
      }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: 25, right: 25,
          width: 60, height: 60, borderRadius: "50%",
          border: "none", fontSize: 24,
          background: open ? "#ea580c" : "#f97316",
          color: "white", cursor: "pointer",
          boxShadow: "0 5px 20px rgba(249,115,22,0.45)",
          zIndex: 9999,
          transition: "background 0.2s, transform 0.2s"
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: 100, right: 25,
          width: 360, height: 530,
          background: "white", borderRadius: 20,
          display: "flex", flexDirection: "column",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          zIndex: 9998, overflow: "hidden",
          animation: "slideUp 0.25s ease"
        }}>

          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes blink {
              0%, 80%, 100% { opacity: 0; }
              40%            { opacity: 1; }
            }
            .pf-dot {
              display: inline-block; width: 7px; height: 7px;
              margin: 0 2px; border-radius: 50%;
              background: #f97316; animation: blink 1.4s infinite;
            }
            .pf-dot:nth-child(2) { animation-delay: 0.2s; }
            .pf-dot:nth-child(3) { animation-delay: 0.4s; }
            .pf-chip:hover { background: #fed7aa !important; }
          `}</style>

          {/* Header */}
          <div style={{
            padding: "14px 16px",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            color: "white",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>🎓 PathFinder AI</div>
              <div style={{ fontSize: 11, opacity: 0.88, marginTop: 1 }}>
                Study Assistant · Powered by Gemini
              </div>
            </div>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 6px #4ade80"
            }} title="Online" />
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1, padding: "14px 12px",
            overflowY: "auto", background: "#fafafa",
            display: "flex", flexDirection: "column", gap: 8
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start"
              }}>
                <div style={{
                  padding: "9px 13px",
                  borderRadius: m.role === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                  background: m.role === "user"
                    ? "linear-gradient(135deg, #f97316, #ea580c)"
                    : "white",
                  color: m.role === "user" ? "white" : "#1a1a1a",
                  maxWidth: "82%",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.55,
                  fontSize: 13.5,
                  boxShadow: "0 1px 5px rgba(0,0,0,0.08)"
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "11px 15px", background: "white",
                  borderRadius: "18px 18px 18px 4px",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.08)"
                }}>
                  <span className="pf-dot" />
                  <span className="pf-dot" />
                  <span className="pf-dot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && (
            <div style={{
              padding: "8px 10px",
              background: "#fafafa",
              borderTop: "1px solid #f0f0f0"
            }}>
              <div style={{ fontSize: 11, color: "#bbb", marginBottom: 6, paddingLeft: 2 }}>
                Try asking:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {SUGGESTIONS.slice(0, 4).map(s => (
                  <button
                    key={s}
                    className="pf-chip"
                    onClick={() => sendMessage(s.replace(/^[^\s]+\s/, ""))}
                    style={{
                      padding: "5px 11px", borderRadius: 20,
                      border: "1px solid #fed7aa",
                      background: "#fff7ed", color: "#c2410c",
                      cursor: "pointer", fontSize: 11.5,
                      transition: "background 0.15s"
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div style={{
            display: "flex", alignItems: "center",
            padding: "10px 12px", gap: 8,
            borderTop: "1px solid #eee", background: "white"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask any subject doubt..."
              disabled={loading}
              style={{
                flex: 1, padding: "9px 14px",
                borderRadius: 24,
                border: "1.5px solid #e5e7eb",
                outline: "none", fontSize: 13,
                background: loading ? "#f9fafb" : "white",
                transition: "border 0.2s"
              }}
              onFocus={e => e.target.style.border = "1.5px solid #f97316"}
              onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
              onKeyDown={e => { if (e.key === "Enter" && !loading) sendMessage(); }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                background: loading || !input.trim() ? "#fed7aa" : "#f97316",
                color: "white", border: "none", fontSize: 16,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s, transform 0.15s"
              }}
              onMouseEnter={e => { if (!loading && input.trim()) e.currentTarget.style.transform = "scale(1.1)"; }}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              ➤
            </button>
          </div>

        </div>
      )}
    </>
  );
}