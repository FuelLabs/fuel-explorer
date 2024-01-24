import type { SearchResult } from '@fuel-explorer/graphql';
import { useFormState } from 'react-dom';
import { search } from '~/systems/Core/actions/search';

import { SearchInput } from '../SearchInput/SearchInput';

export function SearchForm({ className }: { className: string }) {
  const [results, action] = useFormState(
    (_: SearchResult | null, formData: FormData) => {
      return search({ query: formData.get('query')?.toString() || '' });
    },
    null
  );

  return (
    <form action={action}>
      <SearchInput className={className} searchResult={results} />
    </form>
  );
}
