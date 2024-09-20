import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql/sdk';

export type SearchDropdownProps = {
  searchResult?: Maybe<GQLSearchResult>;
  openDropdown: boolean;
  isFocused: boolean;
  onOpenChange: (open: boolean) => void;
  searchValue: string;
  width: number;
  onSelectItem: () => void;
};
