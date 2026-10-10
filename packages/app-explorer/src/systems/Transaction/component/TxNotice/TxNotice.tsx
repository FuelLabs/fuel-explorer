import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

// Keeps the content in place while a refetch runs and dims it, so the page
// does not swap for a loader.
export function TxDim({
  busy,
  children,
}: {
  busy?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      aria-busy={busy || undefined}
      className={`transition-opacity duration-300 motion-reduce:transition-none ${busy ? 'opacity-60' : 'opacity-100'}`}
    >
      {children}
    </div>
  );
}

type TxNoticeProps = {
  children: ReactNode;
  className?: string;
};

export function TxNotice({ children, className }: TxNoticeProps) {
  const classes = styles();
  return (
    <div className={classes.notice({ className })}>
      <span aria-hidden className="fuel-square mt-[5px] shrink-0" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const styles = tv({
  slots: {
    notice: [
      'fuel-edge fuel-appear flex items-start gap-3 border border-[var(--fuel-line)] px-4 py-3',
      'text-[14px] leading-[20px] text-[var(--fuel-element-low-em)]',
    ],
  },
});
