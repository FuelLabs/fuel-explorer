'use client';

import { createContext, useContext } from 'react';

export type CardListContext = {
  isClickable?: boolean;
  autoFocus?: boolean;
  isFocused?: boolean;
};

export const CardListContext = createContext<CardListContext>(
  {} as CardListContext,
);

export function useCardListContext() {
  return useContext(CardListContext);
}

export const CardListProvider = CardListContext.Provider;
