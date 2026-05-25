import { useState, useEffect } from "react";
import EntryForm from "../components/EntryForm";
import EntryList from "../components/EntryList";
import { analyzeEmotion } from "../lib/emotion";
import MoodSuggestions from "../components/MoodSuggestions";
import getEmotionBgClass from "../utils/emotionSTyles";
import MoodFilter from "../components/MoodFilter";
import SearchBar from "../components/SearchBar";
import JournalPrompts from "../components/JournalPrompts";
import MusicSidebar from "../components/MusicSidebar";
import TherapyBot from "../components/TherapyBot";
import type { JournalEntry } from "../lib/types";


export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [nextId, setNextId] = useState(1);
  const [moodFilter, setMoodFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | undefined>(undefined);

  // 🔄 Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("soulscribe-entries");
    if (stored) {
      const savedEntries: JournalEntry[] = JSON.parse(stored);
      setEntries(savedEntries);
      setNextId(savedEntries.length > 0 ? savedEntries[0].id + 1 : 1);
    }
  }, []);

  // 💾 Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("soulscribe-entries", JSON.stringify(entries));
  }, [entries]);

  // 🔍 Analyze Emotion (async)
  const handleAnalyze = async (text: string) => {
    try {
      let emotion = await analyzeEmotion(text); // ✅ now using await
      emotion = emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();

      const newEntry: JournalEntry = {
        id: nextId,
        text,
        emotion,
        date: new Date().toLocaleString(),
      };

      setEntries([newEntry, ...entries]);
      setNextId(nextId + 1);
    } catch (err) {
      console.error("Emotion analysis failed", err);
    }
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesMood = moodFilter === "All" || entry.emotion === moodFilter;
    const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMood && matchesSearch;
  });

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start px-4 py-12 transition-all duration-300 ${getEmotionBgClass(
        entries.length > 0 ? entries[0].emotion : "Neutral"
      )}`}
    >
      <h1 className="text-4xl font-bold mb-6 text-pink-800">📝 SoulScribe Journal</h1>

      {/* Prompts Section */}
      <div className="w-full max-w-2xl mb-4">
        <JournalPrompts onUsePrompt={(prompt) => setSelectedPrompt(prompt)} />
      </div>

      {/* Entry Form */}
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
        <EntryForm onAnalyze={handleAnalyze} injectedPrompt={selectedPrompt} />
      </div>

      {/* Mood Suggestions */}
      <div className="w-full max-w-2xl mb-4">
        <MoodSuggestions emotion={entries.length > 0 ? entries[0].emotion : ""} />
      </div>

      {/* Mood Filter */}
      <div className="w-full max-w-2xl mb-4">
        <MoodFilter value={moodFilter} onChange={setMoodFilter} />
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

           {/* Entry List */}
      <div className="w-full max-w-2xl">
        <EntryList entries={filteredEntries} />
      </div>

      {/* Music Sidebar */}
      {entries.length > 0 && <MusicSidebar emotion={entries[0].emotion} />}

      {/* Therapy Chatbot */}
      <div className="w-full max-w-2xl mt-8">
        <TherapyBot />
      </div>
    </div>
  );
}
