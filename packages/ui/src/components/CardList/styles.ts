import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: [
      'relative transition-colors duration-150 flex flex-row',
      'items-center px-5 focus:outline-none',
    ],
    activeMark: ['block absolute inset-0 bg-brand w-1 h-full'],
  },
  variants: {
    clickable: {
      true: {
        root: 'cursor-pointer focus:ring-2 focus:ring-gray-3 border border-transparent hover:border-border transition-none',
      },
    },
  },
  defaultVariants: {
    clickable: false,
  },
});
