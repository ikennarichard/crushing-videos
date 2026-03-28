import ChannelInput from "@/components/channel-input";
import { type SavedChannel } from "@/lib/storage";
import { useState } from "react";
import Header from "./components/header";
import SavedChannels from "./components/saved-channels";

export default function App() {
  const [sidebarKey, setSidebarKey] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState<{
    channel: SavedChannel;
    ts: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <div className="flex gap-6 max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <aside className="w-64 shrink-0">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-3">
            Saved Channels
          </p>
          <SavedChannels
            onSelect={(ch) =>
              setSelectedChannel({ channel: ch, ts: Date.now() })
            }
            refreshKey={sidebarKey}
          />
        </aside>

        <main className="flex-1 min-w-0">
          <ChannelInput
            preloadChannel={selectedChannel}
            onSave={() => setSidebarKey((k) => k + 1)}
          />
        </main>
      </div>
    </div>
  );
}
