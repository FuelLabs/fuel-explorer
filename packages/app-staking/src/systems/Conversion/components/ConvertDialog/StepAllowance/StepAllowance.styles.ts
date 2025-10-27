import { tv } from 'tailwind-variants';

export const input = tv({
  variants: {
    error: {
      true: 'outline-none shadow-[inset_0_0_0_var(--text-field-border-width)_var(--red-a11)]',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});
