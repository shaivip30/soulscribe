import type { JournalEntry } from "../lib/types";

const emotionEmoji: Record<string, string> = {
  Happy:   "☀️",
  Sad:     "🌧️",
  Angry:   "🔥",
  Anxious: "🌀",
  Neutral: "🌿",
};

const emotionColors: Record<string, { bg: string; border: string; text: string }> = {
  Happy:   { bg: "#fffbeb", border: "#fcd34d", text: "#92610a" },
  Sad:     { bg: "#eff6ff", border: "#93c5fd", text: "#1e40af" },
  Angry:   { bg: "#fff1f2", border: "#fda4af", text: "#9f1239" },
  Anxious: { bg: "#faf5ff", border: "#c4b5fd", text: "#5b21b6" },
  Neutral: { bg: "#f0fdf4", border: "#86efac", text: "#166534" },
};

type Props = {
  entries: JournalEntry[];
  onDelete?: (id: number) => void;
};

export default function EntryList({ entries, onDelete }: Props) {
  if (entries.length === 0) {
    return (
      <div style={{
        textAlign: "center", padding: "48px 24px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.15rem", fontStyle: "italic", color: "#c4a0ac",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>✦</div>
        No entries yet — your story begins with the first word.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {entries.map((entry, i) => {
        const colors = emotionColors[entry.emotion] || emotionColors["Neutral"];
        const emoji  = emotionEmoji[entry.emotion] || "✦";
        return (
          <div
            key={entry.id}
            className="glass-card"
            style={{
              padding: "20px 22px",
              borderLeft: `3.5px solid ${colors.border}`,
              animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
              animationDelay: `${i * 0.06}s`,
              borderRadius: "16px",
            }}
          >
            {/* Top row */}
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "10px",
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem", color: "#b8919d", letterSpacing: "0.04em",
              }}>
                {entry.date}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "5px",
                  fontSize: "0.72rem", fontWeight: 500,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  padding: "3px 11px", borderRadius: "50px",
                  background: colors.bg, color: colors.text,
                  border: `1px solid ${colors.border}`,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {emoji} {entry.emotion}
                </span>
                {onDelete && (
                  <button
                    onClick={() => onDelete(entry.id)}
                    title="Delete entry"
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#d4a0ac", fontSize: "0.82rem", padding: "2px 4px",
                      borderRadius: "6px", lineHeight: 1,
                      transition: "color 0.15s, background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#9f1239";
                      (e.currentTarget as HTMLButtonElement).style.background = "#fff1f2";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#d4a0ac";
                      (e.currentTarget as HTMLButtonElement).style.background = "none";
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Entry text */}
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.08rem", fontWeight: 400,
              lineHeight: 1.7, color: "#2e1a22",
            }}>
              {entry.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}