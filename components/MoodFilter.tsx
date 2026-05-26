import type { Emotion } from "../lib/types";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const moodEmoji: Record<string, string> = {
  All:     "✦",
  Happy:   "☀️",
  Sad:     "🌧️",
  Angry:   "🔥",
  Anxious: "🌀",
  Neutral: "🌿",
};

export default function MoodFilter({ value, onChange }: Props) {
  const options: (Emotion | "All")[] = ["All", "Happy", "Sad", "Angry", "Anxious", "Neutral"];

  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.82rem",
          fontWeight: 500,
          color: "var(--mauve)",
          background: "rgba(255,255,255,0.7)",
          border: "1.5px solid rgba(155, 91, 110, 0.3)",
          borderRadius: "50px",
          padding: "8px 36px 8px 14px",
          cursor: "pointer",
          outline: "none",
          backdropFilter: "blur(10px)",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--rose)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,120,138,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(155,91,110,0.3)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {options.map((mood) => (
          <option key={mood} value={mood}>
            {moodEmoji[mood]} {mood === "All" ? "All Moods" : mood}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <span style={{
        position: "absolute", right: "12px",
        color: "var(--mauve)", pointerEvents: "none", fontSize: "0.65rem",
      }}>▾</span>
    </div>
  );
}