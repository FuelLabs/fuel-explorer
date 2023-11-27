import type { Maybe, SearchResult } from '@fuel-explorer/graphql';
import type { BaseProps, InputProps } from '@fuels/ui';

import { SearchInput } from '../SearchInput/SearchInput';

type SearchFormProps = BaseProps<InputProps> & {
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  searchResult?: Maybe<SearchResult>;
};

export function SearchForm({
  className,
  onSubmit,
  searchResult,
}: SearchFormProps) {
  return (
    <form action={() => {}}>
      <SearchInput
        searchResult={searchResult}
        className={className}
        onSubmit={onSubmit}
      />
    </form>
  );
}
