import { useEffect, useRef } from "react";

// Temperature lifecycle: off-white -> dust gold -> deep blue -> slate/background, fading out
const STOPS: { t: number; rgb: [number, number, number] }[] = [
  { t: 0.0, rgb: [236, 230, 217] }, // Off White
  { t: 0.32, rgb: [200, 168, 107] }, // Dust Gold
  { t: 0.68, rgb: [76, 120, 255] }, // Deep Blue
  { t: 1.0, rgb: [119, 128, 144] }, // Slate, fading toward background
];

function colorAt(t: number): [number, number, number] {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const a = STOPS[i];
    const b = STOPS[i + 1];
    if (t >= a.t && t <= b.t) {
      const localT = (t - a.t) / (b.t - a.t);
      return [
        a.rgb[0] + (b.rgb[0] - a.rgb[0]) * localT,
        a.rgb[1] + (b.rgb[1] - a.rgb[1]) * localT,
        a.rgb[2] + (b.rgb[2] - a.rgb[2]) * localT,
      ];
    }
  }
  return STOPS[STOPS.length - 1].rgb;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number; // 0..1
  lifeMs: number;
  born: number;
  baseSize: number;
  rotation: number;
  rotationSpeed: number;
};

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // interactive elements the trail should gently react near
    let hotRects: DOMRect[] = [];
    const refreshHotRects = () => {
      hotRects = Array.from(document.querySelectorAll("[data-trail-interactive]")).map((el) =>
        el.getBoundingClientRect()
      );
    };
    refreshHotRects();
    window.addEventListener("resize", refreshHotRects);
    window.addEventListener("scroll", refreshHotRects, { passive: true });
    const rectInterval = window.setInterval(refreshHotRects, 1200);

    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    const MAX_PARTICLES = 170;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      const speed = dist / dt; // px per ms

      const count = Math.max(1, Math.min(5, Math.round(speed * 14)));
      const spread = Math.min(14, 2 + speed * 10);

      for (let i = 0; i < count && particles.length < MAX_PARTICLES; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * spread;
        const big = Math.random() < 0.08;
        particles.push({
          x: e.clientX + Math.cos(angle) * r,
          y: e.clientY + Math.sin(angle) * r,
          vx: (Math.random() - 0.5) * 0.25 + (e.clientX - lastX) * 0.02,
          vy: -0.18 - Math.random() * 0.22,
          age: 0,
          lifeMs: 900 + Math.random() * 700,
          born: now,
          baseSize: (big ? 5.5 + Math.random() * 2.5 : 2.4 + Math.random() * 2),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: ((Math.random() - 0.5) * 15 * Math.PI) / 180 / 60,
        });
      }

      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    window.addEventListener("mousemove", onMove);

    function drawTile(p: Particle, size: number, alpha: number, rgb: [number, number, number]) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const r = size * 0.22;

      // soft shadow
      ctx.globalAlpha = alpha * 0.22;
      ctx.fillStyle = "#000000";
      roundRect(ctx, -size / 2 + 0.6, -size / 2 + 1, size, size, r);
      ctx.fill();

      // base tile
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
      roundRect(ctx, -size / 2, -size / 2, size, size, r);
      ctx.fill();

      // top-left highlight edge
      ctx.globalAlpha = alpha * 0.35;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, -size / 2, -size / 2, size, size * 0.35, r);
      ctx.fill();

      ctx.restore();
    }

    function roundRect(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
      if (typeof (c as any).roundRect === "function") {
        c.beginPath();
        (c as any).roundRect(x, y, w, h, r);
        return;
      }
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    let raf = 0;
    const tick = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles = particles.filter((p) => now - p.born < p.lifeMs);

      for (const p of particles) {
        const t = (now - p.born) / p.lifeMs; // 0..1
        const eased = easeOutCubic(t);

        // gentle proximity reaction to interactive elements
        let fx = 0,
          fy = 0;
        for (const rect of hotRects) {
          const pad = 26;
          const inside =
            p.x > rect.left - pad && p.x < rect.right + pad && p.y > rect.top - pad && p.y < rect.bottom + pad;
          if (inside) {
            const dx = p.x - (rect.left + rect.width / 2);
            const dy = p.y - (rect.top + rect.height / 2);
            const d = Math.max(1, Math.hypot(dx, dy));
            fx += (dx / d) * 0.006;
            fy += (dy / d) * 0.006;
          }
        }

        p.vx += fx;
        p.vy += fy;
        p.x += p.vx;
        p.y += p.vy * (1 - eased * 0.3);
        p.rotation += p.rotationSpeed;

        const size = p.baseSize * (1 - eased * 0.55);
        const alpha = 1 - Math.pow(t, 1.6);
        const rgb = colorAt(t);

        if (alpha > 0.02 && size > 0.3) {
          drawTile(p, size, Math.min(1, alpha) * 0.85, rgb);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", refreshHotRects);
      window.removeEventListener("scroll", refreshHotRects);
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(rectInterval);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-trail-canvas" aria-hidden="true" />;
}
