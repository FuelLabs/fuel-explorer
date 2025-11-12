import { isB256 } from 'fuels';
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

      // Call fast search first
      const fastResponse = await ApiService.searchFast(query).catch(() => null);

      // Determine what to show immediately - evaluate all logic before setting state
      let initialResult: GQLSearchResult | undefined;

      if (fastResponse) {
        // If we got fast results, show them immediately
        initialResult = fastResponse;
      } else if (isB256(query)) {
        // If no fast result but valid B256, show empty account immediately
        // This gives instant feedback that it's a valid account address
        initialResult = {
          account: {
            address: query,
            transactions: [],
            __typename: 'SearchAccount',
          },
        } as GQLSearchResult;
      } else {
        // No fast results and not a valid B256 hash
        initialResult = undefined;
      }

      // Update UI with immediate results - single setResults call to avoid race conditions
      setResults(initialResult);
      setLoading(false);
      setLoadingMore(true);

      // Now fetch slow results in background and merge
      const slowResponse = await ApiService.searchSlow(query).catch(() => null);

      if (slowResponse) {
        // Only add account from slow if fast didn't find a specific entity
        // Account is a fallback result, not a primary result
        const hasSpecificResult =
          fastResponse?.block ||
          fastResponse?.contract ||
          fastResponse?.transaction ||
          fastResponse?.asset ||
          fastResponse?.predicate;

        let merged: GQLSearchResult | null = null;

        if (hasSpecificResult) {
          // Keep fast results as-is, don't add account
          merged = fastResponse;
        } else if (slowResponse.account) {
          // Only show account from slow if fast found nothing specific
          merged = {
            account: {
              ...slowResponse.account,
              __typename: 'SearchAccount',
            },
          } as GQLSearchResult;
        } else {
          // No specific results and no account with transactions
          merged = fastResponse; // Could be null or undefined
        }

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
