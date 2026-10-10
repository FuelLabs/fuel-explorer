import { IconX } from '@fuels/ui';

export type StatusMarkerKind =
  | 'done'
  | 'active'
  | 'action'
  | 'error'
  | 'pending';

const SQUARE: Record<Exclude<StatusMarkerKind, 'error'>, string> = {
  done: 'border-[var(--fuel-primary)] bg-[var(--fuel-primary)]',
  active:
    'border-[var(--fuel-element-high-em)] bg-[var(--fuel-element-high-em)] animate-pulse motion-reduce:animate-none',
  action:
    'border-[var(--fuel-element-high-em)] bg-[var(--fuel-element-high-em)]',
  pending: 'border-[var(--fuel-indicator-border)] bg-transparent',
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
  return (
    <span
      aria-hidden
      className={`size-2 shrink-0 border ${SQUARE[kind]} ${className}`}
    />
  );
}
