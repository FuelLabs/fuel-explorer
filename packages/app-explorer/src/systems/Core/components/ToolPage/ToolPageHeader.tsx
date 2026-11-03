import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type ToolPageHeaderProps = {
  /** Sits next to the title, e.g. a live APR badge. */
  badge?: ReactNode;
  title: string;
  actions?: ReactNode;
};

export function ToolPageHeader({ badge, title, actions }: ToolPageHeaderProps) {
  const classes = styles();

  return (
    <header className={classes.root()}>
      {/* Inline, so the badge follows the last word of a wrapped title. */}
      <div className={classes.heading()}>
        <h1 className={classes.title()}>{title}</h1>
        {badge && <span className={classes.badge()}>{badge}</span>}
      </div>
      {actions && <div className={classes.actions()}>{actions}</div>}
    </header>
  );
}

const styles = tv({
  slots: {
    root: [
      'flex flex-wrap items-center justify-between gap-x-10 gap-y-4',
      'px-6 py-6 tablet:px-10',
    ],
    heading: 'min-w-0',
    title:
      'm-0 inline align-middle font-medium text-heading text-[32px] leading-[36px] tracking-[-1.28px]',
    badge: 'ml-4 inline-block align-middle',
    actions: 'flex flex-wrap gap-2',
  },
});
