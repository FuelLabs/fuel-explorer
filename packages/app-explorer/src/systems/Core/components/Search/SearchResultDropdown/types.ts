import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql/sdk';
import type { RefObject } from 'react';
import type { SearchHit } from '../recentSearches';

export type SearchDropdownProps = {
  searchResult?: Maybe<GQLSearchResult>;
  openDropdown: boolean;
  isFocused: boolean;
  onOpenChange: (open: boolean) => void;
  searchValue: string;
  width: number;
  onSelectItem: (hit: SearchHit) => void;
  recents: SearchHit[];
  onClearRecents: () => void;
  keepOpenWithin?: RefObject<HTMLElement>;
  loading: boolean;
  error?: boolean;
  loadingMore?: boolean;
  id?: string;
};
