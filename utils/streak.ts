import type { JournalEntry } from "../lib/types";

export function getStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  // Get unique calendar dates from entries (YYYY-MM-DD), sorted descending
  const dates = Array.from(
    new Set(
      entries.map((e) => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      })
    )
  ).sort((a, b) => (a > b ? -1 : 1));

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

  // Streak only counts if user wrote today or yesterday (grace period)
  if (dates[0] !== todayKey && dates[0] !== yesterdayKey) return 0;

  let streak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1].replace(/-/g, "/").replace(/(\d+)\/(\d+)\/(\d+)/, "$1/$3/$2"));
    // Actually parse properly
    const [py, pm, pd] = dates[i - 1].split("-").map(Number);
    const [cy, cm, cd] = dates[i].split("-").map(Number);
    const prevDate = new Date(py, pm, pd);
    const currDate = new Date(cy, cm, cd);
    const diffDays = Math.round((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getStreakLabel(streak: number): string {
  if (streak === 0) return "";
  if (streak === 1) return "1-day streak";
  return `${streak}-day streak`;
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 7) return "🔥";
  if (streak >= 3) return "✨";
  if (streak >= 1) return "🌱";
  return "";
}