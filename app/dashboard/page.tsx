import { Suspense } from "react";
import { auth, signOut } from "@/auth";
import { ErrorBoundary } from "./ErrorBoundary";
import { ChartSkeleton } from "./ChartSkeleton";
import { ContractSentSection } from "./ContractSentSection";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div
      className="min-h-dvh"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Top nav */}
      <header
        className="sticky top-0 z-10 px-6 py-3 flex items-center justify-between"
        style={{
          background: "var(--card-bg)",
          borderBottom: "1px solid var(--card-border)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Logo + brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold select-none"
            style={{ background: "var(--metric-contract-sent)" }}
            aria-hidden="true"
          >
            SC
          </div>
          <span className="font-semibold text-base tracking-tight">
            ShipCalm
          </span>
        </div>

        {/* User + sign out */}
        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <span
              className="text-xs hidden sm:block"
              style={{ color: "var(--axis-label)" }}
            >
              {session.user.email}
            </span>
          )}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors"
              style={{
                color: "var(--axis-label)",
                border: "1px solid var(--card-border)",
              }}
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 sm:px-6 py-8 max-w-6xl mx-auto">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm mt-1" style={{ color: "var(--axis-label)" }}>
            Metrics at a glance
          </p>
        </div>

        {/* Metrics grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ErrorBoundary>
            <Suspense fallback={<ChartSkeleton />}>
              <ContractSentSection />
            </Suspense>
          </ErrorBoundary>

          {/* Placeholder card for future metrics */}
          {/* <ErrorBoundary>
            <Suspense fallback={<ChartSkeleton />}>
              <AnotherMetricSection />
            </Suspense>
          </ErrorBoundary> */}
        </div>
      </main>
    </div>
  );
}
