import { cva } from 'class-variance-authority';

export const styles = {
  list: cva([], {
    variants: {
      type: {
        none: 'fuel-List__type-none',
        ol: 'fuel-List__type-ol',
        ul: 'fuel-List__type-ul',
      },
      withIcon: {
        true: 'fuel-List__withIcon-true',
      },
    },
    defaultVariants: {
      type: 'none',
      withIcon: false,
    },
  }),
  listItem: cva([], {
    variants: {
      withIcon: {
        true: 'fuel-ListItem__withIcon-true',
      },
    },
    defaultVariants: {
      withIcon: false,
    },
  }),
};
