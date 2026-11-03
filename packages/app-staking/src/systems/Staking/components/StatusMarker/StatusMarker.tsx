import { IconX, Square, type SquareKind } from '@fuels/ui';

export type StatusMarkerKind =
  | 'done'
  | 'active'
  | 'action'
  | 'error'
  | 'pending';

const SQUARE_KIND: Record<Exclude<StatusMarkerKind, 'error'>, SquareKind> = {
  done: 'brand',
  active: 'active',
  action: 'strong',
  pending: 'pending',
};

// The one status mark for steps, dialogs and history rows. A failure is a
// cross, not a red square, so it reads without color. The mark is decorative:
// the caller prints the state as text next to it.
export function StatusMarker({
  kind,
  className = '',
}: { kind: StatusMarkerKind; className?: string }) {
  if (kind === 'error') {
    return (
      <span
        aria-hidden
        className={`flex size-2 shrink-0 items-center justify-center text-[var(--fuel-danger-text)] ${className}`}
      >
        <IconX size={10} stroke={2} className="shrink-0" />
      </span>
    );
  }
  return <Square kind={SQUARE_KIND[kind]} className={className} />;
}
