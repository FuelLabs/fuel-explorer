import type { CSSProperties, ReactNode } from 'react';

export type TxChipKind = 'plain' | 'success' | 'failed' | 'pending' | 'neutral';

const SQUARE: Partial<Record<TxChipKind, CSSProperties>> = {
  failed: {
    background: 'var(--fuel-danger)',
    borderColor: 'var(--fuel-danger)',
  },
  pending: {
    background: 'var(--fuel-element-low-em)',
    borderColor: 'var(--fuel-element-low-em)',
  },
  neutral: {
    background: 'transparent',
    borderColor: 'var(--fuel-element-low-em)',
  },
};

// The 8px brand square, coloured by status.
export function TxSquare({
  kind = 'success',
  className,
}: {
  kind?: TxChipKind;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`fuel-square ${className ?? ''}`}
      style={SQUARE[kind]}
    />
  );
}

type TxChipProps = {
  children: ReactNode;
  /** The marker colour: brand for success, red for failed, grey for pending. */
  kind?: TxChipKind;
  className?: string;
};

export function TxChip({ children, kind = 'plain', className }: TxChipProps) {
  return (
    <span
      className={`fuel-label inline-flex h-6 items-center gap-2 whitespace-nowrap border border-[var(--fuel-border)] px-2 ${className ?? ''}`}
    >
      {kind !== 'plain' && <TxSquare kind={kind} />}
      {children}
    </span>
  );
}
