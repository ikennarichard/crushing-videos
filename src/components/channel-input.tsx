import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ChannelInput() {
  const [url, setUrl] = useState("");

  const handleAnalyze = () => {
    console.log("Analyzing:", url);
  };

  return (
    <Card className="p-6 bg-neutral-900 border-white/10">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">
          Analyze Competitor Channel
        </h2>

        <div className="flex gap-2">
          <Input
            placeholder="Paste YouTube channel URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button onClick={handleAnalyze}>
            Analyze
          </Button>
        </div>
      </div>
    </Card>
  );
}