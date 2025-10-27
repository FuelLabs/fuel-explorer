import type { ComponentPropsWithoutRef } from 'react';

export interface LogoEthProps extends ComponentPropsWithoutRef<'img'> {
  size?: 'small' | 'medium' | 'large';
}

export const LogoEth = ({
  size = 'medium',
  className = '',
  alt = 'ETH Logo',
  ...props
}: LogoEthProps) => {
  const sizeClasses = {
    small: 'w-[20px] h-[20px]',
    medium: 'w-[24px] h-[24px]',
    large: 'w-[32px] h-[32px]',
  };

  return (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img
      src="/assets/eth.svg"
      alt={alt}
      className={`${sizeClasses[size]} shrink-0 rounded-full ${className}`}
      {...props}
    />
  );
};
