import { formatDuration, getWinner } from "@/lib/utils";
import { Trophy } from "lucide-react";
import MetricBadge from "./metric-badge";

type Video = {
  id: string;
  snippet: any;
  statistics: any;
  contentDetails: any;
  score: number;
};

const format = (num: number | string) =>
  Intl.NumberFormat().format(Number(num));

export default function ComparisonTable({
  channel1,
  channel2,
  videos1,
  videos2,
}: any) {
  const total = (videos: Video[], key: string) =>
    videos.reduce((sum, v) => sum + Number(v.statistics[key] || 0), 0);

  const avg = (videos: Video[], key: string) =>
    Math.round(total(videos, key) / videos.length);

  const avgScore = (videos: Video[]) =>
    Math.round(videos.reduce((sum, v) => sum + v.score, 0) / videos.length);

  const engagementRate = (videos: Video[]) => {
    const views = total(videos, "viewCount");
    const engaged = total(videos, "likeCount") + total(videos, "commentCount");
    return views > 0 ? parseFloat(((engaged / views) * 100).toFixed(2)) : 0;
  };

  const scores1 = avgScore(videos1);
  const scores2 = avgScore(videos2);
  const overallWinner = getWinner(scores1, scores2);

  return (
    <div className="mt-8 bg-neutral-900 rounded-xl border border-white/10 p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-white">Head to Head</h3>
        <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded-md">
          Top 5 each
        </span>
      </div>

      {overallWinner !== 0 && (
        <div
          className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg border text-sm font-medium ${
            overallWinner === 1
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
          }`}
        >
          <Trophy size={20} />{" "}
          {overallWinner === 1 ? channel1.name : channel2.name} is winning
          overall
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <MetricBadge
          label="Avg Views"
          val1={avg(videos1, "viewCount")}
          val2={avg(videos2, "viewCount")}
        />
        <MetricBadge
          label="Avg Score"
          val1={avgScore(videos1)}
          val2={avgScore(videos2)}
        />
        <MetricBadge
          label="Avg Likes"
          val1={avg(videos1, "likeCount")}
          val2={avg(videos2, "likeCount")}
        />
        <MetricBadge
          label="Engagement"
          val1={engagementRate(videos1)}
          val2={engagementRate(videos2)}
          format={(n) => `${n}%`}
        />
      </div>

      {/* columns */}
      <div className="flex gap-6">
        <ComparisonColumn channel={channel1} videos={videos1} />
        <div className="w-px bg-white/5 shrink-0" />
        <ComparisonColumn channel={channel2} videos={videos2} />
      </div>
    </div>
  );
}

function ComparisonColumn({
  channel,
  videos,
}: {
  channel: { id: string; name: string; thumbnail: string };
  videos: Video[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
        <img src={channel.thumbnail} className="w-7 h-7 rounded-full" alt="" />
        <p className="text-sm font-semibold text-white truncate">
          {channel.name}
        </p>
        <span className="ml-auto text-xs text-neutral-500 shrink-0">
          {videos.length} videos
        </span>
      </div>

      <div className="space-y-3">
        {videos.slice(0, 5).map((video, index) => (
          <a
            key={video.id}
            href={`https://youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex gap-3 p-3 rounded-lg bg-neutral-900 border border-white/5 hover:border-white/10 transition-colors group"
          >
            <span className="text-xs text-neutral-600 font-mono w-4 shrink-0 pt-0.5">
              {index + 1}
            </span>

            <img
              src={
                video.snippet.thumbnails.medium?.url ??
                video.snippet.thumbnails.default.url
              }
              alt=""
              className="w-20 h-12 rounded object-cover shrink-0"
            />

            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <p className="text-xs font-medium text-white line-clamp-2 leading-snug">
                {video.snippet.title}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[11px] text-neutral-500">
                  {format(video.statistics.viewCount)} views
                </span>
                <span className="text-neutral-700">·</span>
                <span className="text-[11px] text-neutral-500">
                  {formatDuration(video.contentDetails.duration)}
                </span>
                {video.score > 2000 && (
                  <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">
                    🔥 Crushing It
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
