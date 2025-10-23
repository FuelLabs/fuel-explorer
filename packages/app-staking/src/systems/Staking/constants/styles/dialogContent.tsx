import { tv } from 'tailwind-variants';

export const responsiveDialogStyles = tv({
  slots: {
    content: [
      'relative rounded-[28px] overflow-clip p-8',
      'max-w-[544px] grid mobile:max-tablet:max-w-full mobile:max-tablet:w-full mobile:max-tablet:fixed mobile:max-tablet:bottom-0 mobile:max-tablet:left-0 mobile:max-tablet:rounded-b',
      'transition-[height,min-height] duration-300 ease-in-out',
    ],
  },
  variants: {
    sizing: {
      fixed: {
        content:
          'min-h-[513px] md:min-h-[496px] md:flex-grow-0 md:flex-shrink-0',
      },
      variable: {
        content:
          'h-3/5 min-h-[513px] md:min-h-[400px] md:flex-grow-0 md:flex-shrink-1',
      },
      compact: {
        content:
          'h-2/5 min-h-[513px] md:min-h-[300px] md:flex-grow-0 md:flex-shrink-1',
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
