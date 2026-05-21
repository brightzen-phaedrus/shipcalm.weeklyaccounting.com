interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No data available yet." }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 rounded-xl"
      style={{
        background: "var(--card-bg)",
        border: "1px dashed var(--card-border)",
      }}
    >
      <div className="text-3xl mb-3 select-none opacity-40">📭</div>
      <p className="text-sm font-medium" style={{ color: "var(--axis-label)" }}>
        No data to display
      </p>
      <p className="text-xs mt-1 text-center max-w-xs leading-relaxed" style={{ color: "var(--axis-label)" }}>
        {message}
      </p>
    </div>
  );
}
