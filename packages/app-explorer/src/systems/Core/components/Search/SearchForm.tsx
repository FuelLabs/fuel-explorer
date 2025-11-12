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
      const fastPromise = ApiService.searchFast(query);
      const slowPromise = ApiService.searchSlow(query);

      let fastResponse: any;
      try {
        fastResponse = await fastPromise;
      } catch (_error) {
        setError(true);
        setLoading(false);
        setLoadingMore(false);
        return;
      }

      let initialResult: GQLSearchResult | undefined;

      if (fastResponse) {
        initialResult = fastResponse;
      } else if (isB256(query)) {
        initialResult = {
          account: {
            address: query,
            transactions: [],
            __typename: 'SearchAccount',
          },
        } as GQLSearchResult;
      }

      setResults(initialResult);
      setLoading(false);
      setLoadingMore(true);

      const slowResponse = await slowPromise.catch(() => null);

      if (slowResponse) {
        const hasSpecificResult =
          fastResponse?.block ||
          fastResponse?.contract ||
          fastResponse?.transaction ||
          fastResponse?.predicate;

        if (hasSpecificResult) {
          setResults(fastResponse);
        } else if (slowResponse.account) {
          setResults({
            account: {
              ...slowResponse.account,
              __typename: 'SearchAccount',
            },
          } as GQLSearchResult);
        }
      }

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
    if (loading || loadingMore) return;
    setResults(null);
    setLoading(true);
    setLoadingMore(false);
    setError(false);

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
