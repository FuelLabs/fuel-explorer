import { IconButton as RadixIconButton } from '@radix-ui/themes';

import { getIconSize } from '../../hooks/useIconProps';
import { useVariants } from '../../hooks/useVariants';
import type { Variant, WithVariants } from '../../hooks/useVariants';
import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { Colors, PropsOf } from '../../utils/types';
import { Icon } from '../Icon/Icon';
import type { IconContext } from '../Icon/useIconContext';
import { Spinner } from '../Spinner/Spinner';

type RadixIconButtonProps = Omit<PropsOf<typeof RadixIconButton>, 'children'>;
type IconButtonBaseProps = RadixIconButtonProps & {
  disabled?: boolean;
  isLoading?: boolean;
  icon: React.ComponentType<Partial<IconContext>>;
  iconSize?: number;
  iconStroke?: number;
  iconClassName?: string;
  iconColor?: Colors;
  'aria-label'?: string;
};

export type IconButtonProps = WithVariants<IconButtonBaseProps, Variant>;

export const IconButton = createComponent<IconButtonProps, 'button'>({
  id: 'IconButton',
  render: (
    _,
    {
      size,
      disabled,
      isLoading,
      icon,
      iconSize,
      iconStroke,
      iconClassName,
      iconColor,
      ...props
    },
  ) => {
    const variantProps = useVariants(props);
    const isDisabled = Boolean(disabled || isLoading);
    return (
      <RadixIconButton
        {...(props as RadixIconButtonProps)}
        {...(variantProps as RadixIconButtonProps)}
        disabled={isDisabled}
        size={size}
        className={cx(
          props.className,
          variantProps.className,
          !isDisabled && !props['aria-readonly'] ? 'cursor-pointer' : '',
        )}
      >
        {isLoading ? (
          <Spinner color="current" size={getIconSize(size, iconSize)} />
        ) : (
          <Icon
            className={iconClassName}
            color={iconColor}
            icon={icon}
            size={iconSize}
            stroke={iconStroke}
          />
        )}
      </RadixIconButton>
    );
  },
});
