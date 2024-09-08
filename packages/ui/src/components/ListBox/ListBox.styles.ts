import { tv } from 'tailwind-variants';

export const item = tv({
  base: [
    'flex items-center w-full',
    'p-4 text-base bg-panel-solid',
    'transition-shadow rounded-xl',
    'cursor-pointer',
  ],
  variants: {
    variant: {
      idle: [
        'text-gray-12',
        'shadow-[0_0_0_1px_var(--gray-5)] hover:shadow-[0_0_0_2px_var(--brand-9)]',
      ],
      focused: ['text-gray-12', 'shadow-[0_0_0_2px_var(--gray-9)]'],
      selected: [
        'text-gray-12',
        'shadow-[0_0_0_2px_var(--brand-9)] hover:shadow-[0_0_0_2px_var(--brand-10)]',
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
    'w-6 h-6 rounded-full me-2',
    'transition-colors',
  ],
  variants: {
    variant: {
      idle: 'bg-gray-2',
      focused: 'bg-gray-2',
      selected: [
        'bg-green-3 dark:bg-green-9',
        'text-[rgb(32,32,32)]/[.6] dark:text-[rgb(32,32,32)]/[.6]', // text-gray-12
      ],
    },
  },
  defaultVariants: {
    variant: 'idle',
  },
});
