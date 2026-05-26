"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function TherapyBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("/api/therapy", { prompt: input });
      setMessages((prev) => [...prev, { from: "bot", text: response.data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { from: "bot", text: "Sorry, I couldn't respond right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      {/* Header — always visible, toggles body */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", padding: "18px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "none", border: "none", cursor: "pointer",
          borderBottom: open ? "1px solid rgba(232,120,138,0.15)" : "none",
          transition: "border 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "1.1rem" }}>🧘</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.25rem", fontWeight: 400, fontStyle: "italic",
            color: "var(--rose-deep)",
          }}>Therapy Chat</span>
          {messages.length > 0 && (
            <span style={{
              background: "var(--rose)", color: "#fff",
              fontSize: "0.65rem", fontWeight: 600,
              padding: "2px 8px", borderRadius: "50px",
              fontFamily: "'DM Sans', sans-serif",
            }}>{messages.length}</span>
          )}
        </div>
        <span style={{
          color: "var(--mauve)", fontSize: "0.75rem",
          transition: "transform 0.25s",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          display: "inline-block",
        }}>▾</span>
      </button>

      {/* Collapsible body */}
      <div style={{
        maxHeight: open ? "500px" : "0",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div style={{ padding: "16px 20px 20px" }}>
          {/* Messages */}
          <div style={{
            height: "220px", overflowY: "auto",
            marginBottom: "14px",
            display: "flex", flexDirection: "column", gap: "8px",
            paddingRight: "4px",
          }}>
            {messages.length === 0 && (
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem", fontStyle: "italic",
                color: "#c4a0ac", textAlign: "center",
                marginTop: "60px",
              }}>
                Share what's on your heart…
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <span style={{
                  maxWidth: "78%",
                  display: "inline-block",
                  padding: "9px 14px",
                  borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.from === "user"
                    ? "linear-gradient(135deg, var(--rose) 0%, var(--rose-deep) 100%)"
                    : "rgba(255,255,255,0.75)",
                  color: msg.from === "user" ? "#fff" : "#2e1a22",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                  boxShadow: msg.from === "user"
                    ? "0 3px 12px rgba(192,68,90,0.22)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
                  border: msg.from === "bot" ? "1px solid rgba(200,120,140,0.15)" : "none",
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <span style={{
                  padding: "9px 16px",
                  background: "rgba(255,255,255,0.75)",
                  borderRadius: "18px 18px 18px 4px",
                  border: "1px solid rgba(200,120,140,0.15)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "#c4a0ac",
                  fontStyle: "italic",
                }} className="shimmer">
                  responding…
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Share your thoughts…"
              className="soulscribe-input"
              style={{ height: "42px", borderRadius: "50px", flex: 1 }}
            />
            <button
              onClick={sendMessage}
              className="btn-primary"
              disabled={loading || !input.trim()}
              style={{ opacity: loading || !input.trim() ? 0.6 : 1, padding: "10px 18px" }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}