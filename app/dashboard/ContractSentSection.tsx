import { getContractSentSeries, type SeriesPoint } from "@/lib/sheets";
import { MetricCard } from "./MetricCard";
import { ContractSentChart } from "./ContractSentChart";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";

export async function ContractSentSection() {
  let data: SeriesPoint[] = [];
  let error: string | null = null;

  try {
    data = await getContractSentSeries();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load chart data.";
  }

  if (error) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <p
          className="text-sm font-medium mb-4"
          style={{ color: "var(--foreground)", opacity: 0.7 }}
        >
          Contract Sent
        </p>
        <ErrorState message={error} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className="rounded-2xl p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        <p
          className="text-sm font-medium mb-4"
          style={{ color: "var(--foreground)", opacity: 0.7 }}
        >
          Contract Sent
        </p>
        <EmptyState message="No data points found in MMM!53." />
      </div>
    );
  }

  return (
    <MetricCard title="Contract Sent" color="var(--metric-contract-sent)" data={data}>
      <ContractSentChart data={data} />
    </MetricCard>
  );
}
