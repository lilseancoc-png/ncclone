"use client";

import { LinkedListVisualState } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, { bg: string; border: string }> = {
  active: { bg: "rgba(59,130,246,0.3)", border: "#60a5fa" },
  found: { bg: "rgba(239,68,68,0.3)", border: "#f87171" },
  checked: { bg: "rgba(234,179,8,0.2)", border: "rgba(250,204,21,0.6)" },
  success: { bg: "rgba(34,197,94,0.3)", border: "#4ade80" },
  removed: { bg: "rgba(239,68,68,0.15)", border: "#f87171" },
};

const DEFAULT_STYLE = { bg: "rgba(26,26,46,0.8)", border: "rgba(75,85,99,0.5)" };

const NODE_W = 48;
const NODE_H = 32;
const GAP = 28;

export default function LinkedListViz({ state }: { state: LinkedListVisualState }) {
  const { nodes } = state;
  if (!nodes || nodes.length === 0) return null;

  const totalW = nodes.length * NODE_W + (nodes.length - 1) * GAP + 40;
  const svgH = state.cycle !== undefined ? 100 : 70;

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <svg
        viewBox={`0 0 ${totalW} ${svgH}`}
        className="w-full max-h-[100px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw arrows between nodes */}
        {nodes.map((_, i) => {
          if (i >= nodes.length - 1) return null;
          const x1 = 20 + i * (NODE_W + GAP) + NODE_W;
          const x2 = 20 + (i + 1) * (NODE_W + GAP);
          const y = 28;
          return (
            <g key={`arrow-${i}`}>
              <line
                x1={x1}
                y1={y}
                x2={x2 - 4}
                y2={y}
                stroke="#6b7280"
                strokeWidth="1.5"
              />
              {/* Arrowhead */}
              <polygon
                points={`${x2 - 4},${y - 4} ${x2 + 2},${y} ${x2 - 4},${y + 4}`}
                fill="#6b7280"
              />
            </g>
          );
        })}

        {/* NULL indicator at the end */}
        {state.cycle === undefined && (
          <g>
            <line
              x1={20 + (nodes.length - 1) * (NODE_W + GAP) + NODE_W}
              y1={28}
              x2={20 + (nodes.length - 1) * (NODE_W + GAP) + NODE_W + 16}
              y2={28}
              stroke="#6b7280"
              strokeWidth="1.5"
            />
            <text
              x={20 + (nodes.length - 1) * (NODE_W + GAP) + NODE_W + 20}
              y={32}
              className="text-[10px] font-mono fill-gray-500"
            >
              ∅
            </text>
          </g>
        )}

        {/* Cycle arrow */}
        {state.cycle !== undefined && (
          <g>
            {(() => {
              const tailX = 20 + (nodes.length - 1) * (NODE_W + GAP) + NODE_W;
              const targetX = 20 + state.cycle * (NODE_W + GAP) + NODE_W / 2;
              const curveY = svgH - 8;
              return (
                <>
                  <path
                    d={`M ${tailX} 36 C ${tailX + 12} ${curveY}, ${targetX - 12} ${curveY}, ${targetX} 44`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <polygon
                    points={`${targetX - 4},${40} ${targetX},${48} ${targetX + 4},${40}`}
                    fill="#f59e0b"
                  />
                </>
              );
            })()}
          </g>
        )}

        {/* Draw nodes */}
        {nodes.map((node, i) => {
          const x = 20 + i * (NODE_W + GAP);
          const y = 12;
          const style = node.highlight
            ? HIGHLIGHT_COLORS[node.highlight] || DEFAULT_STYLE
            : DEFAULT_STYLE;

          return (
            <g key={`node-${i}`}>
              <rect
                x={x}
                y={y}
                width={NODE_W}
                height={NODE_H}
                rx={6}
                fill={style.bg}
                stroke={style.border}
                strokeWidth="1.5"
              />
              <text
                x={x + NODE_W / 2}
                y={y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-mono font-medium fill-gray-200"
              >
                {String(node.value)}
              </text>
              {node.label && (
                <text
                  x={x + NODE_W / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-gray-400"
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
