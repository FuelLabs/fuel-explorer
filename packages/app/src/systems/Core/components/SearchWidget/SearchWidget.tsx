import { HStack, IconButton, Tooltip } from '@fuels/ui';
import { IconSearch } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { useEffect, useRef, createContext } from 'react';
import { tv } from 'tailwind-variants';

import { SearchForm } from '../SearchForm/SearchForm';

type SearchWidgetProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export const SearchContext =
  createContext<null | MutableRefObject<HTMLDivElement | null>>(null);

export const SearchWidget = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchWidgetProps) => {
  const classes = styles();
  const widgetRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current?.contains(event?.target as Node) &&
        dropdownRef &&
        !dropdownRef.current?.contains(event?.target as Node)
      ) {
        console.log('does not contains');
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <SearchContext.Provider value={dropdownRef}>
      <HStack
        className="items-center gap-0 laptop:gap-4 justify-center"
        ref={widgetRef}
      >
        <AnimatePresence>
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
        <Tooltip content="Search by address, contract id, transaction id, or block id">
          <IconButton
            icon={IconSearch}
            variant="link"
            className="mr-1 text-color laptop:mr-0"
            onClick={() => {
              console.log('on click');
              setIsSearchOpen(!isSearchOpen);
            }}
          />
        </Tooltip>
      </HStack>
    </SearchContext.Provider>
  );
};

const styles = tv({
  slots: {
    input: 'w-full tablet:w-[400px]',
  },
});
