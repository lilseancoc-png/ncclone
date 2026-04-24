"use client";

import { BarChartVisualState } from "@/data/types";

const BAR_COLORS: Record<string, { fill: string; stroke: string }> = {
  buy: { fill: "rgba(16, 185, 129, 0.75)", stroke: "#10b981" },
  sell: { fill: "rgba(244, 63, 94, 0.75)", stroke: "#f43f5e" },
  container: { fill: "rgba(59, 130, 246, 0.75)", stroke: "#3b82f6" },
  max: { fill: "rgba(168, 85, 247, 0.75)", stroke: "#a855f7" },
  default: { fill: "rgba(100, 116, 139, 0.55)", stroke: "#94a3b8" },
};

const LABEL_COLORS: Record<string, string> = {
  buy: "fill-emerald-400",
  sell: "fill-rose-400",
  container: "fill-blue-400",
  max: "fill-violet-400",
  default: "fill-gray-400",
};

export default function BarChartViz({ state }: { state: BarChartVisualState }) {
  const values = state.values;
  if (!values.length) return null;

  const maxBarValue = Math.max(
    ...values,
    ...(state.waterMask?.map((w, i) => (values[i] ?? 0) + w) ?? [0]),
    1,
  );

  const barWidth = 24;
  const barGap = 5;
  const marginTop = state.topLabels ? 22 : 8;
  const marginBottom = 18;
  const plotH = 120;
  const marginLeft = 8;
  const marginRight = 8;
  const totalH = marginTop + plotH + marginBottom;
  const totalW = marginLeft + marginRight + values.length * barWidth;

  const yFor = (v: number) => marginTop + plotH - (v / maxBarValue) * plotH;
  const xFor = (i: number) => marginLeft + i * barWidth + barGap / 2;
  const barInner = barWidth - barGap;
  const baseline = yFor(0);

  const container = state.containerBetween;

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <svg width={totalW} height={totalH} className="overflow-visible">
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
          const y = yFor(v);
          const h = baseline - y;
          const cx = xFor(i) + barInner / 2;
          const topLabel = state.topLabels?.[i];
          const labelColor = LABEL_COLORS[colorKey] ?? LABEL_COLORS.default;
          return (
            <g key={i}>
              <rect
                x={xFor(i)}
                y={y}
                width={barInner}
                height={h}
                fill={c.fill}
                stroke={c.stroke}
                strokeWidth={1}
                rx={1}
              />
              <text
                x={cx}
                y={y - 3}
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

        {/* x-axis baseline */}
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
