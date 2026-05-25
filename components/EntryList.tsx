import type { JournalEntry } from "../lib/types";

export default function EntryList({ entries }: { entries: JournalEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No entries yet. Start journaling!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white p-4 border-l-4 border-pink-400 shadow rounded"
        >
          <p className="text-sm text-gray-500">{entry.date}</p>

          <p className="mt-2 text-gray-800">{entry.text}</p>

          <p className="mt-2 text-pink-700 font-semibold">
            Emotion: {entry.emotion}
          </p>
        </div>
      ))}
    </div>
  );
}
