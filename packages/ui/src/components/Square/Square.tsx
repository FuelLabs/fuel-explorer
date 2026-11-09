import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/css';

/**
 * - brand: done, success, or a plain marker
 * - danger, warning: failed or needs care
 * - pending: waiting, filled grey
 * - idle: not reached yet, an empty outline
 * - strong: needs your action
 * - active: in progress, pulses
 */
export type SquareKind =
  | 'brand'
  | 'danger'
  | 'warning'
  | 'pending'
  | 'idle'
  | 'strong'
  | 'active';

export type SquareProps = {
  kind?: SquareKind;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

// The 8px status square. It is decorative: print the state as text next to it.
export function Square({
  kind = 'brand',
  className,
  style,
  children,
}: SquareProps) {
  return (
    <span
      aria-hidden
      data-kind={kind}
      className={cx('fuel-square', className)}
      style={style}
    >
      {children}
    </span>
  );
}
