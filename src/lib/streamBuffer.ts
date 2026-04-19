// RAF-paced typewriter buffer. Drains whatever is buffered in ~TARGET_DRAIN_MS
// so short bursts feel deliberate and big bursts don't fall miles behind.
const TARGET_DRAIN_MS = 280;
const MIN_RATE_CPS = 80;
const MAX_RATE_CPS = 1800;

export interface StreamBuffer {
  push: (delta: string) => void;
  flush: () => void;
  cancel: () => void;
}

export function createStreamBuffer(
  onChunk: (slice: string) => void,
): StreamBuffer {
  const buffer = { value: "" };
  let rafId: number | null = null;
  let lastFrame = performance.now();

  const tick = (now: number) => {
    const dt = Math.min(now - lastFrame, 100);
    lastFrame = now;
    const len = buffer.value.length;
    if (len === 0) {
      rafId = null;
      return;
    }
    const adaptiveRate = (len / TARGET_DRAIN_MS) * 1000;
    const rate = Math.max(MIN_RATE_CPS, Math.min(MAX_RATE_CPS, adaptiveRate));
    const want = Math.max(1, Math.floor((dt / 1000) * rate));
    const slice = buffer.value.slice(0, want);
    buffer.value = buffer.value.slice(want);
    onChunk(slice);
    rafId = requestAnimationFrame(tick);
  };

  const cancelTick = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return {
    push(delta: string) {
      if (!delta) return;
      buffer.value += delta;
      if (rafId === null) {
        lastFrame = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    },
    flush() {
      cancelTick();
      if (buffer.value.length > 0) {
        const remaining = buffer.value;
        buffer.value = "";
        onChunk(remaining);
      }
    },
    cancel() {
      cancelTick();
      buffer.value = "";
    },
  };
}
