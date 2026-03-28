import ChannelInput from "@/components/channel-input";
import Header from "./components/header";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <ChannelInput />
      </main>
    </div>
  );
}
