import {
  deleteChannel,
  getSavedChannels,
  type SavedChannel,
} from "@/lib/storage";
import { useMemo } from "react";

export default function SavedChannels({
  onSelect,
  refreshKey,
}: {
  onSelect: (channel: SavedChannel) => void;
  refreshKey: number;
}) {
  const channels = useMemo(() => getSavedChannels(), [refreshKey]);

  const handleDelete = (id: string) => {
    deleteChannel(id);
  };

  if (!channels.length) {
    return (
      <div className="py-8">
        <p className="text-sm text-neutral-500">No saved channels yet</p>
        <p className="text-xs text-neutral-600 mt-1">
          Analyze a channel to save it here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900 border border-white/5 hover:border-white/10 transition-colors group"
        >
          <img
            src={channel.thumbnail}
            alt=""
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />

          <button
            onClick={() => onSelect(channel)}
            className="flex-1 text-left min-w-0"
          >
            <p className="text-sm text-white font-medium truncate">
              {channel.name}
            </p>
            <p className="text-[11px] text-neutral-500">
              {new Date(channel.lastAnalyzed).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </button>
          <button
            onClick={() => handleDelete(channel.id)}
            className="text-neutral-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-xs px-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
