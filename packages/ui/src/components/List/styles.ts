import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'm-0 p-0 fuel-[Text]:leading-relaxed',
    item: 'marker:text-icon',
  },
  variants: {
    type: {
      ol: {
        root: 'list-decimal pl-4',
      },
      ul: {
        root: 'list-disc pl-4',
      },
      none: {
        root: 'list-none',
      },
    },
    withIcon: {
      true: {
        root: 'list-none',
        item: 'flex items-center gap-2',
      },
    },
  },
  defaultVariants: {
    type: 'ul',
    withIcon: false,
  },
});
