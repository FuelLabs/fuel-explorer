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
      <div className={classes.heading()}>
        <h1 className={classes.title()}>{title}</h1>
        {badge}
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
    heading: 'flex flex-wrap items-center gap-x-4 gap-y-2',
    title:
      'm-0 font-medium text-heading text-[32px] leading-[36px] tracking-[-1.28px]',
    actions: 'flex w-full flex-wrap gap-2 tablet:w-auto',
  },
});
