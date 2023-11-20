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
  Text,
  Link,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import NextLink from 'next/link';
import { useRef, useState } from 'react';

import { cx } from '../../utils/cx';

type SearchInputProps = BaseProps<InputProps & InputFieldProps> & {
  onSubmit?: (value: string) => void;
  onClear?: () => void;
  searchResult?: Maybe<SearchResult>;
};

function SearchResultDropdown({
  searchResult,
  openDropdown,
  onOpenChange,
}: {
  searchResult?: Maybe<SearchResult>;
  openDropdown: boolean;
  onOpenChange: () => void;
}) {
  return (
    <Dropdown open={openDropdown} onOpenChange={onOpenChange}>
      <Dropdown.Trigger>
        <div></div>
      </Dropdown.Trigger>
      <Dropdown.Content>
        {!searchResult && (
          <>
            <Dropdown.Item>
              Input is not a valid address, contract id, block id, or
              transaction id
            </Dropdown.Item>
          </>
        )}
        {searchResult?.account && (
          <>
            <Dropdown.Item>Account</Dropdown.Item>
            <Dropdown.Item>
              <Link
                as={NextLink}
                href={`/account/${searchResult.account.address}/assets`}
              >
                {shortAddress(searchResult.account.address || '', 21, 19)}
              </Link>
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item>Recent Transactions</Dropdown.Item>
            {searchResult.account.transactions?.map((transaction) => {
              return (
                <Dropdown.Item key={transaction?.id}>
                  <Link as={NextLink} href={`/tx/${transaction?.id}/`}>
                    {shortAddress(transaction?.id || '', 21, 19)}
                  </Link>
                </Dropdown.Item>
              );
            })}
          </>
        )}
        {searchResult?.block && (
          <>
            <Dropdown.Item>Block</Dropdown.Item>
            <Dropdown.Item>
              <Link as={NextLink} href={`/block/${searchResult.block.id}`}>
                {shortAddress(searchResult.block.id || '', 21, 19)}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link as={NextLink} href={`/block/${searchResult.block.height}`}>
                {searchResult.block.height}
              </Link>
            </Dropdown.Item>
          </>
        )}
        {searchResult?.contract && (
          <>
            <Dropdown.Item>Contract</Dropdown.Item>
            <Dropdown.Item>
              <Link
                as={NextLink}
                href={`/contract/${searchResult.contract.id}/assets`}
              >
                {shortAddress(searchResult.contract.id || '', 21, 19)}
              </Link>
            </Dropdown.Item>
          </>
        )}
        {searchResult?.transaction && (
          <>
            <Dropdown.Item>Transaction</Dropdown.Item>
            <Dropdown.Item>
              <Link as={NextLink} href={`/tx/${searchResult.transaction.id}`}>
                {shortAddress(searchResult.transaction.id || '', 20, 18)}
              </Link>
            </Dropdown.Item>
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
  const [openDropdown, setOpenDropdown] = useState(!!searchResult);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    setOpenDropdown(true);
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
      <SearchResultDropdown
        searchResult={searchResult}
        openDropdown={openDropdown}
        onOpenChange={() => {
          setOpenDropdown(!openDropdown);
        }}
      />
      <Text size="2">
        Search by address, contract id, transaction id, or block id
      </Text>
    </>
  );
}
