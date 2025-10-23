import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    paginationContainer: 'flex align-center pr-4 gap-2',
    paginationButton: 'cursor-pointer data-[disabled]:cursor-not-allowed',
  },
});
