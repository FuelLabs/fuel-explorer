import { HStack } from '@fuels/ui';
import type { MutableRefObject } from 'react';
import { useEffect, useRef, createContext } from 'react';

import { SearchForm } from './SearchForm';
import { styles } from './styles';

export const SearchContext = createContext<{
  dropdownRef: null | MutableRefObject<HTMLDivElement | null>;
  onClear: (value: string) => void;
}>({ dropdownRef: null, onClear: () => {} });

type SearchWidgetProps = {
  autoFocus?: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
};

export const SearchWidget = ({
  autoFocus,
  setIsSearchOpen,
}: SearchWidgetProps) => {
  const classes = styles();
  const widgetRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function onClear(value: string) {
    if (!value.length) {
      setIsSearchOpen(false);
    }
  }

  function isClickInBounds(
    clickX: number,
    clickY: number,
    left: number,
    right: number,
    top: number,
    bottom: number,
  ) {
    return (
      clickX >= left && clickX <= right && clickY >= top && clickY <= bottom
    );
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const widgetLeft = widgetRef.current?.offsetLeft ?? 0;
      const widgetRight = widgetLeft + (widgetRef.current?.offsetWidth ?? 0);
      const widgetTop = widgetRef.current?.offsetTop ?? 0;
      const widgetBottom = widgetTop + (widgetRef.current?.offsetHeight ?? 0);
      if (
        !isClickInBounds(
          event.x,
          event.y,
          widgetLeft,
          widgetRight,
          widgetTop,
          widgetBottom,
        ) &&
        !dropdownRef?.current?.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <SearchContext.Provider value={{ dropdownRef, onClear }}>
      <HStack
        ref={widgetRef}
        className="items-center gap-0 laptop:gap-4 justify-center flex-1"
      >
        <SearchForm className={classes.searchSize()} autoFocus={autoFocus} />
      </HStack>
    </SearchContext.Provider>
  );
};
