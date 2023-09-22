import { Tooltip } from '@radix-ui/themes';
import { IconHelpCircle } from '@tabler/icons-react';

import { createComponent } from '../../utils/component';
import type { Colors, PropsOf } from '../../utils/types';
import { Icon } from '../Icon/Icon';
import type { IconContext } from '../Icon/useIconContext';

export type HelperIconBaseProps = {
  message: string;
  icon?: React.ComponentType<Partial<IconContext>>;
  iconSize?: number;
  iconStroke?: number;
  iconClassName?: string;
  iconColor?: Colors;
  iconAriaLabel?: string;
};
export type HelperIconProps = PropsOf<'span'> & HelperIconBaseProps;

export const HelperIcon = createComponent<HelperIconProps, 'span'>({
  id: 'HelperIcon',
  baseElement: 'span',
  className: 'inline-flex items-center gap-2',
  render: (
    Comp,
    {
      children,
      message,
      icon: HelperIcon = IconHelpCircle,
      iconSize,
      iconStroke,
      iconClassName,
      iconColor = 'text-icon',
      iconAriaLabel: ariaLabel = 'Helper Icon',
      ...props
    },
  ) => {
    return (
      <Comp {...props}>
        {children}
        <Tooltip content={message}>
          <Icon
            icon={HelperIcon}
            aria-label={ariaLabel}
            size={iconSize}
            stroke={iconStroke}
            color={iconColor}
            className={iconClassName}
          />
        </Tooltip>
      </Comp>
    );
  },
});
