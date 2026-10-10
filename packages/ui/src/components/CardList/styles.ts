import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: ['relative flex flex-row', 'items-center px-5 focus:outline-none'],
    activeMark: ['block absolute inset-0 bg-[var(--fuel-primary)] w-1 h-full'],
  },
  variants: {
    clickable: {
      true: {
        root: [
          'fuel-hover-fill cursor-pointer border border-transparent',
          'focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1',
          'focus-visible:outline-[var(--fuel-focus)]',
        ],
      },
    },
  },
  defaultVariants: {
    clickable: false,
  },
});
