import type { CSSProperties, ReactNode } from 'react';

type TxSectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  /** Position in the screen, used to stagger the reveal (40ms steps, capped at 6). */
  index?: number;
  /** Keeps the title out of view but leaves the content in place. */
  hideTitle?: boolean;
  className?: string;
};

export function TxSection({
  title,
  action,
  children,
  index = 0,
  hideTitle,
  className,
}: TxSectionProps) {
  return (
    <section
      className={`fuel-rise flex flex-col gap-3 ${className ?? ''}`}
      style={
        {
          '--fuel-enter-delay': `${Math.min(index, 6) * 40}ms`,
        } as CSSProperties
      }
    >
      {(!hideTitle || action) && (
        <div className="flex min-h-8 items-center justify-between gap-4">
          <h2 className="fuel-label m-0">{hideTitle ? '' : title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

// Reveals its content with a short rise, staggered by position (40ms steps, capped at 6).
export function TxRise({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <div
      className={`fuel-rise ${className ?? ''}`}
      style={
        {
          '--fuel-enter-delay': `${Math.min(index, 6) * 40}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
