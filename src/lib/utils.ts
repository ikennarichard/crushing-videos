import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(dateStr: string): string {
  const days = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86400000,
  );
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function getWinner(val1: number, val2: number) {
  if (val1 > val2) return 1;
  if (val2 > val1) return 2;
  return 0;
}

export function formatDuration(iso: string): string {
  const [, h, m, s] = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/) ?? [];
  if (!h && !m && !s) return "";

  const pad = (n = "0") => n.padStart(2, "0");

  return h ? `${h}:${pad(m)}:${pad(s)}` : `${parseInt(m ?? "0")}:${pad(s)}`;
}
