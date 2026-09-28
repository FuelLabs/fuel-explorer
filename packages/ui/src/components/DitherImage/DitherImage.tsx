import { useEffect, useRef } from 'react';
import { cx } from '../../utils/css';

// A cell is inked when its brightness falls below (rank + 0.5) / 16.
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(
  (rank) => (rank + 0.5) / 16,
);

const BRIGHTNESS_PERIOD = 6400;
const CELL_PERIOD = 32000;
const FRAME_MS = 80;

export interface DitherImageProps {
  src: string;
  /** Cell size in CSS px; rounded to whole device pixels. */
  cell?: number;
  brightness?: number;
  contrast?: number;
  className?: string;
  /** Sine amplitude added to `cell`. */
  cellMotion?: number;
  /** Sine amplitude added to `brightness`. */
  brightnessMotion?: number;
}

type Ink = 'shadows' | 'highlights';

function gridSize(box: DOMRect, cell: number, dpr: number) {
  const cellPx = Math.max(1, Math.round(cell * dpr));
  const cols = Math.ceil((box.width * dpr) / cellPx);
  const rows = Math.ceil((box.height * dpr) / cellPx);
  return { cellPx, cols, rows };
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function layoutCanvas(
  canvas: HTMLCanvasElement,
  cols: number,
  rows: number,
  cellPx: number,
  dpr: number,
) {
  if (canvas.width !== cols || canvas.height !== rows) {
    canvas.width = cols;
    canvas.height = rows;
  }
  canvas.style.width = `${(cols * cellPx) / dpr}px`;
  canvas.style.height = `${(rows * cellPx) / dpr}px`;
}

function sampleLuma(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  cols: number,
  rows: number,
) {
  ctx.imageSmoothingQuality = 'high';
  const scale = Math.max(cols / image.width, rows / image.height);
  const w = image.width * scale;
  const h = image.height * scale;
  ctx.drawImage(image, (cols - w) / 2, (rows - h) / 2, w, h);
  const pixels = ctx.getImageData(0, 0, cols, rows);
  const luma = new Float32Array(cols * rows);
  const d = pixels.data;
  for (let p = 0; p < luma.length; p++) {
    const i = p * 4;
    luma[p] = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
  }
  return luma;
}

function paint(
  ctx: CanvasRenderingContext2D,
  buffer: ImageData,
  luma: Float32Array,
  cols: number,
  ink: Ink,
  brightness: number,
  contrast: number,
) {
  const d = buffer.data;
  const tone = ink === 'shadows' ? 0 : 255;
  const inkShadows = ink === 'shadows';
  for (let y = 0, p = 0; y < buffer.height; y++) {
    const row = (y & 3) * 4;
    for (let x = 0; x < cols; x++, p++) {
      const i = p * 4;
      const v = (luma[p] - 0.5) * contrast + 0.5 + brightness;
      const shadow = v < BAYER4[row + (x & 3)];
      d[i] = tone;
      d[i + 1] = tone;
      d[i + 2] = tone;
      d[i + 3] = shadow === inkShadows ? 255 : 0;
    }
  }
  ctx.putImageData(buffer, 0, 0);
}

export function DitherImage({
  src,
  cell = 1,
  brightness = 0,
  contrast = 1,
  className,
  cellMotion = 0,
  brightnessMotion = 0,
}: DitherImageProps) {
  const shadows = useRef<HTMLCanvasElement>(null);
  const highlights = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const parent = shadows.current?.parentElement;
    if (!parent) return;
    const image = new Image();
    let raf = 0;
    let lastFrame = 0;
    let cached: {
      cellPx: number;
      cols: number;
      rows: number;
      luma: Float32Array;
    } | null = null;
    let shadowBuffer: ImageData | null = null;
    let highlightBuffer: ImageData | null = null;
    type CellLevel = {
      cellPx: number;
      cols: number;
      rows: number;
      brightness: number;
      luma: Float32Array;
      shadow: HTMLCanvasElement;
      highlight: HTMLCanvasElement;
    };
    const levels = new Map<number, CellLevel>();
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const moving = !reduced && (cellMotion !== 0 || brightnessMotion !== 0);

    const render = (now: number) => {
      if (!image.complete || !image.naturalWidth) return;
      const shadowCanvas = shadows.current;
      const highlightCanvas = highlights.current;
      if (!shadowCanvas || !highlightCanvas) return;
      const box = parent.getBoundingClientRect();
      if (!box.width || !box.height) return;

      const dpr = window.devicePixelRatio || 1;
      const cellNow =
        cell +
        (moving ? Math.sin((now / CELL_PERIOD) * Math.PI * 2) * cellMotion : 0);
      const brightnessNow =
        brightness +
        (moving
          ? Math.sin((now / BRIGHTNESS_PERIOD) * Math.PI * 2) * brightnessMotion
          : 0);
      const shadowCtx = shadowCanvas.getContext('2d', {
        willReadFrequently: true,
      });
      const highlightCtx = highlightCanvas.getContext('2d', {
        willReadFrequently: true,
      });
      if (!shadowCtx || !highlightCtx) return;

      if (moving && cellMotion !== 0) {
        const exact = Math.max(1, cellNow * dpr);
        const loPx = Math.floor(exact);
        const hiPx = Math.ceil(exact);
        const mix = loPx === hiPx ? 0 : smoothstep(exact - loPx);
        const dw = Math.max(1, Math.round(box.width * dpr));
        const dh = Math.max(1, Math.round(box.height * dpr));
        const levelFor = (cellPx: number) => {
          const cols = Math.ceil((box.width * dpr) / cellPx);
          const rows = Math.ceil((box.height * dpr) / cellPx);
          let level = levels.get(cellPx);
          if (!level || level.cols !== cols || level.rows !== rows) {
            const sampleCanvas = document.createElement('canvas');
            sampleCanvas.width = cols;
            sampleCanvas.height = rows;
            const sampleCtx = sampleCanvas.getContext('2d', {
              willReadFrequently: true,
            });
            if (!sampleCtx) return null;
            const luma = sampleLuma(sampleCtx, image, cols, rows);
            const shadow = document.createElement('canvas');
            const highlight = document.createElement('canvas');
            shadow.width = highlight.width = cols;
            shadow.height = highlight.height = rows;
            level = {
              cellPx,
              cols,
              rows,
              brightness: Number.NaN,
              luma,
              shadow,
              highlight,
            };
            const shadowLevelCtx = shadow.getContext('2d', {
              willReadFrequently: true,
            });
            const highlightLevelCtx = highlight.getContext('2d', {
              willReadFrequently: true,
            });
            if (!shadowLevelCtx || !highlightLevelCtx) return null;
            paint(
              shadowLevelCtx,
              shadowLevelCtx.createImageData(cols, rows),
              luma,
              cols,
              'shadows',
              brightnessNow,
              contrast,
            );
            paint(
              highlightLevelCtx,
              highlightLevelCtx.createImageData(cols, rows),
              luma,
              cols,
              'highlights',
              brightnessNow,
              contrast,
            );
            level.brightness = brightnessNow;
            levels.set(cellPx, level);
          } else if (level.brightness !== brightnessNow) {
            const shadowLevelCtx = level.shadow.getContext('2d', {
              willReadFrequently: true,
            });
            const highlightLevelCtx = level.highlight.getContext('2d', {
              willReadFrequently: true,
            });
            if (!shadowLevelCtx || !highlightLevelCtx) return level;
            paint(
              shadowLevelCtx,
              shadowLevelCtx.createImageData(cols, rows),
              level.luma,
              cols,
              'shadows',
              brightnessNow,
              contrast,
            );
            paint(
              highlightLevelCtx,
              highlightLevelCtx.createImageData(cols, rows),
              level.luma,
              cols,
              'highlights',
              brightnessNow,
              contrast,
            );
            level.brightness = brightnessNow;
          }
          return level;
        };
        const lo = levelFor(loPx);
        const hi = hiPx === loPx ? lo : levelFor(hiPx);
        if (!lo || !hi) return;
        for (const key of levels.keys()) {
          if (key !== loPx && key !== hiPx) levels.delete(key);
        }
        const composite = (
          canvas: HTMLCanvasElement,
          ctx: CanvasRenderingContext2D,
          from: HTMLCanvasElement,
          to: HTMLCanvasElement,
        ) => {
          if (canvas.width !== dw || canvas.height !== dh) {
            canvas.width = dw;
            canvas.height = dh;
          }
          canvas.style.width = `${box.width}px`;
          canvas.style.height = `${box.height}px`;
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.globalAlpha = 1;
          ctx.clearRect(0, 0, dw, dh);
          ctx.imageSmoothingEnabled = false;
          if (mix <= 0) {
            ctx.drawImage(from, 0, 0, dw, dh);
            return;
          }
          ctx.globalAlpha = 1 - mix;
          ctx.drawImage(from, 0, 0, dw, dh);
          ctx.globalAlpha = mix;
          ctx.drawImage(to, 0, 0, dw, dh);
          ctx.globalAlpha = 1;
        };
        composite(shadowCanvas, shadowCtx, lo.shadow, hi.shadow);
        composite(highlightCanvas, highlightCtx, lo.highlight, hi.highlight);
        return;
      }

      const { cellPx, cols, rows } = gridSize(box, cellNow, dpr);

      layoutCanvas(shadowCanvas, cols, rows, cellPx, dpr);
      layoutCanvas(highlightCanvas, cols, rows, cellPx, dpr);
      if (
        !cached ||
        cached.cellPx !== cellPx ||
        cached.cols !== cols ||
        cached.rows !== rows
      ) {
        cached = {
          cellPx,
          cols,
          rows,
          luma: sampleLuma(shadowCtx, image, cols, rows),
        };
        shadowBuffer = shadowCtx.createImageData(cols, rows);
        highlightBuffer = highlightCtx.createImageData(cols, rows);
      }
      if (!shadowBuffer || !highlightBuffer) return;
      paint(
        shadowCtx,
        shadowBuffer,
        cached.luma,
        cols,
        'shadows',
        brightnessNow,
        contrast,
      );
      paint(
        highlightCtx,
        highlightBuffer,
        cached.luma,
        cols,
        'highlights',
        brightnessNow,
        contrast,
      );
    };

    const loop = (now: number) => {
      if (now - lastFrame >= FRAME_MS) {
        lastFrame = now;
        render(now);
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      render(performance.now());
      if (moving) raf = requestAnimationFrame(loop);
    };

    image.onload = start;
    image.src = src;
    if (image.complete && image.naturalWidth) start();

    const observer = new ResizeObserver(() => {
      cached = null;
      levels.clear();
      render(performance.now());
    });
    observer.observe(parent);
    return () => {
      image.onload = null;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [src, cell, brightness, contrast, cellMotion, brightnessMotion]);

  return (
    <>
      <canvas
        ref={shadows}
        aria-hidden
        data-ink="shadows"
        className={cx('fuel-dither', className)}
      />
      <canvas
        ref={highlights}
        aria-hidden
        data-ink="highlights"
        className={cx('fuel-dither', className)}
      />
    </>
  );
}
