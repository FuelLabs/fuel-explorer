import type { SearchResult } from '@fuel-explorer/graphql';
import { useContext } from 'react';
import { useFormState } from 'react-dom';
import { search } from '~/systems/Core/actions/search';

import { SearchInput } from './SearchInput';
import { SearchContext } from './SearchWidget';
import { styles } from './styles';

type SearchFormProps = {
  className: string;
  autoFocus?: boolean;
  expandOnFocus?: boolean;
};

export function SearchForm({ className, autoFocus, expandOnFocus }: SearchFormProps) {
  const classes = styles();
  const [results, action] = useFormState(
    (_: SearchResult | null, formData: FormData) => {
      return search({ query: formData.get('query')?.toString() || '' });
    },
    null,
  );
  const { onClear } = useContext(SearchContext);

  return (
    <form action={action} className={classes.searchSize()}>
      <SearchInput
        className={className}
        searchResult={results}
        autoFocus={autoFocus}
        onClear={onClear}
        expandOnFocus={expandOnFocus}
      />
    </form>
  );
}
