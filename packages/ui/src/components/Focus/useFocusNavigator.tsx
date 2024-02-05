'use client';

import type { ReactNode } from 'react';
import { useFocusManager } from 'react-aria';

export function useFocusNavigator() {
  const focusManager = useFocusManager();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      focusManager?.focusNext();
    }
    if (e.key === 'ArrowLeft') {
      focusManager?.focusPrevious();
    }
    if (e.key === 'ArrowUp') {
      focusManager?.focusNext();
    }
    if (e.key === 'ArrowDown') {
      focusManager?.focusPrevious();
    }
  };

  return {
    onKeyDown,
  };
}

export function isRightChildrenType(children: ReactNode) {
  return (
    typeof children !== 'boolean' &&
    typeof children !== 'string' &&
    typeof children !== 'undefined' &&
    typeof children !== 'number'
  );
}
