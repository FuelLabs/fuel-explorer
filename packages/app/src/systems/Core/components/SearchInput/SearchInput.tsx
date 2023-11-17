'use client';

import type { Maybe, SearchResult } from '@fuel-explorer/graphql';
import type { BaseProps, InputFieldProps, InputProps } from '@fuels/ui';
import {
  Focus,
  Icon,
  IconButton,
  Tooltip,
  Input,
  Dropdown,
  shortAddress,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import { useRef, useState } from 'react';

import { cx } from '../../utils/cx';

type SearchInputProps = BaseProps<InputProps & InputFieldProps> & {
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  searchResult?: Maybe<SearchResult>;
};

function SearchResultDropdown({
  searchResult,
}: {
  searchResult?: Maybe<SearchResult>;
}) {
  return (
    <Dropdown
      open={!!searchResult}
      onOpenChange={() => console.log('open change')}
    >
      <Dropdown.Trigger>
        <div></div>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {searchResult?.account && (
          <>
            <Dropdown.Item>Account</Dropdown.Item>
            <Dropdown.Item>
              {shortAddress(searchResult.account.address || '')}
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Recent Transactions</Dropdown.Item>
            {searchResult.account.transactions?.map((transaction) => {
              return (
                <Dropdown.Item key={transaction?.id}>
                  {transaction?.id}
                </Dropdown.Item>
              );
            })}
          </>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
}

export function SearchInput({
  value: initialValue = '',
  className,
  onSubmit,
  onClear,
  autoFocus,
  placeholder = '0x00000000000000000000000000000000000000000000000000000000000000',
  searchResult,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState<string>(initialValue as string);
  const inputRef = useRef<HTMLInputElement>(null);

  console.log(`searchResult in input`, searchResult);
  console.log('bool', !!searchResult);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    console.log('handle submit');
    onSubmit?.(value || '');
  }

  function handleClear() {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <>
      <Focus.ArrowNavigator autoFocus={autoFocus}>
        <Input className={cx(className)} radius="large" size="3">
          <Input.Slot className="mx-1">
            <Icon icon={IconSearch} size={16} />
          </Input.Slot>
          <Input.Field
            {...props}
            ref={inputRef}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          {Boolean(value.length) && (
            <Input.Slot className="mx-1">
              <IconButton
                aria-label="Clear"
                icon={IconX}
                iconColor="text-icon"
                variant="link"
                onClick={handleClear}
              />
              <Tooltip content="Submit">
                <IconButton
                  aria-label="Submit"
                  icon={IconCheck}
                  iconColor="text-brand"
                  variant="link"
                  onClick={handleSubmit}
                />
              </Tooltip>
            </Input.Slot>
          )}
        </Input>
      </Focus.ArrowNavigator>
      <SearchResultDropdown searchResult={searchResult} />
      {/* <Text size="2">
        Search by address, contract id, transaction id, or block id
      </Text> */}
    </>
  );
}
