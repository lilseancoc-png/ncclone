"use client";

import { useCallback, useRef, useState } from "react";

interface ResizeHandleProps {
  onResize: (deltaY: number) => void;
}

export default function ResizeHandle({ onResize }: ResizeHandleProps) {
  const dragging = useRef(false);
  const lastY = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      lastY.current = e.clientY;
      setIsDragging(true);

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = lastY.current - ev.clientY;
        lastY.current = ev.clientY;
        onResize(delta);
      };

      const handleMouseUp = () => {
        dragging.current = false;
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [onResize]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      lastY.current = touch.clientY;
      dragging.current = true;
      setIsDragging(true);

      const handleTouchMove = (ev: TouchEvent) => {
        if (!dragging.current) return;
        const t = ev.touches[0];
        const delta = lastY.current - t.clientY;
        lastY.current = t.clientY;
        onResize(delta);
      };

      const handleTouchEnd = () => {
        dragging.current = false;
        setIsDragging(false);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [onResize]
  );

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={`relative flex items-center justify-center cursor-row-resize group touch-none select-none -my-1 py-1 ${
        isDragging ? "z-20" : ""
      }`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Visual track — thin baseline */}
      <div
        className={`absolute inset-x-0 h-px transition-colors ${
          isDragging ? "bg-violet-500/60" : "bg-transparent group-hover:bg-white/10"
        }`}
      />
      {/* Grip pill with dots */}
      <div
        className={`relative flex items-center justify-center gap-1 px-2.5 py-1 rounded-full border transition-colors ${
          isDragging
            ? "bg-violet-500/20 border-violet-500/50"
            : "bg-card/60 border-border/60 group-hover:bg-card group-hover:border-gray-500/60"
        }`}
      >
        <span
          className={`block w-1 h-1 rounded-full transition-colors ${
            isDragging ? "bg-violet-200" : "bg-gray-500 group-hover:bg-gray-300"
          }`}
        />
        <span
          className={`block w-1 h-1 rounded-full transition-colors ${
            isDragging ? "bg-violet-200" : "bg-gray-500 group-hover:bg-gray-300"
          }`}
        />
        <span
          className={`block w-1 h-1 rounded-full transition-colors ${
            isDragging ? "bg-violet-200" : "bg-gray-500 group-hover:bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
}
