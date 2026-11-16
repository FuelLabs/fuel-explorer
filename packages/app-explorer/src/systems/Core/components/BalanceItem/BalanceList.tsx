import type { ReactNode } from 'react';

// The flat frame that holds balance rows. Rows draw their own top hairline.
export function BalanceList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fuel-rise border border-[var(--fuel-line)] bg-[var(--fuel-background)] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
