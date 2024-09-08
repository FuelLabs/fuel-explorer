import { useFormState } from 'react-dom';
import { search } from '~/systems/Core/actions/search';

import type { GQLSearchResult } from '@fuel-explorer/graphql';
import { SearchInput } from './SearchInput';
import { styles } from './styles';

type SearchFormProps = {
  className: string;
  autoFocus?: boolean;
  expandOnFocus?: boolean;
};

export function SearchForm({
  className,
  autoFocus,
  expandOnFocus,
}: SearchFormProps) {
  const classes = styles();
  const [results, action] = useFormState(
    (_: GQLSearchResult | null, formData: FormData) => {
      return search({ query: formData.get('query')?.toString() || '' });
    },
    null,
  );

  return (
    <form action={action} className={classes.searchSize()}>
      <SearchInput
        className={className}
        searchResult={results}
        autoFocus={autoFocus}
        expandOnFocus={expandOnFocus}
      />
    </form>
  );
}
