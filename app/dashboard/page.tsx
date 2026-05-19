import { auth, signOut } from "@/auth";
import { getContractSentSeries, type SeriesPoint } from "@/lib/sheets";
import { ContractSentChart } from "./ContractSentChart";

export default async function DashboardPage() {
  const session = await auth();

  let data: SeriesPoint[] = [];
  let error: string | null = null;
  try {
    data = await getContractSentSeries();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load chart data.";
  }

  return (
    <main className="min-h-dvh p-6 space-y-6 max-w-5xl mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">ShipCalm Dashboard</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="text-sm underline" type="submit">Sign out</button>
        </form>
      </header>
      <p className="text-sm text-gray-600">
        Signed in as {session?.user?.email}
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Contract Sent</h2>
        {error ? (
          <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : data.length === 0 ? (
          <p className="text-sm text-gray-500">No data points found in MMM!53.</p>
        ) : (
          <ContractSentChart data={data} />
        )}
      </section>
    </main>
  );
}
