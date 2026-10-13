import { Square, type SquareKind } from '@fuels/ui';
import type { ReactNode } from 'react';

export type TxChipKind = 'plain' | 'success' | 'failed' | 'pending' | 'neutral';

const SQUARE_KIND: Record<TxChipKind, SquareKind> = {
  plain: 'brand',
  success: 'brand',
  failed: 'danger',
  pending: 'pending',
  neutral: 'idle',
};

// The status square for a transaction. A thin map onto the shared Square.
export function TxSquare({
  kind = 'success',
  className,
}: {
  kind?: TxChipKind;
  className?: string;
}) {
  return <Square kind={SQUARE_KIND[kind]} className={className} />;
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
