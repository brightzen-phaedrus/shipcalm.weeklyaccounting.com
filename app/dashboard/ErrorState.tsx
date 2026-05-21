"use client";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 rounded-xl"
      style={{
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.2)",
      }}
    >
      <div className="text-3xl mb-3 select-none">⚠️</div>
      <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
        Failed to load data
      </p>
      <p className="text-xs text-red-500 dark:text-red-500 mb-5 text-center max-w-xs leading-relaxed">
        {message}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 text-xs font-medium rounded-lg transition-colors"
        style={{
          color: "var(--metric-contract-sent)",
          border: "1px solid rgba(0,112,243,0.3)",
          background: "rgba(0,112,243,0.06)",
        }}
      >
        Retry
      </button>
    </div>
  );
}
