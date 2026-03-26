type Video = {
  id: string;
  snippet: any;
  statistics: any;
  score: number;
};

const format = (num: number | string) =>
  Intl.NumberFormat().format(Number(num));

export default function VideoTable({ videos }: { videos: Video[] }) {
  if (!videos.length) return null;

  return (
    <div className="mt-8 overflow-x-auto">
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
          {videos.map((video, index) => (
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
                <img
                  src={
                    video.snippet.thumbnails.medium?.url ??
                    video.snippet.thumbnails.default.url
                  }
                  alt=""
                  className="w-24 h-14 rounded"
                />
                <span
                  className="font-medium block max-w-sm truncate"
                  title={video.snippet.title}
                >
                  {video.snippet.title}{" "}
                  {video.score > 5000 && (
                    <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-1.5 py-0.5 rounded-full">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
