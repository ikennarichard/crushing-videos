export type SavedChannel = {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  lastAnalyzed: string;
};

const KEY = "vidmetrics:channels";

export function getSavedChannels(): SavedChannel[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveChannel(channel: SavedChannel): void {
  const existing = getSavedChannels();
  const filtered = existing.filter((c) => c.id !== channel.id);
  localStorage.setItem(KEY, JSON.stringify([channel, ...filtered]));
}

export function deleteChannel(id: string): void {
  const updated = getSavedChannels().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function updateLastAnalyzed(id: string): void {
  const channels = getSavedChannels();
  const updated = channels.map((c) =>
    c.id === id ? { ...c, lastAnalyzed: new Date().toISOString() } : c
  );
  localStorage.setItem(KEY, JSON.stringify(updated));
}