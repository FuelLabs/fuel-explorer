import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: ['flex items-center'],
    button: [
      'not-first:ml-px',
      'first-type:rounded-tr-none first-type:rounded-br-none',
      'last-type:rounded-tl-none last-type:rounded-bl-none',
      'not-first-last:rounded-none',
      'focus-visible:z-10 focus-visible:relative',
    ],
  },
});
