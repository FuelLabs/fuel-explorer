import { tv } from 'tailwind-variants';

export const heroStyles = tv({
  slots: {
    root: 'overflow-clip relative w-full bg-[var(--fuel-background)]',
    container:
      'fuel-page z-20 relative px-6 pt-6 pb-10 tablet:px-10 tablet:pt-10',
    input: 'w-full tablet:w-[400px]',
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: ['grid-cols-12 laptop:h-[624px]'],
  },
});
