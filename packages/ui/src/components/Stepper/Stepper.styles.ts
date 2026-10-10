import { tv } from 'tailwind-variants';

export const root = tv({
  base: ['flex items-center w-full', 'text-center'],
});

export const item = tv({
  base: 'flex items-center',
  variants: {
    variant: {
      idle: '',
      active: '[&_.fuel-label]:text-[var(--fuel-element-high-em)]',
      completed: '',
    },
    separator: {
      true: [
        'w-full',
        'after:mobile:max-tablet:hidden',
        'after:inline-block',
        "after:w-full after:h-px after:content-['']",
        'after:bg-[var(--fuel-line)]',
        'after:mx-6',
      ],
      false: '',
    },
  },
  defaultVariants: {
    variant: 'idle',
    separator: false,
  },
});

export const icon = tv({
  base: [
    'fuel-label flex items-center justify-center',
    'w-8 h-8 me-2 border',
    'transition-colors duration-300 motion-reduce:transition-none',
  ],
  variants: {
    variant: {
      idle: 'bg-transparent border-[var(--fuel-line)]',
      active: 'bg-transparent border-[var(--fuel-element-high-em)]',
      completed:
        'bg-[var(--fuel-primary)] border-[var(--fuel-primary)] text-[var(--fuel-primary-foreground)]',
    },
  },
  defaultVariants: {
    variant: 'idle',
  },
});
