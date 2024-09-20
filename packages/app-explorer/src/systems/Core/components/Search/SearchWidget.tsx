'use client';

import { Flex } from '@fuels/ui';
import type { MutableRefObject } from 'react';
import { createContext, useRef } from 'react';
import { SearchForm } from './SearchForm';
import { styles } from './styles';

export const SearchContext = createContext<{
  dropdownRef: null | MutableRefObject<HTMLDivElement | null>;
}>({ dropdownRef: null });

type SearchWidgetProps = {
  autoFocus?: boolean;
  variablePosition?: boolean;
};

export const SearchWidget = ({
  autoFocus,
  variablePosition,
}: SearchWidgetProps) => {
  const classes = styles();
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <SearchContext.Provider value={{ dropdownRef }}>
      <Flex className="items-center gap-0 laptop:gap-4 justify-center flex-1 self-start">
        <SearchForm
          className={classes.searchSize()}
          autoFocus={autoFocus}
          variablePosition={variablePosition}
        />
      </Flex>
    </SearchContext.Provider>
  );
};
