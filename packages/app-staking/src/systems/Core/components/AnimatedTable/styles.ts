import type { AnimationProps } from 'framer-motion';
import { tv } from 'tailwind-variants';

export const ASSET_SIZE = 28;
export const COLUMN_WIDTH = 200;
export const CELL_PADDING = 'px-4 py-3';
export const LIST_SEPARATOR_BORDER = 'border-[--gray-1]';

export const CELL_INITIAL = { opacity: 0, width: 0 };
export const CELL_ANIMATE: AnimationProps['animate'] = {
  opacity: 1,
  width: COLUMN_WIDTH,
};
export const CELL_ANIMATE_AUTO: AnimationProps['animate'] = {
  opacity: 1,
  width: 'auto',
};
export const CELL_ANIMATE_ACTIONS: AnimationProps['animate'] = {
  opacity: 1,
  width: 240,
};
export const CELL_ANIMATE_ACTIONS_SMALL: AnimationProps['animate'] = {
  opacity: 1,
  width: 120,
};
export const CELL_EXIT = { opacity: 0, width: 0 };
export const CELL_TRANSITION = { duration: 0.2 };

export const styles = tv({
  slots: {
    body: 'blur(5px)',
    paginationContainer:
      'flex flex-row align-center justify-end mb-4 pr-2 gap-2',
    paginationButton: 'cursor-pointer data-[disabled]:cursor-not-allowed',
  },
});
