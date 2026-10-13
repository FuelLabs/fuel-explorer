import { tv } from 'tailwind-variants';

export const styles = tv({
  base: [
    'px-2 py-1',
    'text-[var(--fuel-element-high-em)] text-sm font-semibold',
    'inline-flex items-center self-center shrink-0 grow-0 gap-2',
  ],
  variants: {
    variant: {
      solid: 'bg-transparent border border-[var(--fuel-border)]',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});
