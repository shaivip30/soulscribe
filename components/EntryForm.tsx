import { useState, useEffect } from "react";

type Props = {
  onAnalyze: (text: string) => void;
  injectedPrompt?: string;
  saving?: boolean;
};

export default function EntryForm({ onAnalyze, injectedPrompt, saving = false }: Props) {
  const [text, setText] = useState("");
  const charCount = text.length;

  useEffect(() => {
    if (injectedPrompt) setText(injectedPrompt);
  }, [injectedPrompt]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || saving) return;
    await onAnalyze(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ position: "relative" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Begin writing — your words are safe here…"
          className="soulscribe-input"
          style={{ height: "160px", paddingBottom: "36px" }}
          required
          disabled={saving}
        />
        <span style={{
          position: "absolute", bottom: "12px", right: "14px",
          fontSize: "0.72rem", color: charCount > 0 ? "#b8919d" : "transparent",
          fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s",
        }}>
          {charCount} chars
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{
          fontSize: "0.78rem", color: "#c4a0ac",
          fontFamily: "'DM Sans', sans-serif", fontStyle: "italic",
        }}>
          {saving ? "Saving to your journal…" : "AI will detect your emotional tone"}
        </p>
        <button
          type="submit"
          className="btn-primary"
          disabled={saving || !text.trim()}
          style={{ opacity: saving || !text.trim() ? 0.6 : 1, cursor: saving ? "wait" : "pointer" }}
        >
          {saving ? <span className="shimmer">Saving…</span> : "✦ Analyze Emotion"}
        </button>
      </div>
    </form>
  );
}