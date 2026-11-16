import { withNamespace } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type PartProps = { className?: string; children?: ReactNode };

// hideImage stays accepted so existing callers keep compiling; the empty row
// has no illustration.
export type EmptyCardProps = PartProps & { hideImage?: boolean };
export type EmptyCardTitleProps = PartProps;
export type EmptyCardDescriptionProps = PartProps;

export function EmptyCardRoot({ children, className }: EmptyCardProps) {
  return <div className={styles().root({ className })}>{children}</div>;
}

export function EmptyCardTitle({ children, className }: EmptyCardTitleProps) {
  return <h4 className={styles().title({ className })}>{children}</h4>;
}

export function EmptyCardDescription({
  children,
  className,
}: EmptyCardDescriptionProps) {
  return <p className={styles().description({ className })}>{children}</p>;
}

export const EmptyCard = withNamespace(EmptyCardRoot, {
  Title: EmptyCardTitle,
  Description: EmptyCardDescription,
});

const styles = tv({
  slots: {
    root: 'fuel-appear flex flex-col items-start gap-1 border-t border-[var(--fuel-border)] px-6 py-8 tablet:px-10',
    title: 'm-0 font-medium text-[16px] text-heading leading-[20px]',
    description:
      'm-0 text-[16px] text-[var(--fuel-element-low-em)] leading-[20px] tracking-[-0.32px]',
  },
});
