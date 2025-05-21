import getReadingTime from "reading-time";

export function calculateReadingTime(content: string) {
  const stats = getReadingTime(content);
  return Math.ceil(stats.minutes);
}
