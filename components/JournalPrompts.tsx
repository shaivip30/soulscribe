// components/JournalPrompts.tsx

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

  const nextPrompt = () => {
    const newIndex = (index + 1) % prompts.length;
    setIndex(newIndex);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <p className="text-gray-800 mb-2"> Prompt:</p>
      <blockquote className="italic text-pink-700 mb-2">"{prompts[index]}"</blockquote>
      <div className="flex gap-2">
        <button
          onClick={() => onUsePrompt(prompts[index])}
          className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Use Prompt
        </button>
        <button
          onClick={nextPrompt}
          className="px-3 py-1 border border-pink-300 text-pink-500 rounded hover:bg-pink-50"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
}
