import { HStack, SectionTitle } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type ToolPageHeaderProps = {
  /** Omitted when the top nav already names the page. */
  eyebrow?: string;
  /** Sits next to the eyebrow, e.g. a live APR badge. */
  badge?: ReactNode;
  /** Keeps the eyebrow row when the badge comes and goes, so the title does not move. */
  reserveBadge?: boolean;
  title: string;
  lead: string;
  actions?: ReactNode;
};

export function ToolPageHeader({
  eyebrow,
  badge,
  reserveBadge,
  title,
  lead,
  actions,
}: ToolPageHeaderProps) {
  const classes = styles();
  const hasRow = Boolean(eyebrow || badge || reserveBadge);

  return (
    <header className={classes.root()}>
      <div>
        {/* min-h holds the row for a badge that loads later. */}
        {hasRow && (
          <HStack align="center" gap="4" className="min-h-6">
            {eyebrow && <SectionTitle as="p">{eyebrow}</SectionTitle>}
            {badge}
          </HStack>
        )}
        <h1 className={`${classes.title()} ${hasRow ? 'mt-3' : ''}`}>
          {title}
        </h1>
        <p className={classes.lead()}>{lead}</p>
      </div>
      {actions && <div className={classes.actions()}>{actions}</div>}
    </header>
  );
}

const styles = tv({
  slots: {
    root: [
      'grid items-end gap-6',
      'px-6 py-8 tablet:px-10',
      'min-[720px]:grid-cols-[1fr_auto] min-[720px]:gap-10',
    ],
    title: [
      'mb-4 max-w-[640px] font-medium text-heading',
      'text-[40px] leading-[44px] tracking-[-1.6px]',
      'min-[720px]:text-[48px] min-[720px]:leading-[56px] min-[720px]:tracking-[-1.92px]',
    ],
    lead: 'm-0 max-w-[520px] text-[18px] leading-[22px] tracking-[-0.18px] text-[var(--fuel-element-low-em)]',
    actions: 'flex gap-2',
  },
});
