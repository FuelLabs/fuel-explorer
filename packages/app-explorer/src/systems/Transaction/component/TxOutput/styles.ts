import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    header:
      'group gap-2 flex flex-col tablet:flex-row items-start tablet:items-center',
    amount: 'flex items-center gap-2 ml-14 tablet:ml-0',
    content: 'gap-4 justify-between items-center flex-1',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
