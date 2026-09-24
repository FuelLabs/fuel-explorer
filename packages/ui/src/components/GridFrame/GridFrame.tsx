import { useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../utils/css';

export interface GridFrameProps {
  children: React.ReactNode;
  className?: string;
}

interface Joint {
  x: number;
  y: number;
}

const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

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

export function GridFrame({ children, className }: GridFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [joints, setJoints] = useState<Joint[]>([]);

  useLayoutEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const resize = new ResizeObserver(() => {
      const next = findJoints(frame);
      setJoints((prev) => (sameJoints(prev, next) ? prev : next));
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
    return () => {
      resize.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={cx('fuel-grid-frame', className)}>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={`fuel-corner fuel-corner-${corner}`}
        />
      ))}
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
