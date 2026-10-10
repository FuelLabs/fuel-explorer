import { cx } from '../../utils/css';
import type { BoxProps } from '../Box';
import { Box } from '../Box';

type LoadingBoxProps = BoxProps & { brighter?: boolean };

export function LoadingBox({ className, brighter, ...props }: LoadingBoxProps) {
  return (
    <Box
      {...props}
      data-brighter={brighter ? '' : undefined}
      className={cx('fuel-loading', className)}
    />
  );
}
