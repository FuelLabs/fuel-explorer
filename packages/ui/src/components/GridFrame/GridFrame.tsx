import { useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../utils/css';
import { FrameCorners } from './FrameCorners';

export interface GridFrameProps {
  children: React.ReactNode;
  className?: string;
  corners?: boolean;
}

interface Joint {
  x: number;
  y: number;
}

// Current option names plus the older aliases some browsers still use.
const VISIBLE_ONLY = {
  opacityProperty: true,
  visibilityProperty: true,
  checkOpacity: true,
  checkVisibilityCSS: true,
} as CheckVisibilityOptions;

// Cells meet on 1px lines, so a cell corner sits half a pixel outside its box.
function findJoints(frame: HTMLElement): Joint[] {
  const origin = frame.getBoundingClientRect();
  const left = origin.left + frame.clientLeft;
  const top = origin.top + frame.clientTop;
  const width = frame.clientWidth;
  const height = frame.clientHeight;
  const cells = [...frame.querySelectorAll<HTMLElement>('.fuel-edge')].filter(
    (cell) =>
      cell.parentElement?.closest('.fuel-edge, .fuel-grid-frame') === frame,
  );

  const joints = new Map<string, Joint>();
  for (const cell of cells) {
    // A faded-out cell, such as a collapsed panel, keeps its box but draws nothing.
    if (cell.checkVisibility?.(VISIBLE_ONLY) === false) continue;
    const box = cell.getBoundingClientRect();
    if (!box.width || !box.height) continue;
    for (const x of [box.left - left - 0.5, box.right - left + 0.5]) {
      for (const y of [box.top - top - 0.5, box.bottom - top + 0.5]) {
        const onSide = x < 1 || x > width - 1;
        const onEnd = y < 1 || y > height - 1;
        if (onSide && onEnd) continue;
        joints.set(`${Math.round(x)}:${Math.round(y)}`, { x, y });
      }
    }
  }
  return [...joints.values()];
}

function sameJoints(a: Joint[], b: Joint[]) {
  return (
    a.length === b.length &&
    a.every((joint, i) => joint.x === b[i].x && joint.y === b[i].y)
  );
}

export function GridFrame({
  children,
  className,
  corners = true,
}: GridFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [joints, setJoints] = useState<Joint[]>([]);

  useLayoutEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    // An animated cell fires the observer on every frame, so measure once per frame at most.
    let pending = 0;
    const measure = () => {
      pending = 0;
      const next = findJoints(frame);
      setJoints((prev) => (sameJoints(prev, next) ? prev : next));
    };
    const resize = new ResizeObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(measure);
    });
    const observeCells = () => {
      resize.observe(frame);
      for (const cell of frame.querySelectorAll('.fuel-edge')) {
        resize.observe(cell);
      }
    };
    const mutations = new MutationObserver(observeCells);
    mutations.observe(frame, { childList: true, subtree: true });
    observeCells();
    // Fades change visibility without a resize, so measure again when one ends.
    const remeasure = () => {
      if (!pending) pending = requestAnimationFrame(measure);
    };
    frame.addEventListener('transitionend', remeasure);
    return () => {
      cancelAnimationFrame(pending);
      resize.disconnect();
      mutations.disconnect();
      frame.removeEventListener('transitionend', remeasure);
    };
  }, []);

  return (
    <div ref={ref} className={cx('fuel-grid-frame', className)}>
      {corners && <FrameCorners />}
      {joints.map(({ x, y }) => (
        <span
          key={`${Math.round(x)}:${Math.round(y)}`}
          aria-hidden
          className="fuel-grid-joint"
          style={{ left: x, top: y }}
        />
      ))}
      {children}
    </div>
  );
}
