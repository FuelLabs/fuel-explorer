import type { ReactNode } from 'react';

type TxFactProps = {
  label?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

// One labelled fact in the details column. Facts draw their own top hairline.
export function TxFact({
  label,
  description,
  children,
  className,
}: TxFactProps) {
  return (
    <div
      className={`flex flex-col gap-1 border-t border-[var(--fuel-border)] px-4 py-3 first:border-t-0 ${className ?? ''}`}
    >
      {label && <span className="fuel-label">{label}</span>}
      <div className="min-w-0 text-[16px] text-heading">{children}</div>
      {description && (
        <div className="text-[13px] text-[var(--fuel-element-low-em)]">
          {description}
        </div>
      )}
    </div>
  );
}
