import { useState } from "react";
import type { Emotion } from "../lib/types";

type Props = {
  emotion: Emotion;
};

const spotifyLinks: Record<Emotion, string> = {
  Happy:   "https://open.spotify.com/embed/track/0QpOqKz66ZxHNqj2PPHiFF",
  Sad:     "https://open.spotify.com/embed/track/4U45aEWtQhrm8A5mxPaFZ7",
  Angry:   "https://open.spotify.com/embed/track/59WN2psjkt1tyaxjspN8fp",
  Anxious: "https://open.spotify.com/embed/track/7qiZfU4dY1lkzPoFLt5OOt",
  Neutral: "https://open.spotify.com/embed/track/3PkBUAyXpD6xihGLXOEfzR",
};

export default function MusicSidebar({ emotion }: Props) {
  const [open, setOpen] = useState(false);
  const songUrl = spotifyLinks[emotion] || spotifyLinks["Neutral"];

  return (
    <div style={{
      position: "fixed", right: 0, top: 0,
      height: "100%", zIndex: 50,
      display: "flex", alignItems: "center",
    }}>
      {/* Toggle tab */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          background: "linear-gradient(180deg, var(--rose) 0%, var(--rose-deep) 100%)",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          fontWeight: 500,
          padding: "16px 10px",
          borderRadius: "12px 0 0 12px",
          border: "none",
          cursor: "pointer",
          boxShadow: "-4px 0 18px rgba(192,68,90,0.2)",
          transition: "opacity 0.2s",
          transform: open ? "translateX(-320px)" : "translateX(0)",
        }}
      >
        {open ? "✕ Close" : "♪ Mood Music"}
      </button>

      {/* Panel */}
      <div
        style={{
          width: "320px",
          height: "100%",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(232,120,138,0.2)",
          padding: "32px 20px 20px",
          boxShadow: "-8px 0 40px rgba(180,80,100,0.12)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.7rem", letterSpacing: "0.12em",
            textTransform: "uppercase", color: "#b8919d",
            marginBottom: "6px",
          }}>Now Playing</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.6rem", fontWeight: 400, fontStyle: "italic",
            color: "var(--rose-deep)", lineHeight: 1.2,
          }}>
            Sounds for your {emotion} soul
          </h2>
        </div>

        <div style={{
          background: "rgba(232,120,138,0.06)",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(232,120,138,0.15)",
        }}>
          <iframe
            src={songUrl}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ border: "none", display: "block" }}
          />
        </div>

        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.92rem", fontStyle: "italic",
          color: "#b8919d", textAlign: "center",
          marginTop: "auto",
        }}>
          Music chosen to resonate with your mood
        </p>
      </div>
    </div>
  );
}