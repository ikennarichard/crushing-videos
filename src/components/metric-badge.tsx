import { getWinner } from "@/lib/utils";

export default function MetricBadge({
  label,
  val1,
  val2,
  format = (n: number) => Intl.NumberFormat().format(n),
}: {
  label: string;
  val1: number;
  val2: number;
  format?: (n: number) => string;
}) {
  const winner = getWinner(val1, val2);
  return (
    <div className="flex flex-col gap-1 bg-neutral-800 rounded-lg p-3 flex-1">
      <p className="text-[11px] text-neutral-500">{label}</p>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-xs font-semibold tabular-nums ${winner === 1 ? "text-green-400" : "text-neutral-400"}`}
        >
          {format(val1)} {winner === 1 && "↑"}
        </span>
        <span className="text-[10px] text-neutral-600">vs</span>
        <span
          className={`text-xs font-semibold tabular-nums ${winner === 2 ? "text-green-400" : "text-neutral-400"}`}
        >
          {format(val2)} {winner === 2 && "↑"}
        </span>
      </div>
    </div>
  );
}