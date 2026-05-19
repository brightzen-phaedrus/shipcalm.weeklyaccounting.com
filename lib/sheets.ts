import { JWT } from "google-auth-library";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

export type SeriesPoint = { week: string; value: number };

let cachedClient: JWT | null = null;

function getClient(): JWT {
  if (cachedClient) return cachedClient;
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  // Vercel multi-line env vars come through as real newlines, but support
  // the literal "\n" form too in case the key was pasted single-line.
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !key) {
    throw new Error(
      "Missing Google credentials: set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY.",
    );
  }
  cachedClient = new JWT({ email, key, scopes: SCOPES });
  return cachedClient;
}

async function batchGetRows(
  tab: string,
  rows: number[],
): Promise<(string[] | undefined)[]> {
  if (!SHEET_ID) {
    throw new Error("Missing GOOGLE_SHEET_ID env var.");
  }
  const client = getClient();
  const token = await client.getAccessToken();
  if (!token?.token) throw new Error("Failed to obtain Google access token.");

  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet`,
  );
  for (const r of rows) url.searchParams.append("ranges", `${tab}!${r}:${r}`);
  url.searchParams.set("majorDimension", "ROWS");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.token}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Sheets API ${res.status}: ${await res.text()}`);
  }
  const json = (await res.json()) as {
    valueRanges?: Array<{ values?: string[][] }>;
  };
  return (json.valueRanges ?? []).map((vr) => vr.values?.[0]);
}

export async function getContractSentSeries(): Promise<SeriesPoint[]> {
  const [weekRow, dataRow] = await batchGetRows("MMM", [1, 53]);
  const weeks = weekRow ?? [];
  const values = dataRow ?? [];
  const points: SeriesPoint[] = [];
  const len = Math.max(weeks.length, values.length);
  for (let i = 0; i < len; i++) {
    const week = String(weeks[i] ?? "").trim();
    const raw = String(values[i] ?? "").trim();
    if (!week || !raw) continue;
    const value = Number(raw.replace(/[,$]/g, ""));
    if (Number.isNaN(value)) continue;
    points.push({ week, value });
  }
  return points;
}
