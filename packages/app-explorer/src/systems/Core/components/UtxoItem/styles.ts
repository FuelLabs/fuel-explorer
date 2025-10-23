import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    item: [
      'flex flex-col p-2 px-4 gap-2',
      'tablet:flex-row',
      'last:rounded-b-sm',
      'fuel-[Address]:text-[0.8rem] fuel-[Address]:leading-none',
    ],
  },
  variants: {
    color: {
      odd: {
        item: 'bg-gray-4',
      },
    },
  },
});
