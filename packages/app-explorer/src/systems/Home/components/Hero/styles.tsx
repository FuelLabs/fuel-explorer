import { tv } from 'tailwind-variants';

export const heroStyles = tv({
  slots: {
    root: 'relative w-full bg-[var(--fuel-background)]',
    container: 'relative pb-10',
    input: 'w-full tablet:w-[400px]',
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: ['grid-cols-12 laptop:h-[624px]'],
  },
});
