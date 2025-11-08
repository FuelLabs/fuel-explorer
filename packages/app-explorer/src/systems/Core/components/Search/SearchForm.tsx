import { ApiService } from '~/services/api';

import type { GQLSearchResult } from '@fuel-explorer/graphql';
import { useState } from 'react';
import { SearchInput } from './SearchInput';
import { styles } from './styles';

type SearchFormProps = {
  className: string;
  autoFocus?: boolean;
};

export function SearchForm({ className, autoFocus }: SearchFormProps) {
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<GQLSearchResult | null | undefined>(
    null,
  );

  const handleSearch = async (formData: FormData) => {
    try {
      const query = formData.get('query')?.toString() || '';

      // Call fast search first, update UI immediately
      const fastResponse = await ApiService.searchFast(query).catch(() => null);

      // Update UI with fast results immediately
      setResults(fastResponse || undefined);

      // Stop initial loading spinner - fast results are showing
      setLoading(false);

      // Show "loading more results" indicator
      setLoadingMore(true);

      // Now fetch slow results in background and merge
      const slowResponse = await ApiService.searchSlow(query).catch(() => null);

      if (slowResponse) {
        // Merge fast and slow results
        const merged = {
          ...fastResponse,
          ...slowResponse,
        };
        setResults(merged || undefined);
      }

      // Done loading more results
      setLoadingMore(false);

      return fastResponse;
    } catch (error) {
      console.error('Error searching:', error);
      setError(true);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setResults(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    handleSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.searchSize()}>
      <SearchInput
        className={className}
        searchResult={results}
        autoFocus={autoFocus}
        loading={loading}
        loadingMore={loadingMore}
        error={error}
      />
    </form>
  );
}
