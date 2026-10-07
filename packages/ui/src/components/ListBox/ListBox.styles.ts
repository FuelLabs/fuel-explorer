import { tv } from 'tailwind-variants';

export const item = tv({
  base: [
    'flex items-center w-full',
    'p-4 text-base bg-[var(--fuel-background)]',
    'transition-colors duration-200',
    'cursor-pointer',
  ],
  variants: {
    variant: {
      idle: [
        'text-[var(--fuel-element-high-em)]',
        'shadow-[inset_0_0_0_1px_var(--fuel-line)] hover:shadow-[inset_0_0_0_1px_var(--fuel-primary)]',
      ],
      focused: [
        'text-[var(--fuel-element-high-em)]',
        'shadow-[inset_0_0_0_1px_var(--fuel-element-mid-em)]',
      ],
      selected: [
        'text-[var(--fuel-element-high-em)]',
        'shadow-[inset_0_0_0_1px_var(--fuel-primary)]',
      ],
    },
  },
  defaultVariants: {
    variant: 'idle',
  },
});

export const icon = tv({
  base: [
    'flex items-center justify-center',
    'w-6 h-6 me-2',
    'transition-colors',
  ],
  variants: {
    variant: {
      idle: 'bg-[var(--fuel-muted)]',
      focused: 'bg-[var(--fuel-muted)]',
      selected: [
        'bg-[var(--fuel-primary)]',
        'text-[var(--fuel-primary-foreground)]',
      ],
    },
  },
  defaultVariants: {
    variant: 'idle',
  },
});
