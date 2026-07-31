import { useLayoutEffect, useRef } from "react";

const WORDS = ["wh0isalfred", "Alfred Enyinna", "Software Engineer", "Cloud Security", "wh0isalfred"];
const HOLD_MS = 2400;
const TRANSITION_MS = 550;
const FONT_PX = 20;
const FONT = `600 ${FONT_PX}px 'IBM Plex Mono', monospace`;
const BLOCK = 3; // fine-grained resolution used only during the dissolve transition

type Grid = { w: number; h: number; cells: boolean[]; textW: number };

function textToGrid(measureCtx: CanvasRenderingContext2D, text: string): Grid {
  measureCtx.font = FONT;
  const textW = measureCtx.measureText(text).width;
  const w = Math.ceil(textW / BLOCK) + 2;
  const h = Math.ceil((FONT_PX * 1.3) / BLOCK);

  const off = document.createElement("canvas");
  off.width = w * BLOCK;
  off.height = h * BLOCK;
  const octx = off.getContext("2d")!;
  octx.font = FONT;
  octx.fillStyle = "#fff";
  octx.textBaseline = "middle";
  octx.fillText(text, 1, off.height / 2);

  const data = octx.getImageData(0, 0, off.width, off.height).data;
  const cells: boolean[] = [];
  for (let gy = 0; gy < h; gy++) {
    for (let gx = 0; gx < w; gx++) {
      const px = gx * BLOCK + BLOCK / 2;
      const py = gy * BLOCK + BLOCK / 2;
      const idx = (py * off.width + px) * 4 + 3;
      cells.push((data[idx] || 0) > 90);
    }
  }
  return { w, h, cells, textW };
}

export default function PixelMorphLogo({ color = "#F6F7F8" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const dpr = window.devicePixelRatio || 1;
    const grids = WORDS.map((w) => textToGrid(ctx, w));
    const maxTextW = Math.max(...grids.map((g) => g.textW));
    const canvasH = Math.ceil(FONT_PX * 1.4);
    const canvasW = Math.ceil(maxTextW) + 8;

    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = canvasW + "px";
    canvas.style.height = canvasH + "px";
    ctx.scale(dpr, dpr);

    let wordIndex = 0;
    let phase: "hold" | "transition" = "hold";
    let phaseStart = performance.now();
    let raf = 0;
    let delays: number[] = [];

    function seedDelays(count: number) {
      delays = Array.from({ length: count }, () => Math.random() * 0.6);
    }

    function drawCrisp(word: string) {
      ctx.clearRect(0, 0, canvasW, canvasH);
      ctx.font = FONT;
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.globalAlpha = 1;
      ctx.fillText(word, 1, canvasH / 2);
    }

    function draw(now: number) {
      const from = grids[wordIndex];
      const to = grids[(wordIndex + 1) % grids.length];
      const elapsed = now - phaseStart;

      if (phase === "hold") {
        drawCrisp(WORDS[wordIndex]);
        if (elapsed > HOLD_MS) {
          phase = "transition";
          phaseStart = now;
          seedDelays(Math.max(from.w, to.w) * Math.max(from.h, to.h));
        }
      } else {
        const w = Math.max(from.w, to.w);
        const h = Math.max(from.h, to.h);
        const t = Math.min(1, elapsed / TRANSITION_MS);

        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.fillStyle = color;

        for (let gy = 0; gy < h; gy++) {
          for (let gx = 0; gx < w; gx++) {
            const i = gy * w + gx;
            const wasOn = gx < from.w && gy < from.h && from.cells[gy * from.w + gx];
            const willBeOn = gx < to.w && gy < to.h && to.cells[gy * to.w + gx];
            const localT = Math.max(0, Math.min(1, (t - (delays[i] || 0) * 0.4) / 0.6));

            let alpha = 0;
            if (wasOn && willBeOn) alpha = 1;
            else if (wasOn && !willBeOn) alpha = 1 - localT;
            else if (!wasOn && willBeOn) alpha = localT;

            if (alpha > 0.04) {
              ctx.globalAlpha = alpha;
              ctx.fillRect(gx * BLOCK, gy * BLOCK, BLOCK - 0.5, BLOCK - 0.5);
            }
          }
        }
        ctx.globalAlpha = 1;

        if (t >= 1) {
          phase = "hold";
          phaseStart = now;
          wordIndex = (wordIndex + 1) % grids.length;
        }
      }
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [color]);

  return <canvas ref={canvasRef} className="pixel-logo-canvas" aria-label="wh0isalfred" role="img" />;
}
