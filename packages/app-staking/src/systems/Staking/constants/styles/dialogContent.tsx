import { tv } from 'tailwind-variants';

export const responsiveDialogStyles = tv({
  slots: {
    content: [
      // Below 640 px the sheet is fixed to the bottom, so it caps at the screen and
      // scrolls instead of being cropped. Fixed min-heights only apply from tablet.
      'relative overflow-y-auto overflow-x-clip p-8 max-h-[calc(100dvh-1rem)]',
      '!rounded-none !shadow-none border border-[var(--fuel-border)] bg-[var(--fuel-background)]',
      'max-w-[544px] grid mobile:max-tablet:max-w-full mobile:max-tablet:w-full mobile:max-tablet:fixed mobile:max-tablet:bottom-0 mobile:max-tablet:left-0',
      'transition-[height,min-height] duration-300 ease-in-out',
    ],
  },
  variants: {
    sizing: {
      fixed: {
        content:
          'tablet:min-h-[513px] md:min-h-[496px] md:flex-grow-0 md:flex-shrink-0',
      },
      variable: {
        content:
          'h-3/5 tablet:min-h-[513px] md:min-h-[400px] md:flex-grow-0 md:flex-shrink-1',
      },
      compact: {
        content:
          'h-2/5 tablet:min-h-[513px] md:min-h-[300px] md:flex-grow-0 md:flex-shrink-1',
      },
      auto: {
        content: 'min-h-[200px]',
      },
    },
  },
  defaultVariants: {
    sizing: 'fixed',
  },
});
