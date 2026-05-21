"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          className="rounded-2xl p-6 flex flex-col items-center justify-center py-12"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <div className="text-3xl mb-3 select-none">💥</div>
          <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
            Something went wrong
          </p>
          <p className="text-xs text-red-500 mb-5 text-center max-w-xs">
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 text-xs font-medium rounded-lg transition-colors"
            style={{
              color: "var(--metric-contract-sent)",
              border: "1px solid rgba(0,112,243,0.3)",
              background: "rgba(0,112,243,0.06)",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
