import type { SearchResult } from '@fuel-explorer/graphql';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type SearchProviderProps = {
  children: ReactNode;
};

type SearchContextType = {
  searchValue: string;
  searchResult: SearchResult;
};

export const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  return (
    <SearchContext.Provider value={null}>{children}</SearchContext.Provider>
  );
};
