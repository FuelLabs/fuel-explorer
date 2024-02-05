'use client';

import type { ButtonProps } from '@radix-ui/themes/dist/cjs/components/button';

import { Icon } from '../components/Icon/Icon';
import type { IconComponent } from '../components/Icon/useIconContext';
import { Spinner } from '../components/Spinner/Spinner';
import type { Colors } from '../utils/types';

export type IconSizes = ButtonProps['size'];

export function getIconSize(size: IconSizes, iconSize?: number) {
  if (iconSize) return iconSize;
  if (Number(size) >= 4) return 24;
  if (size === '3') return 18;
  if (size === '2') return 16;
  return 14;
}

export type WithIconProps = {
  size?: IconSizes;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children?: React.ReactNode;
  iconSize?: number;
  iconColor?: Colors;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  leftIconAriaLabel?: string;
  leftIconClassName?: string;
  rightIconAriaLabel?: string;
  rightIconClassName?: string;
};

export type IconOmitProps = Omit<WithIconProps, 'children'>;

export function useIconProps<P extends WithIconProps>({
  size = '2',
  iconColor = 'text-current',
  leftIcon,
  rightIcon,
  leftIconAriaLabel,
  leftIconClassName,
  rightIconAriaLabel,
  rightIconClassName,
  iconSize: initialIconSize,
  children: initialChildren,
  isLoading,
  loadingText = 'Loading...',
  ...rest
}: P) {
  const iconSize = getIconSize(size, initialIconSize);
  let children = (
    <>
      {leftIcon && (
        <Icon
          aria-label={leftIconAriaLabel}
          className={leftIconClassName}
          color={iconColor}
          icon={leftIcon}
          size={iconSize}
        />
      )}
      {initialChildren}
      {rightIcon && (
        <Icon
          aria-label={rightIconAriaLabel}
          className={rightIconClassName}
          color={iconColor}
          icon={rightIcon}
          size={iconSize}
        />
      )}
    </>
  );

  if (isLoading) {
    children = (
      <>
        <Spinner color="current" size={iconSize} />
        {loadingText}
      </>
    );
  }

  const hasIcon = Boolean(leftIcon || rightIcon);
  return {
    ...rest,
    size,
    children,
    disabled: Boolean(isLoading || rest.disabled),
    ...(hasIcon && { 'data-icon': true }),
  };
}
