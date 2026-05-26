import { useState } from "react";

const prompts = [
  "What made you smile today?",
  "Describe a moment that challenged you recently.",
  "How are you feeling right now and why?",
  "If today were a song, what would it sound like?",
  "What's something you'd like to let go of?",
  "Write about a small win you had today.",
  "How have you grown in the past month?",
];

type Props = {
  onUsePrompt: (prompt: string) => void;
};

export default function JournalPrompts({ onUsePrompt }: Props) {
  const [index, setIndex] = useState(Math.floor(Math.random() * prompts.length));
  const [flipping, setFlipping] = useState(false);

  const nextPrompt = () => {
    setFlipping(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % prompts.length);
      setFlipping(false);
    }, 220);
  };

  return (
    <div
      className="glass-card px-6 py-5"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Subtle decorative quote mark */}
      <span style={{
        position: "absolute", top: "6px", right: "18px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "5rem", lineHeight: 1,
        color: "rgba(200,100,120,0.08)",
        userSelect: "none", pointerEvents: "none",
        fontWeight: 700,
      }}>"</span>

      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#b8919d",
        fontWeight: 500,
        marginBottom: "10px",
      }}>
        Today's Prompt
      </p>

      <blockquote
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.28rem",
          fontStyle: "italic",
          fontWeight: 400,
          color: "var(--rose-deep)",
          lineHeight: 1.5,
          marginBottom: "16px",
          minHeight: "2.6em",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          opacity: flipping ? 0 : 1,
          transform: flipping ? "translateY(-6px)" : "translateY(0)",
        }}
      >
        "{prompts[index]}"
      </blockquote>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={() => onUsePrompt(prompts[index])}
          className="btn-primary"
        >
          Use Prompt
        </button>
        <button onClick={nextPrompt} className="btn-ghost">
          Shuffle ↻
        </button>
      </div>
    </div>
  );
}