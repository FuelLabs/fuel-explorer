import { tv } from 'tailwind-variants';

export const input = tv({
  variants: {
    error: {
      true: 'outline outline-1 outline-[var(--red-10)]',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});
