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
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<GQLSearchResult | null | undefined>(
    undefined,
  );

  const handleSearch = async (formData: FormData) => {
    try {
      const query = formData.get('query')?.toString() || '';
      const searchResponse = await ApiService.search(query);

      setResults(searchResponse);
      setLoading(false);
      setError(false);

      return searchResponse;
    } catch (error) {
      console.error('Error searching:', error);
      setError(true);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setResults(null);
    setLoading(true);
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
        error={error}
      />
    </form>
  );
}
