import type { SearchResult } from '@fuel-explorer/graphql';
import { useContext } from 'react';
import { useFormState } from 'react-dom';
import { search } from '~/systems/Core/actions/search';

import { SearchInput } from '../SearchInput/SearchInput';
import { SearchContext } from '../SearchWidget/SearchWidget';

export function SearchForm({
  className,
  autoFocus,
}: {
  className: string;
  autoFocus?: boolean;
}) {
  const [results, action] = useFormState(
    (_: SearchResult | null, formData: FormData) => {
      return search({ query: formData.get('query')?.toString() || '' });
    },
    null,
  );
  const { onClear } = useContext(SearchContext);

  return (
    <form action={action}>
      <SearchInput
        className={className}
        searchResult={results}
        onClear={onClear}
        autoFocus={autoFocus}
      />
    </form>
  );
}
