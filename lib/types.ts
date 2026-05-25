export type Emotion = "Happy" | "Sad" | "Angry" | "Anxious" | "Neutral";

export interface JournalEntry {
  id: number;
  text: string;
  emotion: Emotion;
  date: string;
}
