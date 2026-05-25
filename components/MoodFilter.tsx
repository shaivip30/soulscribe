import type { Emotion } from "../lib/types";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MoodFilter({ value, onChange }: Props) {
  const options: (Emotion | "All")[] = ["All", "Happy", "Sad", "Angry", "Anxious", "Neutral"];

  return (
    <div className="mb-4 flex justify-end">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-pink-300 rounded px-3 py-2 text-pink-800 bg-white shadow-sm"
      >
        {options.map((mood) => (
          <option key={mood} value={mood}>
            {mood === "All" ? "🗂️ All Moods" : mood}
          </option>
        ))}
      </select>
    </div>
  );
}
