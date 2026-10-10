import type { BaseProps } from '@fuels/ui';
import type { CSSProperties, ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type CardInfoProps = BaseProps<{
  name?: string;
  description?: ReactNode | null;
  children?: ReactNode;
  style?: CSSProperties;
}>;

// A flat cell. Put several inside a GridFrame so the hairlines between them
// come from the frame.
export function CardInfo({
  className,
  name,
  description,
  children,
  style,
}: CardInfoProps) {
  const classes = styles();
  return (
    <div className={classes.root({ className })} style={style}>
      {name && <h3 className={classes.name()}>{name}</h3>}
      <div className={classes.value()}>{children}</div>
      {description && (
        <div className={classes.description()}>{description}</div>
      )}
    </div>
  );
}

const styles = tv({
  slots: {
    root: 'fuel-edge flex h-full flex-col gap-2 bg-[var(--fuel-background)] px-4 py-4',
    name: 'fuel-label m-0',
    value: 'fuel-stat-sm min-w-0',
    description: 'text-[12px] leading-[18px] text-[var(--fuel-element-low-em)]',
  },
});
