import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    dropdownItem: 'hover:bg-border focus:bg-border cursor-pointer',
    dropdownContent: [
      'ml-[-10px] tablet:ml-0',
      'mt-[-10px] rounded-t-none shadow-none border border-t-0 border-border',
      '[&[data-active=true]]:border-t-0',
    ],
  },
});
