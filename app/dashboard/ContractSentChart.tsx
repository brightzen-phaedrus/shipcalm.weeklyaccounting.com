"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SeriesPoint } from "@/lib/sheets";
import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

const COLOR = "#0070f3";
const GRADIENT_ID = "contractSentGradient";

function CustomTooltip({ active, payload, label }: TooltipContentProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null;
  const value = payload[0]?.value;
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
      style={{
        background: "var(--tooltip-bg)",
        border: "1px solid var(--tooltip-border)",
        color: "var(--tooltip-text)",
        fontFamily: "var(--font-geist-sans, sans-serif)",
      }}
    >
      <p style={{ color: "var(--tooltip-muted)", marginBottom: 2 }}>{label}</p>
      <p className="font-semibold" style={{ color: COLOR }}>
        {value !== undefined ? Number(value).toLocaleString() : "—"}
      </p>
    </div>
  );
}

export function ContractSentChart({ data }: { data: SeriesPoint[] }) {
  const [windowWidth, setWindowWidth] = useState<number>(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Fewer ticks on small screens
  const xInterval = windowWidth < 640
    ? Math.max(Math.floor(data.length / 4), 1)
    : windowWidth < 1024
    ? Math.max(Math.floor(data.length / 8), 1)
    : 0;

  const xAngle = windowWidth < 640 ? -45 : -30;

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -16, bottom: windowWidth < 640 ? 40 : 32 }}
        >
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLOR} stopOpacity={0.18} />
              <stop offset="95%" stopColor={COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="2 6"
            stroke="var(--grid-line)"
            vertical={false}
          />

          <XAxis
            dataKey="week"
            angle={xAngle}
            textAnchor="end"
            height={windowWidth < 640 ? 56 : 48}
            interval={xInterval}
            tick={{
              fontSize: 11,
              fill: "var(--axis-label)",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
            axisLine={{ stroke: "var(--card-border)" }}
            tickLine={false}
          />

          <YAxis
            tick={{
              fontSize: 11,
              fill: "var(--axis-label)",
              fontFamily: "var(--font-geist-mono, monospace)",
            }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            content={(props) => <CustomTooltip {...props} />}
            cursor={{ stroke: COLOR, strokeWidth: 1, strokeDasharray: "4 4" }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke={COLOR}
            strokeWidth={2}
            fill={`url(#${GRADIENT_ID})`}
            dot={{ r: 2, fill: COLOR, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: COLOR, stroke: "var(--card-bg)", strokeWidth: 2 }}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
