import { Tooltip } from '@radix-ui/themes';
import { IconHelpCircle } from '@tabler/icons-react';

import { tv } from 'tailwind-variants';
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

const styles = tv({
  slots: {
    root: 'inline-flex items-center gap-2',
  },
});

export const HelperIcon = createComponent<HelperIconProps, 'span'>({
  id: 'HelperIcon',
  baseElement: 'span',
  className: ({ className }) => styles().root({ className }),
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
            aria-label={ariaLabel}
            className={iconClassName}
            color={iconColor}
            icon={HelperIcon}
            size={iconSize}
            stroke={iconStroke}
          />
        </Tooltip>
      </Comp>
    );
  },
});
