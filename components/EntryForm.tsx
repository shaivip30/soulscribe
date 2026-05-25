// components/EntryForm.tsx

import { useState, useEffect } from "react";

type Props = {
  onAnalyze: (text: string) => void;
  injectedPrompt?: string;
};

export default function EntryForm({ onAnalyze, injectedPrompt }: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (injectedPrompt) setText(injectedPrompt);
  }, [injectedPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
        required
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Analyze Emotion
      </button>
    </form>
  );
}
