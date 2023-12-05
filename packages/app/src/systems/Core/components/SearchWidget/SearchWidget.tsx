import { HStack, IconButton, Tooltip } from '@fuels/ui';
import { IconSearch } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { MutableRefObject } from 'react';
import { useEffect, useRef, createContext } from 'react';
import { tv } from 'tailwind-variants';

import { SearchForm } from '../SearchForm/SearchForm';

export const SearchContext = createContext<{
  dropdownRef: null | MutableRefObject<HTMLDivElement | null>;
  onClear: (value: string) => void;
}>({ dropdownRef: null, onClear: () => {} });

type SearchWidgetProps = {
  setIsExitComplete: (value: boolean) => void;
  isExitComplete: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
};

export const SearchWidget = ({
  setIsExitComplete,
  isExitComplete,
  isSearchOpen,
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

  useEffect(() => {
    if (isSearchOpen) {
      setIsExitComplete(false);
    }
  }, [isSearchOpen]);

  return (
    <SearchContext.Provider value={{ dropdownRef, onClear }}>
      <HStack
        ref={widgetRef}
        className="items-center gap-0 laptop:gap-4 justify-center"
      >
        <AnimatePresence
          onExitComplete={() => {
            setIsExitComplete(true);
          }}
        >
          {isSearchOpen && (
            <>
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ duration: 0.2 }}
                variants={{
                  open: { scaleX: '100%' },
                  closed: { scaleX: '0%' },
                }}
              >
                <SearchForm className={classes.input()} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {isExitComplete && (
          <Tooltip content="Search by address, contract id, transaction id, or block id">
            <IconButton
              icon={IconSearch}
              variant="link"
              className="mr-1 text-color laptop:mr-0"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
              }}
            />
          </Tooltip>
        )}
      </HStack>
    </SearchContext.Provider>
  );
};

const styles = tv({
  slots: {
    input: 'w-full tablet:w-[400px]',
  },
});
