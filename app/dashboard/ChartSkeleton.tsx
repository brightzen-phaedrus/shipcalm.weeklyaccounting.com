export function ChartSkeleton() {
  return (
    <div
      className="rounded-2xl p-6 animate-pulse"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="h-3.5 w-32 rounded"
          style={{ background: "var(--grid-line)" }}
        />
        <div
          className="h-3 w-24 rounded"
          style={{ background: "var(--grid-line)" }}
        />
      </div>

      {/* Big number */}
      <div
        className="h-9 w-24 rounded mb-1"
        style={{ background: "var(--grid-line)" }}
      />
      <div
        className="h-3 w-16 rounded mb-6"
        style={{ background: "var(--grid-line)" }}
      />

      {/* Chart area */}
      <div
        className="h-[280px] w-full rounded-lg"
        style={{ background: "var(--grid-line)" }}
      />
    </div>
  );
}
