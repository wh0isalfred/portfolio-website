import { useEffect, useRef } from "react";

const PALETTE = ["#59D6FF", "#59D6FF", "#2CCFB7", "#2CCFB7", "#C7A55A", "#F6F7F8"];

function randomColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}

type Particle = { x: number; y: number; life: number; color: string; size: number };

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // skip on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let particles: Particle[] = [];

    const onMove = (e: MouseEvent) => {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          life: 1,
          color: randomColor(),
          size: 2 + Math.random() * 2,
        });
      }
      if (particles.length > 160) particles = particles.slice(-160);
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.life -= 0.03;
        p.y -= 0.15;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      particles = particles.filter((p) => p.life > 0);
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="mouse-trail-canvas" aria-hidden="true" />;
}
