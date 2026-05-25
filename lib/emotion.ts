export function analyzeEmotion(text: string): string {
  const lower = text.toLowerCase();

  const happyWords = [
    "happy", "joy", "excited", "grateful", "awesome", "blessed", "content", "cheerful", "jovial", "fortunate", "glad", "satisfied",
    "ecstatic", "elated", "delighted", "thrilled", "hopeful", "optimistic", "joyful", "blissful", "radiant", "amused", "bubbly", "upbeat",
    "thankful", "positive", "peaceful", "sunny", "smiling", "laughing"
  ];

  const sadWords = [
    "sad", "depressed", "lonely", "cry", "crying", "heartbroken", "unhappy", "gloomy", "miserable", "melancholy", "down", "tearful",
    "hopeless", "sorrow", "blue", "grief", "pain", "hurting", "despair", "empty", "lost", "weeping", "dull", "numb", "isolated"
  ];

  const angryWords = [
    "angry", "mad", "furious", "annoyed", "rage", "irritated", "frustrated", "resentful", "outraged", "offended", "fuming", "enraged",
    "hostile", "agitated", "bitter", "grumpy", "provoked", "pissed", "exasperated", "snappy", "upset", "yelling", "screaming"
  ];

  const anxiousWords = [
    "anxious", "worried", "nervous", "scared", "fearful", "panicked", "tense", "uneasy", "stressed", "afraid", "doubtful", "shaky",
    "insecure", "fidgety", "concerned", "uncertain", "unease", "restless", "shy", "timid", "hesitant", "petrified", "unsettled"
  ];

  if (happyWords.some(word => lower.includes(word))) return "Happy";
  if (sadWords.some(word => lower.includes(word))) return "Sad";
  if (angryWords.some(word => lower.includes(word))) return "Angry";
  if (anxiousWords.some(word => lower.includes(word))) return "Anxious";

  return "Neutral";
}
