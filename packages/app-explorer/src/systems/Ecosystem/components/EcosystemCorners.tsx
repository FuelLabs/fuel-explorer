const CORNERS = ['tl', 'tr', 'bl', 'br'] as const;

// The parent must be positioned.
export function EcosystemCorners() {
  return CORNERS.map((corner) => (
    <span
      key={corner}
      aria-hidden
      className={`fuel-corner fuel-corner-${corner}`}
    />
  ));
}
