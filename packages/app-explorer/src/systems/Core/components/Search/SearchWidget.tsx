'use client';

import { HStack } from '@fuels/ui';
import type { MutableRefObject } from 'react';
import { createContext, useRef } from 'react';
import { SearchForm } from './SearchForm';
import { styles } from './styles';

export const SearchContext = createContext<{
  dropdownRef: null | MutableRefObject<HTMLDivElement | null>;
}>({ dropdownRef: null });

type SearchWidgetProps = {
  autoFocus?: boolean;
  expandOnFocus?: boolean;
};

export const SearchWidget = ({
  autoFocus,
  expandOnFocus,
}: SearchWidgetProps) => {
  const classes = styles();
  const widgetRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <SearchContext.Provider value={{ dropdownRef }}>
      <HStack
        ref={widgetRef}
        className="items-center gap-0 laptop:gap-4 justify-center flex-1"
      >
        <SearchForm
          className={classes.searchSize()}
          autoFocus={autoFocus}
          expandOnFocus={expandOnFocus}
        />
      </HStack>
    </SearchContext.Provider>
  );
};
