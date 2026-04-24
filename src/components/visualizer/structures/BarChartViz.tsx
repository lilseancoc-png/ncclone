"use client";

import { BarChartVisualState } from "@/data/types";

const BAR_COLORS: Record<string, { fill: string; stroke: string }> = {
  buy: { fill: "rgba(16, 185, 129, 0.75)", stroke: "#10b981" },
  sell: { fill: "rgba(244, 63, 94, 0.75)", stroke: "#f43f5e" },
  container: { fill: "rgba(59, 130, 246, 0.75)", stroke: "#3b82f6" },
  max: { fill: "rgba(168, 85, 247, 0.8)", stroke: "#c084fc" },
  dim: { fill: "rgba(100, 116, 139, 0.35)", stroke: "#64748b" },
  default: { fill: "rgba(100, 116, 139, 0.55)", stroke: "#94a3b8" },
};

const LABEL_COLORS: Record<string, string> = {
  buy: "fill-emerald-400",
  sell: "fill-rose-400",
  container: "fill-blue-400",
  max: "fill-violet-300",
  dim: "fill-gray-500",
  default: "fill-gray-400",
};

export default function BarChartViz({ state }: { state: BarChartVisualState }) {
  const values = state.values;
  if (!values.length) return null;

  const waterTops = state.waterMask?.map((w, i) => (values[i] ?? 0) + (w ?? 0)) ?? [];
  const yMax = Math.max(0, ...values, ...waterTops, 1);
  const yMin = Math.min(0, ...values);
  const yRange = yMax - yMin || 1;

  const barWidth = 24;
  const barGap = 5;
  const marginTop = state.topLabels ? 22 : 8;
  const marginBottom = 18;
  const plotH = 120;
  const marginLeft = 8;
  const marginRight = 8;
  const totalH = marginTop + plotH + marginBottom;
  const totalW = marginLeft + marginRight + values.length * barWidth;

  const yFor = (v: number) => marginTop + ((yMax - v) / yRange) * plotH;
  const xFor = (i: number) => marginLeft + i * barWidth + barGap / 2;
  const barInner = barWidth - barGap;
  const baseline = yFor(0);

  const container = state.containerBetween;
  const range = state.highlightRange;

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <svg width={totalW} height={totalH} className="overflow-visible">
        {/* Subarray/window range overlay — drawn behind the bars */}
        {range && (
          <rect
            x={xFor(range.start) - barGap / 2}
            y={marginTop}
            width={
              xFor(range.end) + barInner - xFor(range.start) + barGap
            }
            height={plotH}
            fill={range.color ?? "rgba(168, 85, 247, 0.14)"}
            stroke={range.color ? undefined : "rgba(168, 85, 247, 0.35)"}
            strokeDasharray="3 3"
            rx={3}
          />
        )}

        {/* Trapping-rain water columns, sitting on top of each bar */}
        {state.waterMask?.map((w, i) => {
          if (!w || w <= 0) return null;
          const top = yFor(values[i] + w);
          const bottom = yFor(values[i]);
          return (
            <rect
              key={`water-${i}`}
              x={xFor(i)}
              y={top}
              width={barInner}
              height={bottom - top}
              fill="rgba(34, 211, 238, 0.35)"
              stroke="rgba(34, 211, 238, 0.55)"
              strokeWidth={1}
            />
          );
        })}

        {/* Container-with-most-water shaded area between two pointers */}
        {container && (
          <rect
            x={xFor(container.left) + barInner}
            y={yFor(container.level)}
            width={xFor(container.right) - xFor(container.left) - barInner}
            height={baseline - yFor(container.level)}
            fill="rgba(59, 130, 246, 0.18)"
            stroke="rgba(59, 130, 246, 0.5)"
            strokeDasharray="3 3"
          />
        )}

        {/* Bars */}
        {values.map((v, i) => {
          const colorKey = state.barColors?.[i] ?? "default";
          const c = BAR_COLORS[colorKey] ?? BAR_COLORS.default;
          const y0 = yFor(v);
          const top = Math.min(y0, baseline);
          const bottom = Math.max(y0, baseline);
          const cx = xFor(i) + barInner / 2;
          const topLabel = state.topLabels?.[i];
          const labelColor = LABEL_COLORS[colorKey] ?? LABEL_COLORS.default;
          const valueLabelY = v >= 0 ? y0 - 3 : y0 + 10;
          return (
            <g key={i}>
              <rect
                x={xFor(i)}
                y={top}
                width={barInner}
                height={Math.max(1, bottom - top)}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1}
                rx={1}
              />
              <text
                x={cx}
                y={valueLabelY}
                textAnchor="middle"
                fontSize={9}
                className="fill-gray-400 font-mono"
              >
                {v}
              </text>
              <text
                x={cx}
                y={totalH - 4}
                textAnchor="middle"
                fontSize={9}
                className="fill-gray-600 font-mono"
              >
                {i}
              </text>
              {topLabel && (
                <text
                  x={cx}
                  y={marginTop - 8}
                  textAnchor="middle"
                  fontSize={9}
                  className={`font-mono font-semibold ${labelColor}`}
                >
                  {topLabel}
                </text>
              )}
            </g>
          );
        })}

        {/* x-axis baseline (zero line) */}
        <line
          x1={marginLeft}
          x2={totalW - marginRight}
          y1={baseline}
          y2={baseline}
          stroke="#374151"
          strokeWidth={1}
        />
      </svg>
      {state.caption && (
        <div className="text-[11px] text-gray-400">{state.caption}</div>
      )}
    </div>
  );
}
