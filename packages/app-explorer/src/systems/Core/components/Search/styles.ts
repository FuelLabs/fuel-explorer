import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchSize:
      'w-full sm:w-[420px] md:max-lg:w-[30vw] group-[&[data-active=true]]:w-full',
  },
});
