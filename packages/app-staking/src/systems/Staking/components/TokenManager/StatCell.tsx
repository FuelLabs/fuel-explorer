import type { ReactNode } from 'react';

// A label and a value in one cell. Cells in a row share 1px lines.
export function StatCell({
  label,
  children,
}: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 bg-[var(--fuel-background)] px-6 py-4 tablet:px-10">
      <span className="fuel-label">{label}</span>
      <div className="min-w-0 truncate text-[16px] font-medium leading-[20px] tracking-[-0.32px] tabular-nums text-heading">
        {children}
      </div>
    </div>
  );
}

export function StatRow({
  children,
  className = '',
}: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-px border border-[var(--fuel-line)] bg-[var(--fuel-line)] min-[560px]:grid-cols-2 ${className}`}
    >
      {children}
    </div>
  );
}
