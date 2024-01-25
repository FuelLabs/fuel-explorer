import type { SearchResult } from '@fuel-explorer/graphql';
import { useContext } from 'react';
import { useFormState } from 'react-dom';
import { search } from '~/systems/Core/actions/search';

import { SearchInput } from '../SearchInput/SearchInput';
import { SearchContext } from '../SearchWidget/SearchWidget';

type SearchFormProps = {
  className: string;
  autoFocus?: boolean;
  alwaysDisplayActionButtons?: boolean;
};

export function SearchForm({
  className,
  autoFocus,
  alwaysDisplayActionButtons,
}: SearchFormProps) {
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
        autoFocus={autoFocus}
        alwaysDisplayActionButtons={alwaysDisplayActionButtons}
        onClear={onClear}
      />
    </form>
  );
}
