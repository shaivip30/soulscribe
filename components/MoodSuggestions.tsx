import type { Emotion } from "../lib/types";

type Props = {
  emotion: Emotion | "";
};

export default function MoodSuggestions({ emotion }: Props) {
  if (!emotion) return null;

  const suggestions: Record<Emotion, { art: string }> = {
    Happy: {
      art: "https://pbs.twimg.com/media/FgXj8GlUYAApSuS.jpg",
    },
    Sad: {
      art: "https://thumbs.dreamstime.com/b/rainy-city-night-view-wet-window-blurry-lights-shine-rain-covered-creating-moody-atmosphere-perfect-desktop-358885491.jpg",
    },
    Angry: {
      art: "https://64.media.tumblr.com/815f0c326920a5573d33b8239d341e01/tumblr_ppgelmE5cL1vhq6x0_400.pnj",
    },
    Anxious: {
      art: "https://images.unsplash.com/photo-1569025868406-5a9a0b3a5e4f",
    },
    Neutral: {
      art: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
  };

  const mood = suggestions[emotion as Emotion] || suggestions["Neutral"];

  return (
    <div className="mt-8 p-4 bg-pink-50 border rounded shadow">
      <h2 className="text-xl font-semibold mb-2 text-pink-700">🎨 Mood-Based Art</h2>

      <div>
        <p className="mb-1 font-medium">Reflective image for your emotion:</p>
        <img
          src={mood.art}
          alt={`${emotion} mood art`}
          className="w-full h-64 object-cover rounded shadow"
        />
      </div>
    </div>
  );
}
