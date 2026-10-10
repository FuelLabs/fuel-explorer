import { IconChevronDown } from '@fuels/ui';
import { type MouseEvent, type ReactNode, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { TxExpand } from './TxExpand';

type TxItemProps = {
  /** The item type, shown as a mono label. */
  label: ReactNode;
  children: ReactNode;
  /** Amounts and other figures, aligned right on wide screens. */
  trailing?: ReactNode;
  /** Content folded under the row. Adds a toggle. */
  details?: ReactNode;
  className?: string;
};

export function TxItem({
  label,
  children,
  trailing,
  details,
  className,
}: TxItemProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const id = useId();
  const classes = styles({ open, expandable: Boolean(details) });
  const onRowClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea, [role="button"]'))
      return;
    if (window.getSelection()?.toString()) return;
    setOpen((value) => !value);
  };

  return (
    <div className={classes.root({ className })}>
      {/* The whole row toggles. Clicks on links and controls inside keep their own action, and the chevron button is the keyboard control. */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the chevron button is the keyboard equivalent */}
      <div className={classes.row()} onClick={details ? onRowClick : undefined}>
        <span className={classes.label()}>{label}</span>
        <div className={classes.main()}>{children}</div>
        {trailing && <div className={classes.trailing()}>{trailing}</div>}
        {details && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            aria-label={t(open ? 'tx.hide_details' : 'tx.show_details')}
            onClick={() => setOpen((value) => !value)}
            className={classes.toggle()}
          >
            <IconChevronDown
              size={16}
              stroke={1.75}
              className={classes.chevron()}
            />
          </button>
        )}
      </div>
      {details && (
        <TxExpand id={id} open={open}>
          <div className={classes.details()}>{details}</div>
        </TxExpand>
      )}
    </div>
  );
}

// The frame that holds a group of items. Items draw their own top hairline.
export function TxItemGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border border-[var(--fuel-line)] bg-[var(--fuel-background)] ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'border-t border-[var(--fuel-border)] first:border-t-0',
    row: [
      'fuel-hover-fill flex flex-col gap-2 px-4 py-3',
      'tablet:flex-row tablet:items-center tablet:gap-4',
    ],
    label: 'fuel-label shrink-0 tablet:w-[120px]',
    main: 'min-w-0 flex-1',
    trailing: 'shrink-0 text-[14px] text-heading tablet:text-right',
    toggle: [
      'relative grid size-8 shrink-0 cursor-pointer place-items-center self-end border-0 bg-transparent p-0',
      'text-[var(--fuel-element-low-em)] transition-colors hover:text-heading',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fuel-focus)] motion-reduce:transition-none',
      'tablet:self-center fuel-hit',
    ],
    chevron: [
      'transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]',
      'motion-reduce:transition-none',
    ],
    details:
      'flex flex-col gap-2 border-t border-[var(--fuel-border)] bg-[var(--fuel-card)] px-4 py-3 text-[14px]',
  },
  variants: {
    open: {
      true: { chevron: 'rotate-180' },
    },
    expandable: {
      true: { row: 'cursor-pointer' },
    },
  },
});
