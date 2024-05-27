import type { MouseEvent } from 'react';

export const stopPropagation = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation();
};
