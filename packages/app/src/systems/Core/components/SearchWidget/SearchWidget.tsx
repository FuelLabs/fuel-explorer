import type { Maybe, SearchResult } from '@fuel-explorer/graphql';
import { HStack, IconButton, Tooltip } from '@fuels/ui';
import { IconSearch, IconX } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { tv } from 'tailwind-variants';

import { SearchForm } from '../SearchForm/SearchForm';

type SearchWidgetProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
};

export const SearchWidget = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchWidgetProps) => {
  const classes = styles();

  return (
    <HStack className="items-center gap-0 laptop:gap-4 justify-center">
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
              {/* <SearchInput
                searchResult={searchResult}
                className={classes.input()}
                onSubmit={(query) => {
                  const pageParam = searchParams.get('page');
                  router.push(
                    `/transactions?page=${pageParam}&searchQuery=${query}`,
                  );
                }}
              /> */}
              <SearchForm className={classes.input()} />
            </motion.div>
            <IconButton
              icon={IconX}
              variant="link"
              className="text-color"
              onClick={() => setIsSearchOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
      <Tooltip content="Search by address, contract id, transaction id, or block id">
        <IconButton
          icon={IconSearch}
          variant="link"
          className="mr-1 text-color laptop:mr-0"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
      </Tooltip>
    </HStack>
  );
};

const styles = tv({
  slots: {
    input: 'w-full tablet:w-[400px]',
  },
});
