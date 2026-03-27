type Video = {
  id: string;
  snippet: any;
  statistics: any;
  score: number;
};

const format = (num: number | string) =>
  Intl.NumberFormat().format(Number(num));

export default function VideoTable({ videos }: { videos: Video[] }) {
  const avgViews = Math.round(
    videos.reduce((sum, v) => sum + Number(v.statistics.viewCount), 0) /
      videos.length,
  );

  if (!videos.length) return null;

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="flex gap-6 p-4 bg-neutral-900 rounded-xl border border-white/10 text-sm">
        <div>
          <p className="text-neutral-500 text-xs">Videos Analyzed</p>
          <p className="text-white font-semibold">{videos.length}</p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs">Crushing It</p>
          <p className="text-green-400 font-semibold">
            {videos.filter((v) => v.score > 5000).length}
          </p>
        </div>
        <div>
          <p className="text-neutral-500 text-xs">Avg Views</p>
          <p className="text-white font-semibold">{format(avgViews)}</p>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-neutral-400 border-b border-white/10">
          <tr>
            <th className="py-3 w-8 text-center">#</th>
            <th className="py-3 pr-4">Video</th>
            <th className="py-3 pr-4">Views</th>
            <th className="py-3 pr-4">Likes</th>
            <th className="py-3 pr-4">Comments</th>
            <th className="py-3">Score</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video, index) => {
            const date = new Date(video.snippet.publishedAt);
            const formatted = `${date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })} @ ${date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "UTC",
            })} UTC`;
            return (
              <tr
                key={video.id}
                className={`border-b border-white/5 hover:bg-white/5  ${
                  index === 0 ? "bg-green-500/10" : ""
                }`}
              >
                <td className="text-center text-neutral-500 text-xs font-mono">
                  {index + 1}
                </td>
                <td className="py-4 flex items-center gap-4 px-1">
                  <a
                    href={`https://youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={
                        video.snippet.thumbnails.medium?.url ??
                        video.snippet.thumbnails.default.url
                      }
                      alt=""
                      className="w-24 h-14 rounded"
                    />
                  </a>
                  <span
                    className="flex flex-col gap-1"
                    title={video.snippet.title}
                  >
                    <span className="font-medium block max-w-sm truncate">
                      {video.snippet.title}
                    </span>
                    <span className="flex items-center gap-2 text-[11px] text-neutral-500">
                      <span>{formatted}</span>
                    </span>
                    {video.score > 5000 && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full w-fit">
                        🔥 Crushing It
                      </span>
                    )}
                  </span>
                </td>

                <td>{format(video.statistics.viewCount)}</td>
                <td>{format(video.statistics.likeCount)}</td>
                <td>{format(video.statistics.commentCount)}</td>
                <td>
                  <span className="font-semibold text-white tabular-nums">
                    {format(video.score)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
