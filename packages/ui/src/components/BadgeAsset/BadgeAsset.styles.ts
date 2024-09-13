import { tv } from 'tailwind-variants';

export const styles = tv({
  base: [
    'px-2 py-1',
    'text-[var(--gray-12)] text-sm font-semibold',
    'inline-flex items-center self-center shrink-0 grow-0 gap-2',
  ],
  variants: {
    variant: {
      solid: 'bg-[var(--gray-3)] rounded-full',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});
