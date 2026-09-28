import { DitherImage } from '@fuels/ui';
import type { ReactNode } from 'react';
import { cx } from '~/systems/Core/utils/cx';

type ToolDitherCellProps = {
  src: string;
  brightness?: number;
  className?: string;
  children: ReactNode;
};

// The grid cell that holds the tool itself, over a dithered image.
export function ToolDitherCell({
  src,
  brightness = 0.09,
  className,
  children,
}: ToolDitherCellProps) {
  return (
    <div className={cx('fuel-edge fuel-tool-cell relative min-w-0', className)}>
      <div className="fuel-dither-art">
        <DitherImage src={src} cell={1} brightness={brightness} />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
