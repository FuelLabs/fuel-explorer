import { Tooltip } from '@radix-ui/themes';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconHelpCircle } from '../Icons';

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
      iconAriaLabel,
      ...props
    },
  ) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const ariaLabel =
      iconAriaLabel ??
      t('ui.helper_icon.label', { defaultValue: 'More information' });
    return (
      <Comp {...props}>
        {children}
        <Tooltip content={message} open={open} onOpenChange={setOpen}>
          {/* A button, so keyboard and touch users can open the hint too. */}
          <button
            type="button"
            aria-label={ariaLabel}
            className="fuel-hit relative inline-flex cursor-help items-center justify-center bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--fuel-focus)]"
            onClick={(e) => {
              e.preventDefault();
              setOpen((prev) => !prev);
            }}
          >
            <Icon
              aria-hidden
              className={iconClassName}
              color={iconColor}
              icon={HelperIcon}
              size={iconSize}
              stroke={iconStroke}
            />
          </button>
        </Tooltip>
      </Comp>
    );
  },
});
