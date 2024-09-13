import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    operationChild: [
      'relative flex flex-col gap-3 ml-5',
      'tablet:ml-10',
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
