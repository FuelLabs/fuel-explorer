import { tv } from 'tailwind-variants';

export const styles = tv({
  base: [
    'm-0 font-medium tracking-tight text-heading',
    'data-[size="1"]:text-h1',
    'data-[size="2"]:text-h2',
    'data-[size="3"]:text-h3',
    'data-[size="4"]:text-h4',
    'data-[size="5"]:text-h5',
    'data-[size="6"]:text-h6',
  ],
  variants: {
    withIcon: {
      true: 'flex items-center gap-2',
    },
  },
  defaultVariants: {
    withIcon: false,
  },
});
