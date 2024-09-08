import { tv } from 'tailwind-variants';

export const root = tv({
  base: ['flex items-center w-full', 'font-medium text-sm text-center'],
});

export const item = tv({
  base: 'flex items-center',
  variants: {
    variant: {
      idle: 'text-[rgb(32,32,32)]/[.6] dark:text-[rgba(238,238,238)]/[.6]', // text-gray-12
      active: 'text-gray-12',
      completed: 'text-[rgb(32,32,32)]/[.6] dark:text-[rgba(238,238,238)]/[.6]', // text-gray-12
    },
    separator: {
      true: [
        'w-full',
        'after:mobile:max-tablet:hidden',
        'after:inline-block',
        "after:w-full after:h-0.5 after:content-['']",
        'after:bg-gradient-to-r after:from-transparent after:to-[var(--gray-a6)]',
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
    'flex items-center justify-center',
    'w-8 h-8 rounded-full me-2',
    'border transition',
  ],
  variants: {
    variant: {
      idle: [
        'bg-[rgb(32,32,32)]/[.06] border-[rgb(32,32,32)]/[.08]',
        'dark:bg-[rgb(238,238,238)]/[.06] dark:border-[rgb(238,238,238)]/[.08]',
      ],
      active: [
        'bg-transparent',
        'border-[rgb(32,32,32)]/[.24] shadow-[0_1px_5px_0_rgba(0,0,0,0.07)]',
        'dark:border-[rgb(238,238,238)]/[.24] dark:shadow-none',
      ],
      completed: [
        'bg-[rgb(32,32,32)]/[.06] border-[rgb(32,32,32)]/[.08]',
        'dark:bg-[rgb(238,238,238)]/[.06] dark:border-[rgb(238,238,238)]/[.08]',
      ],
    },
  },
  defaultVariants: {
    variant: 'idle',
  },
});
