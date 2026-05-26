import { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import { analyzeEmotion } from "../lib/emotion";
import MoodSuggestions from "../components/MoodSuggestions";
import MoodFilter from "../components/MoodFilter";
import SearchBar from "../components/SearchBar";
import JournalPrompts from "../components/JournalPrompts";
import MusicSidebar from "../components/MusicSidebar";
import TherapyBot from "../components/TherapyBot";
import type { JournalEntry, Emotion } from "../lib/types";
import { getStreak, getStreakLabel, getStreakEmoji } from "../utils/streak";

const emotionGradients: Record<string, string> = {
  Happy:   "radial-gradient(ellipse at 30% 20%, #fff8e1 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, #fce4ec 0%, transparent 55%), #fdf9f0",
  Sad:     "radial-gradient(ellipse at 20% 30%, #e8eaf6 0%, transparent 55%), radial-gradient(ellipse at 75% 70%, #e3f2fd 0%, transparent 55%), #f0f2fb",
  Angry:   "radial-gradient(ellipse at 30% 20%, #fce4ec 0%, transparent 55%), radial-gradient(ellipse at 70% 75%, #fff3e0 0%, transparent 55%), #fdf2f2",
  Anxious: "radial-gradient(ellipse at 25% 25%, #f3e5f5 0%, transparent 55%), radial-gradient(ellipse at 70% 70%, #e8f5e9 0%, transparent 55%), #f5f0fb",
  Neutral: "radial-gradient(ellipse at 20% 20%, #fce8ee 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, #fdf3e3 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #f3e8f7 0%, transparent 50%), #faf7f8",
};

function StreakBadge({ entries }: { entries: JournalEntry[] }) {
  const streak = getStreak(entries);
  const emoji  = getStreakEmoji(streak);
  const label  = getStreakLabel(streak);

  if (streak === 0) return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif",
      color: "#c4a0ac", fontStyle: "italic",
    }}>
      🌱 Write today to start your streak
    </div>
  );

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "7px",
      background: streak >= 7
        ? "linear-gradient(135deg, #fff3cd, #ffe0b2)"
        : "linear-gradient(135deg, #fce8ee, #fdf3e3)",
      border: streak >= 7 ? "1.5px solid #f6b93b" : "1.5px solid rgba(232,120,138,0.35)",
      borderRadius: "50px", padding: "6px 16px",
      fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif",
      fontWeight: 500,
      color: streak >= 7 ? "#92610a" : "var(--rose-deep)",
      letterSpacing: "0.02em",
      boxShadow: streak >= 3 ? "0 2px 12px rgba(232,120,138,0.15)" : "none",
    }}>
      <span style={{ fontSize: "1rem" }}>{emoji}</span>
      {label}
      {streak >= 7 && (
        <span style={{
          background: "#f6b93b", color: "#fff",
          fontSize: "0.65rem", fontWeight: 700,
          padding: "2px 7px", borderRadius: "50px", letterSpacing: "0.05em",
        }}>ON FIRE</span>
      )}
    </div>
  );
}

export default function JournalPage() {
  const [entries, setEntries]               = useState<JournalEntry[]>([]);
  const [moodFilter, setMoodFilter]         = useState<string>("All");
  const [searchQuery, setSearchQuery]       = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | undefined>(undefined);
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [error, setError]                   = useState<string | null>(null);

  // Load entries from DB on mount
  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/entries");
        if (!res.ok) throw new Error(`Failed to load entries (${res.status})`);
        const { entries: data } = await res.json();
        setEntries(data);
      } catch (err: any) {
        console.error(err);
        setError("Couldn't load your entries. Check your Supabase connection.");
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  // Analyze emotion + save to DB
  const handleAnalyze = async (text: string) => {
    setSaving(true);
    setError(null);
    try {
      const raw     = await analyzeEmotion(text);
      const emotion = (raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()) as Emotion;

      const res = await fetch("/api/entries", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ text, emotion }),
      });

      if (!res.ok) throw new Error(`Failed to save entry (${res.status})`);
      const { entry } = await res.json();
      setEntries((prev) => [entry, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError("Couldn't save your entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Delete entry
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/entries?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete entry");
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
      setError("Couldn't delete that entry.");
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesMood   = moodFilter === "All" || entry.emotion === moodFilter;
    const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMood && matchesSearch;
  });

  const currentEmotion = entries.length > 0 ? entries[0].emotion : "Neutral";
  const bgGradient     = emotionGradients[currentEmotion] || emotionGradients["Neutral"];

  return (
    <div className="min-h-screen transition-all duration-700" style={{ background: bgGradient }}>

      {/* Decorative blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-120px", right: "-120px",
          width: "480px", height: "480px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,120,138,0.13) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,169,106,0.10) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-14">

        {/* Header */}
        <header className="text-center mb-12 fade-up">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(232,120,138,0.25)",
            borderRadius: "50px", padding: "6px 18px", marginBottom: "18px",
            fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--mauve)", fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}>
            <span>✦</span> Your personal sanctuary <span>✦</span>
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 7vw, 4.2rem)", fontWeight: 300,
            letterSpacing: "-0.01em", lineHeight: 1.1, marginBottom: "10px",
            background: "linear-gradient(135deg, #c0445a 0%, #9b5b6e 50%, #d4a96a 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            SoulScribe
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", color: "#9b7080",
            fontSize: "0.95rem", fontWeight: 300, letterSpacing: "0.02em", marginBottom: "16px",
          }}>
            Write freely. Understand deeply.
          </p>
          <StreakBadge entries={entries} />
        </header>

        {/* Error banner */}
        {error && (
          <div style={{
            background: "#fff1f2", border: "1px solid #fda4af",
            borderRadius: "12px", padding: "12px 16px", marginBottom: "16px",
            fontSize: "0.85rem", color: "#9f1239", fontFamily: "'DM Sans', sans-serif",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            ⚠️ {error}
            <button onClick={() => setError(null)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#9f1239", fontSize: "1rem", lineHeight: 1,
            }}>✕</button>
          </div>
        )}

        {/* Prompts */}
        <div className="fade-up fade-up-1 mb-5">
          <JournalPrompts onUsePrompt={(p) => setSelectedPrompt(p)} />
        </div>

        {/* Entry Form */}
        <div className="fade-up fade-up-2 glass-card p-7 mb-6">
          <EntryForm onAnalyze={handleAnalyze} injectedPrompt={selectedPrompt} saving={saving} />
        </div>

        {/* Mood Suggestions */}
        <div className="fade-up fade-up-3">
          <MoodSuggestions emotion={currentEmotion} />
        </div>

        {/* Filter + Search */}
        <div className="fade-up fade-up-4 flex flex-col gap-3 mb-6">
          <div className="flex justify-between items-center gap-3 flex-wrap">
            <div className="ornament-divider flex-1" style={{ minWidth: "120px" }}>Entries</div>
            <MoodFilter value={moodFilter} onChange={setMoodFilter} />
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Entry List */}
        <div className="fade-up fade-up-5">
          {loading ? (
            <div style={{
              textAlign: "center", padding: "48px 24px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem", fontStyle: "italic", color: "#c4a0ac",
            }} className="shimmer">
              Loading your entries…
            </div>
          ) : (
            <EntryList entries={filteredEntries} onDelete={handleDelete} />
          )}
        </div>

        {/* Therapy Bot */}
        <div className="fade-up fade-up-5 mt-8">
          <TherapyBot />
        </div>

      </div>

      {entries.length > 0 && <MusicSidebar emotion={entries[0].emotion as any} />}
    </div>
  );
}