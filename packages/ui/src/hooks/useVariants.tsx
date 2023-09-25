'use client';

import type { ButtonProps } from '@radix-ui/themes/dist/cjs/components/button';

import { cx } from '../utils/css';

export type Variant = 'solid' | 'ghost' | 'outline' | 'link';
export type VariantProps = {
  className?: string;
  variant?: Variant;
};

export type WithVariants<P> = Omit<P, 'variant'> & {
  variant?: Variant;
};

function getVariant({ variant, className }: VariantProps) {
  if (variant === 'ghost') {
    return {
      variant: 'soft',
      className,
    };
  }
  if (variant === 'link') {
    return {
      variant: 'ghost',
      className: cx(
        'hover:bg-transparent hover:underline px-0.5 py-0.5',
        className,
      ),
    };
  }
  return {
    variant,
    className,
  };
}

export function useVariants<P extends VariantProps>(props: P) {
  const { variant, className } = getVariant(props);
  return { variant: variant as ButtonProps['variant'], className };
}
