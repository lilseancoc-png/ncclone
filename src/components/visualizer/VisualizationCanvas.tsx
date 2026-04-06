"use client";

import { DataStructureState } from "@/data/types";
import ArrayViz from "./structures/ArrayViz";
import SetViz from "./structures/SetViz";
import HashMapViz from "./structures/HashMapViz";
import StackViz from "./structures/StackViz";
import VariablesViz from "./structures/VariablesViz";
import TreeViz from "./structures/TreeViz";
import LinkedListViz from "./structures/LinkedListViz";
import MatrixViz from "./structures/MatrixViz";
import GraphViz from "./structures/GraphViz";

export default function VisualizationCanvas({
  structures,
}: {
  structures: DataStructureState[];
}) {
  return (
    <div className="space-y-3">
      {structures.map((s, i) => {
        switch (s.type) {
          case "array":
            return <ArrayViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "set":
            return <SetViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "hashmap":
            return <HashMapViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "stack":
            return <StackViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "variables":
            return <VariablesViz key={`${s.type}-${i}`} state={s} />;
          case "tree":
            return <TreeViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "linkedlist":
            return <LinkedListViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "matrix":
            return <MatrixViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          case "graph":
            return <GraphViz key={`${s.type}-${s.label}-${i}`} state={s} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
