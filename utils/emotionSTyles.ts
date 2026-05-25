export default function getEmotionBgClass(emotion: string): string {
  switch (emotion.toLowerCase()) {
    case "happy":
      return "bg-yellow-100";
    case "sad":
      return "bg-blue-100";
    case "angry":
      return "bg-red-100";
    case "anxious":
      return "bg-purple-100";
    case "neutral":
    default:
      return "bg-gray-100";
  }
}
