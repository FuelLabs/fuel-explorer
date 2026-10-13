const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

// The four corner squares of a framed box. The host must be positioned and
// draw its frame with its own 1px border; the squares centre on that line.
export function FrameCorners() {
  return CORNERS.map((corner) => (
    <span
      key={corner}
      aria-hidden
      className={`fuel-corner fuel-corner-${corner}`}
    />
  ));
}
