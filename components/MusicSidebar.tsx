import { useState } from "react";
import type { Emotion } from "../lib/types";

type Props = {
  emotion: Emotion;
};

const spotifyLinks: Record<Emotion, string> = {
  Happy: "https://open.spotify.com/embed/track/0QpOqKz66ZxHNqj2PPHiFF",
  Sad: "https://open.spotify.com/embed/track/4U45aEWtQhrm8A5mxPaFZ7",
  Angry: "https://open.spotify.com/embed/track/59WN2psjkt1tyaxjspN8fp",
  Anxious: "https://open.spotify.com/embed/track/7qiZfU4dY1lkzPoFLt5OOt",
  Neutral: "https://open.spotify.com/embed/track/3PkBUAyXpD6xihGLXOEfzR",
};

export default function MusicSidebar({ emotion }: Props) {
  const [open, setOpen] = useState(false);
  const songUrl = spotifyLinks[emotion] || spotifyLinks["Neutral"];

  return (
    <div className="fixed right-0 top-0 h-full z-50 transition-transform duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="absolute left-[-2.5rem] top-6 bg-pink-500 text-white px-3 py-2 rounded-l shadow-lg hover:bg-pink-600"
      >
        {open ? "✖" : "🎵 Mood Music"}
      </button>

      <div
        className={`bg-white shadow-lg h-full w-80 p-4 border-l transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2 text-pink-600">Now Playing</h2>
        <iframe
          src={songUrl}
          width="100%"
          height="80"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}
