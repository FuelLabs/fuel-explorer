import { tv } from 'tailwind-variants';

export const heroStyles = tv({
  slots: {
    root: 'overflow-clip relative w-full fuel-grid-divider bg-[var(--fuel-background)]',
    container:
      'fuel-page z-20 relative px-6 pt-6 pb-10 tablet:px-10 tablet:pt-10',
    input: 'w-full tablet:w-[400px]',
    title: [
      'uppercase text-[28px] leading-[32px] tracking-[-1.12px] text-heading',
      'tablet:text-[32px] tablet:leading-[34px] tablet:tracking-[-1.28px]',
      'desktop:text-[40px] desktop:leading-[44px] desktop:tracking-[-1.6px]',
    ],
    subtitle: ['text-base mb-8 justify-center'],
    searchWrapper: ['grid-cols-12 mt-6 laptop:h-[624px]'],
  },
});
