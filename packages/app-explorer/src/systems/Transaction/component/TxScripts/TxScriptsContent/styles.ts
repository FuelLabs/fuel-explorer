import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    lines: [
      'relative flex-1 border-t border-b border-border',
      'before:h-[1px] before:absolute before:top-1/2 before:left-0',
      'before:w-full before:bg-border before:content-[""]',
    ],
    operation: [
      'relative flex flex-col gap-3',
      '[&[data-nested=true]]:before:absolute',
      '[&[data-nested=true]]:before:content-[""]',
      '[&[data-nested=true]]:before:block',
      '[&[data-nested=true]]:before:border-l',
      '[&[data-nested=true]]:before:border-border',
      '[&[data-nested=true]]:before:border-dashed',
      '[&[data-nested=true]]:before:top-[40px]',
      '[&[data-nested=true]]:before:bottom-[20px]',
      '[&[data-nested=true]]:before:left-0',
      '[&[data-nested=true]]:before:right-0',
    ],
  },
});
