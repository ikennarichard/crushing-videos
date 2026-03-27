import {
  Bar,
  BarChart,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function VideoChart({
  videos,
}: {
  videos: any[];
}) {
  if (!videos.length) return null;

  const data = videos
    .slice(0, 5)
    .sort((a, b) => b.score - a.score)
    .map((v) => ({
      name: v.snippet.title.slice(0, 14),
      views: Number(v.statistics.viewCount),
      score: v.score,
    }));

  return (
    <div className="mt-8 bg-neutral-900 p-5 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-white">
          Top Performing Videos
        </h3>

        <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded-md">
          Top 5 by Score
        </span>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ left: -10, right: 10, top: 4, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fill: "#737373", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              height={48}
              tickFormatter={(value) =>
                value.length > 12 ? value.slice(0, 12) + "…" : value
              }
            />
            <YAxis
              tick={{ fill: "#737373", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)
              }
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                backgroundColor: "#171717",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#a3a3a3" }}
              formatter={(value, name) => [
                value?.toLocaleString(),
                name === "score" ? "Score" : "Views",
              ]}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ""}
            />
            <Bar
              dataKey="score"
              fill="#404040"
              radius={[6, 6, 0, 0]}
              activeBar={
                <Rectangle fill="#22c55e" stroke="#16a34a" strokeWidth={1} />
              }
            />
            <Bar
              dataKey="views"
              fill="#1d4ed8"
              radius={[6, 6, 0, 0]}
              activeBar={
                <Rectangle fill="#3b82f6" stroke="#2563eb" strokeWidth={1} />
              }
            />
            <Legend
              wrapperStyle={{
                fontSize: "11px",
                color: "#737373",
                paddingTop: "12px",
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
