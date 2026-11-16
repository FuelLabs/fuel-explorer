const ALL = ['tl', 'tr', 'bl', 'br'] as const;
const PAIR = ['tl', 'br'] as const;

export type FrameCornersProps = {
  /**
   * all: four squares with lines fading outward, for page-level frames.
   * pair: top-left and bottom-right squares only, for a single box. Hidden
   * inside a GridFrame, which draws its own.
   */
  variant?: 'all' | 'pair';
};

// The corner squares of a framed box. The host must be positioned and draw its
// frame with its own 1px border; the squares centre on that line. Line length
// comes from --fuel-corner-reach and --fuel-corner-reach-y on any ancestor, so
// it can change per breakpoint.
export function FrameCorners({ variant = 'all' }: FrameCornersProps) {
  const pair = variant === 'pair';
  return (pair ? PAIR : ALL).map((corner) => (
    <span
      key={corner}
      aria-hidden
      className={`fuel-corner fuel-corner-${corner}${pair ? ' fuel-corner-pair' : ''}`}
    />
  ));
}
