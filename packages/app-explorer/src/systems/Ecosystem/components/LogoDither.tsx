import { useEffect, useRef } from 'react';
import { cx } from '~/systems/Core/utils/cx';
import type { Project } from '~/types/ecosystem';
import { localProjectLogo, logoUrl } from '../utils/projectLogo';
import { projectSlug } from '../utils/projectSlug';

type RGB = [number, number, number];

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

const NEUTRAL: RGB[] = [
  [231, 229, 228],
  [168, 162, 158],
  [68, 64, 60],
];

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  }
  return h >>> 0;
}

function luminance([r, g, b]: RGB) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

// Up to three dominant logo colors, light to dark.
function extractPalette(img: HTMLImageElement): RGB[] {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return NEUTRAL;
  ctx.drawImage(img, 0, 0, 32, 32);
  const { data } = ctx.getImageData(0, 0, 32, 32);
  const buckets = new Map<number, { n: number; sum: RGB }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const key = ((r >> 5) << 6) | ((g >> 5) << 3) | (b >> 5);
    const bucket = buckets.get(key) ?? { n: 0, sum: [0, 0, 0] as RGB };
    bucket.n++;
    bucket.sum[0] += r;
    bucket.sum[1] += g;
    bucket.sum[2] += b;
    buckets.set(key, bucket);
  }
  const colors = [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .map((bucket) => bucket.sum.map((v) => Math.round(v / bucket.n)) as RGB);
  const picked: RGB[] = [];
  for (const color of colors) {
    const distinct = picked.every(
      (p) => Math.hypot(p[0] - color[0], p[1] - color[1], p[2] - color[2]) > 60,
    );
    if (distinct) picked.push(color);
    if (picked.length === 3) break;
  }
  if (!picked.length) return NEUTRAL;
  if (picked.length === 1) {
    const [r, g, b] = picked[0];
    picked.push([r * 0.45, g * 0.45, b * 0.45].map(Math.round) as RGB);
    picked.push(
      [255 - (255 - r) * 0.3, 255 - (255 - g) * 0.3, 255 - (255 - b) * 0.3].map(
        Math.round,
      ) as RGB,
    );
  }
  return picked.sort((a, b) => luminance(b) - luminance(a));
}

// A flowing field, ordered-dithered into the palette. The seed fixes the shape.
function draw(canvas: HTMLCanvasElement, palette: RGB[], seed: number) {
  const W = 96;
  const H = 72;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const img = ctx.createImageData(W, H);
  const angle = ((seed & 255) / 255) * Math.PI * 2;
  const f1 = 0.05 + ((seed >> 8) & 15) / 300;
  const f2 = 0.08 + ((seed >> 12) & 15) / 250;
  const offset = (seed >> 16) & 63;
  const n = palette.length;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const u = x * Math.cos(angle) + y * Math.sin(angle);
      const v = -x * Math.sin(angle) + y * Math.cos(angle);
      let t =
        0.5 +
        0.28 * Math.sin(u * f1 + Math.sin(v * f2 + offset) * 1.8) +
        0.18 * Math.sin((u + v) * f2 * 0.7 + offset * 0.3) +
        0.1 * (y / H - 0.5);
      t = Math.min(0.999, Math.max(0, t));
      t = 0.5 + (t - 0.5) * 0.75;
      const scaled = t * (n - 1);
      const lo = Math.floor(scaled);
      const threshold = (BAYER[y & 7][x & 7] + 0.5) / 64;
      const color =
        palette[Math.min(n - 1, scaled - lo > threshold ? lo + 1 : lo)];
      const i = (y * W + x) * 4;
      img.data[i] = color[0];
      img.data[i + 1] = color[1];
      img.data[i + 2] = color[2];
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export function LogoDither({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const seed = hash(projectSlug(project));
    draw(canvas, NEUTRAL, seed);
    if (!project.image) return;
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      try {
        draw(canvas, extractPalette(img), seed);
      } catch {
        // A tainted canvas keeps the neutral palette.
      }
    };
    // Local first; the feed's own image if this project has no local file.
    let fellBack = false;
    img.onerror = () => {
      if (cancelled || fellBack) return;
      fellBack = true;
      img.src = logoUrl(project.image, 'remote');
    };
    img.src = localProjectLogo(project.image);
    return () => {
      cancelled = true;
    };
  }, [project]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cx(
        'pointer-events-none absolute inset-0 size-full [image-rendering:pixelated]',
        className,
      )}
    />
  );
}
