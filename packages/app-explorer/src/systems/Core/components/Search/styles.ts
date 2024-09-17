import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchSize: 'w-full sm:w-[400px] group-[&[data-active=true]]:w-full',
  },
});
