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
  videos2,
  channel1,
  channel2,
}: {
  videos: any[];
  videos2?: any[];
  channel1?: { name: string };
  channel2?: { name: string };
}) {
  if (!videos.length) return null;

  const comparing = !!videos2?.length;

  const data = videos
    .slice(0, 5)
    .sort((a, b) => b.score - a.score)
    .map((v, i) => ({
      name: v.snippet.title.slice(0, 14),
      channel1Score: v.score,
      channel1Views: Number(v.statistics.viewCount),
      channel2Score: videos2?.[i]?.score ?? 0,
      channel2Views: Number(videos2?.[i]?.statistics.viewCount ?? 0),
    }));

  return (
    <div className="mt-8 bg-neutral-900 p-5 rounded-xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-semibold text-white">
          Top Performing Videos
        </h3>

        <span className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded-md">
          {comparing ? "Top 5 · Both Channels" : "Top 5 by Score"}
        </span>
      </div>
      <div className={comparing ? "h-72" : "h-60"}>
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
                padding: "10px 14px",
              }}
              itemStyle={{ color: "#a3a3a3", paddingTop: "3px" }}
              labelStyle={{
                color: "#fff",
                fontWeight: 600,
                marginBottom: "6px",
              }}
              formatter={(value, name) => {
                const isViews = String(name).toLowerCase().includes("views");
                const formatted = isViews
                  ? `${(Number(value) / 1000).toFixed(1)}K views`
                  : `${Number(value).toLocaleString()} pts`;
                return [formatted, name];
              }}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.name ?? ""}
            />
            <Bar
              dataKey="channel1Score"
              name={channel1?.name ?? "Channel 1"}
              fill="#404040"
              radius={[6, 6, 0, 0]}
              activeBar={
                <Rectangle fill="#22c55e" stroke="#16a34a" strokeWidth={1} />
              }
            />
            <Bar
              dataKey="channel1Views"
              name={`${channel1?.name ?? "Channel 1"} Views`}
              fill="#1d4ed8"
              radius={[6, 6, 0, 0]}
              activeBar={
                <Rectangle fill="#3b82f6" stroke="#2563eb" strokeWidth={1} />
              }
            />
            {comparing && (
              <>
                <Bar
                  dataKey="channel2Score"
                  name={channel2?.name ?? "Channel 2"}
                  fill="#713f12"
                  radius={[6, 6, 0, 0]}
                  activeBar={
                    <Rectangle
                      fill="#f59e0b"
                      stroke="#d97706"
                      strokeWidth={1}
                    />
                  }
                />
                <Bar
                  dataKey="channel2Views"
                  name={`${channel2?.name ?? "Channel 2"} Views`}
                  fill="#4c1d95"
                  radius={[6, 6, 0, 0]}
                  activeBar={
                    <Rectangle
                      fill="#8b5cf6"
                      stroke="#7c3aed"
                      strokeWidth={1}
                    />
                  }
                />
              </>
            )}
            {comparing && (
              <Legend
                wrapperStyle={{
                  fontSize: "11px",
                  color: "#737373",
                  paddingTop: "12px",
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
