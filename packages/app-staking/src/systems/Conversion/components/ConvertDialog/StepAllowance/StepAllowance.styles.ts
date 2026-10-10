import { tv } from 'tailwind-variants';

export const input = tv({
  variants: {
    error: {
      true: 'outline outline-1 outline-[var(--fuel-danger)]',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});
