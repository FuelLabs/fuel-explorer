import type { ReactNode } from 'react';

type PageStateProps = {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  tone?: 'neutral' | 'error';
  className?: string;
};

// One panel for not-found and error pages. It reads left to right: the
// message first, the way out on the right.
export function PageState({
  title,
  description,
  action,
  tone = 'neutral',
  className = '',
}: PageStateProps) {
  return (
    <section
      role={tone === 'error' ? 'alert' : 'status'}
      className={`fuel-edge fuel-appear flex flex-col items-start gap-4 border border-[var(--fuel-line)] px-6 py-8 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-10 ${className}`}
    >
      <div className="min-w-0">
        <h2 className="m-0 font-medium text-[20px] text-heading leading-[24px] tracking-[-0.4px]">
          {title}
        </h2>
        {description && (
          <p className="m-0 mt-2 text-[16px] text-[var(--fuel-element-low-em)] leading-[20px] tracking-[-0.32px]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </section>
  );
}
