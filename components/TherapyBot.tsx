"use client";

import { useState } from "react";
import axios from "axios";

type Message = {
  from: "user" | "bot";
  text: string;
};

export default function TherapyBot() {
const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
const userMessage: Message = { from: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/therapy", { prompt: input });
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      console.error("Failed to send message:", errorMsg);
      setMessages((prev) => [...prev, { from: "bot", text: "Sorry, I couldn't respond right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded shadow p-4 my-8">
      <h2 className="text-xl font-semibold mb-4 text-pink-700">🧘 Therapy Chat</h2>
      <div className="h-64 overflow-y-auto border rounded p-3 mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.from === "user" ? "text-right text-pink-700" : "text-left text-gray-800"}`}>
            <span className="inline-block px-3 py-1 rounded bg-pink-50">{msg.text}</span>
          </div>
        ))}
        {loading && <p className="text-gray-400 text-sm">Bot is typing...</p>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Share your thoughts..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
