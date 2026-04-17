const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f472b6", "#a78bfa", "#34d399"];
const PARTICLE_COUNT = 80;
const DURATION = 2000;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function fireConfetti() {
  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d")!;
  const cx = canvas.width / 2;

  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: cx + (Math.random() - 0.5) * 200,
    y: canvas.height * 0.5,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 14 - 4,
    size: Math.random() * 6 + 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.3,
    opacity: 1,
  }));

  const start = performance.now();

  function animate(now: number) {
    const elapsed = now - start;
    if (elapsed > DURATION) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fadeStart = DURATION * 0.6;

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.rotation += p.rotationSpeed;
      p.opacity = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (DURATION - fadeStart) : 1;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
