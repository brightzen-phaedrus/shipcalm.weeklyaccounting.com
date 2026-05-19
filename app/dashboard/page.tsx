import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="min-h-dvh p-6 space-y-6 max-w-3xl mx-auto">
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
      <section className="rounded border border-dashed border-gray-300 p-12 text-center text-gray-500">
        Charts will appear here once data is wired up.
      </section>
    </main>
  );
}
