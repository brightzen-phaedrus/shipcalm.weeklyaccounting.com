import type { SeriesPoint } from "@/lib/sheets";
import type { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  color: string;
  data: SeriesPoint[];
  children: ReactNode;
}

function formatValue(v: number): string {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}k`;
  return String(v);
}

function formatTimestamp(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function MetricCard({ title, color, data, children }: MetricCardProps) {
  const last = data[data.length - 1];
  const prev = data[data.length - 2];

  const lastValue = last?.value ?? 0;
  const trendPct =
    prev && prev.value !== 0
      ? ((lastValue - prev.value) / prev.value) * 100
      : null;
  const trendUp = trendPct !== null ? trendPct >= 0 : null;

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between">
        <span
          className="text-sm font-medium tracking-wide"
          style={{ color: "var(--foreground)", opacity: 0.7 }}
        >
          {title}
        </span>
        <span
          className="text-xs tabular-nums"
          style={{ color: "var(--axis-label)" }}
        >
          Updated {formatTimestamp()}
        </span>
      </div>

      {/* Big number + trend */}
      <div className="flex items-end gap-3">
        <span
          className="font-semibold leading-none"
          style={{
            fontSize: "36px",
            color,
            fontFamily: "var(--font-geist-sans, sans-serif)",
          }}
        >
          {formatValue(lastValue)}
        </span>
        {trendUp !== null && trendPct !== null && (
          <div
            className="flex items-center gap-0.5 text-sm font-medium mb-0.5"
            style={{ color: trendUp ? "#16a34a" : "#dc2626" }}
          >
            <span>{trendUp ? "↑" : "↓"}</span>
            <span>{Math.abs(trendPct).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {/* Chart */}
      {children}
    </div>
  );
}
