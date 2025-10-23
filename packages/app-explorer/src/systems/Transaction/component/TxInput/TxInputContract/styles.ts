import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    item: [
      'flex flex-col p-2 px-4 gap-2',
      'tablet:flex-row',
      'last:rounded-b-sm',
      'fuel-[Address]:text-[0.8rem] fuel-[Address]:leading-none',
    ],
    contractAddress:
      'flex-col items-start gap-1 flex-1 tablet:flex-row tablet:items-center tablet:gap-4',
  },
});
