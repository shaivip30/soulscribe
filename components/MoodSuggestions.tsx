import type { Emotion } from "../lib/types";

type Props = {
  emotion: Emotion | string;
};

const suggestions: Record<string, { art: string; caption: string }> = {
  Happy:   { art: "https://pbs.twimg.com/media/FgXj8GlUYAApSuS.jpg", caption: "Radiant energy" },
  Sad:     { art: "https://thumbs.dreamstime.com/b/rainy-city-night-view-wet-window-blurry-lights-shine-rain-covered-creating-moody-atmosphere-perfect-desktop-358885491.jpg", caption: "Rain-washed quiet" },
  Angry:   { art: "https://64.media.tumblr.com/815f0c326920a5573d33b8239d341e01/tumblr_ppgelmE5cL1vhq6x0_400.pnj", caption: "Burning through" },
  Anxious: { art: "https://images.unsplash.com/photo-1569025868406-5a9a0b3a5e4f", caption: "Swirling inward" },
  Neutral: { art: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", caption: "Still and open" },
};

export default function MoodSuggestions({ emotion }: Props) {
  if (!emotion) return null;
  const mood = suggestions[emotion] || suggestions["Neutral"];

  return (
    <div
      className="glass-card"
      style={{ overflow: "hidden", marginBottom: "20px" }}
    >
      <div style={{ position: "relative", height: "180px" }}>
        <img
          src={mood.art}
          alt={`${emotion} mood art`}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(20,8,15,0.55) 0%, transparent 60%)",
        }} />
        {/* Caption */}
        <div style={{
          position: "absolute", bottom: "14px", left: "18px", right: "18px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem", letterSpacing: "0.12em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.7)",
              marginBottom: "3px",
            }}>Mood canvas</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.3rem", fontStyle: "italic",
              color: "#fff", fontWeight: 300,
            }}>{mood.caption}</p>
          </div>
          <span style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            fontSize: "0.72rem",
            padding: "4px 12px",
            borderRadius: "50px",
            fontFamily: "'DM Sans', sans-serif",
            backdropFilter: "blur(8px)",
          }}>
            {emotion}
          </span>
        </div>
      </div>
    </div>
  );
}