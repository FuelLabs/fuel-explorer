import { Badge as RadixBadge } from '@radix-ui/themes';

import { useIconProps } from '../../hooks/useIconProps';
import type { WithIconProps } from '../../hooks/useIconProps';
import { useVariants } from '../../hooks/useVariants';
import type { WithVariants } from '../../hooks/useVariants';
import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type BadgeBaseProps = PropsOf<typeof RadixBadge>;
export type BadgeVariants = 'solid' | 'ghost' | 'surface' | 'outline';
export type BadgeProps = WithVariants<BadgeBaseProps, BadgeVariants> &
  WithIconProps;

export const Badge = createComponent<BadgeProps, 'span'>({
  id: 'Badge',
  render: (_, props) => {
    const { disabled, ...itemProps } = useIconProps(props);
    const variantProps = useVariants<BadgeProps, BadgeVariants>(props);
    return (
      <RadixBadge
        {...(itemProps as BadgeBaseProps)}
        {...(variantProps as BadgeBaseProps)}
        {...(disabled && {
          disabled,
          'aria-disabled': disabled,
        })}
      />
    );
  },
  defaultProps: {
    size: '2',
  },
});
