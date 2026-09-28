import { HStack, SectionTitle } from '@fuels/ui';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type ToolPageHeaderProps = {
  eyebrow: string;
  /** Sits next to the eyebrow, e.g. a live APR badge. */
  badge?: ReactNode;
  title: string;
  lead: string;
  actions?: ReactNode;
};

export function ToolPageHeader({
  eyebrow,
  badge,
  title,
  lead,
  actions,
}: ToolPageHeaderProps) {
  const classes = styles();

  return (
    <header className={classes.root()}>
      <div>
        {/* min-h holds the row for a badge that loads later. */}
        <HStack align="center" gap="4" className="min-h-6">
          <SectionTitle as="p">{eyebrow}</SectionTitle>
          {badge}
        </HStack>
        <h1 className={classes.title()}>{title}</h1>
        <p className={classes.lead()}>{lead}</p>
      </div>
      {actions && <div className={classes.actions()}>{actions}</div>}
    </header>
  );
}

const styles = tv({
  slots: {
    root: [
      'fuel-edge col-span-full order-[-2] grid items-end gap-6',
      'px-6 pt-10 pb-6 tablet:px-10 tablet:pb-10 desktop:pt-[60px]',
      'min-[720px]:grid-cols-[1fr_auto] min-[720px]:gap-10',
    ],
    title: [
      'mt-3 mb-4 max-w-[640px] font-medium text-heading',
      'text-[40px] leading-[44px] tracking-[-1.6px]',
      'min-[720px]:text-[48px] min-[720px]:leading-[56px] min-[720px]:tracking-[-1.92px]',
    ],
    lead: 'm-0 max-w-[520px] text-[18px] leading-[22px] tracking-[-0.18px] text-[var(--fuel-element-low-em)]',
    actions: 'flex gap-2',
  },
});
