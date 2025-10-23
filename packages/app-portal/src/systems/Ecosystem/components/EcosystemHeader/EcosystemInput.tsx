import { Input } from '@fuels/ui';
import { IconSearch } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { tv } from 'tailwind-variants';
import { useQueryParamChange } from '~portal/systems/Ecosystem/hooks/useQueryParamChange';

interface EcosystemInputProps {
  search: string | undefined;
  disabled: boolean | undefined;
  onSearchChange?: (search: string) => void;
}

export function EcosystemInput({
  search: _search,
  disabled,
  onSearchChange,
}: EcosystemInputProps) {
  const classes = styles();
  const onQueryParamChange = useQueryParamChange();
  const [searchValue, setSearchValue] = useState(_search || '');

  // Update local state when URL search param changes (from external navigation)
  useEffect(() => {
    if (_search !== searchValue) {
      setSearchValue(_search || '');
    }
  }, [_search]);

  // Immediate callback for filtering (no URL update)
  const debouncedFilter = useCallback(
    debounce((text: string) => {
      onSearchChange?.(text);
    }, 200), // Faster for instant filtering
    [onSearchChange],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchValue(text);

    // Update filtering immediately (no URL updates while typing)
    debouncedFilter(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Immediate URL update on Enter
      onQueryParamChange('search', searchValue);
    }
  };

  const handleBlur = () => {
    // Update URL when focus is lost
    onQueryParamChange('search', searchValue);
  };

  return (
    <Input
      className={classes.searchBarInput()}
      size="3"
      name="search"
      type="text"
      placeholder="Search"
      value={searchValue}
      disabled={disabled}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      <Input.Slot side="right">
        <IconSearch size={16} />
      </Input.Slot>
    </Input>
  );
}

const styles = tv({
  slots: {
    searchBarInput: 'shrink-0 w-full md:w-[350px] h-[44px]',
  },
});
