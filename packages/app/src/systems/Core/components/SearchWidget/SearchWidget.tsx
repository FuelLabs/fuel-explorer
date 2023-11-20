import type { Maybe, SearchResult } from '@fuel-explorer/graphql';
import { HStack, IconButton } from '@fuels/ui';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';
import { tv } from 'tailwind-variants';

import { SearchInput } from '../SearchInput/SearchInput';

type SearchWidgetProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
  searchResult?: Maybe<SearchResult>;
};

export const SearchWidget = ({
  searchResult,
  isSearchOpen,
  setIsSearchOpen,
}: SearchWidgetProps) => {
  const classes = styles();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <HStack className="items-center gap-4 justify-center">
      {isSearchOpen && (
        <>
          <SearchInput
            searchResult={searchResult}
            className={classes.input()}
            onSubmit={(query) => {
              const pageParam = searchParams.get('page');
              router.push(
                `/transactions?page=${pageParam}&searchQuery=${query}`,
              );
            }}
          />
          <IconButton
            icon={IconX}
            variant="link"
            onClick={() => setIsSearchOpen(false)}
          />
        </>
      )}
      <IconButton
        icon={IconSearch}
        variant="link"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      />
    </HStack>
  );
};

const styles = tv({
  slots: {
    input: 'w-full tablet:w-[400px]',
  },
});
