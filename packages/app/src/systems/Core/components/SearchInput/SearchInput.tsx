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
  VStack,
  useBreakpoints,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import NextLink from 'next/link';
import type { KeyboardEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { tv } from 'tailwind-variants';

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
  const classes = styles();
  const { isMobile } = useBreakpoints();
  const trimL = isMobile ? 15 : 20;
  const trimR = isMobile ? 13 : 18;

  return (
    <Dropdown open={openDropdown} onOpenChange={onOpenChange}>
      <Dropdown.Trigger>
        <div></div>
      </Dropdown.Trigger>
      <Dropdown.Content className="w-[311px] tablet:w-[400px]">
        {!searchResult && (
          <>
            <Dropdown.Item className="hover:bg-transparent focus:bg-transparent text-error hover:text-error focus:text-error">
              Error: input is not a valid address, contract id, block id, or
              transaction id
            </Dropdown.Item>
          </>
        )}
        {searchResult?.account && (
          <>
            <Dropdown.Label>Account</Dropdown.Label>
            <Dropdown.Item className={classes.dropdownItem()}>
              <Link
                as={NextLink}
                href={`/account/${searchResult.account.address}/assets`}
                className="text-color"
              >
                {shortAddress(searchResult.account.address || '', trimL, trimR)}
              </Link>
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Label>Recent Transactions</Dropdown.Label>
            {searchResult.account.transactions?.map((transaction) => {
              return (
                <Dropdown.Item
                  key={transaction?.id}
                  className={classes.dropdownItem()}
                >
                  <Link
                    as={NextLink}
                    href={`/tx/${transaction?.id}/`}
                    className="text-color"
                  >
                    {shortAddress(transaction?.id || '', trimL, trimR)}
                  </Link>
                </Dropdown.Item>
              );
            })}
          </>
        )}
        {searchResult?.block && (
          <>
            <Dropdown.Label>Block</Dropdown.Label>
            <Dropdown.Item className={classes.dropdownItem()}>
              <Link
                as={NextLink}
                href={`/block/${searchResult.block.id}`}
                className="text-color"
              >
                {shortAddress(searchResult.block.id || '', trimL, trimR)}
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className={classes.dropdownItem()}>
              <Link
                as={NextLink}
                href={`/block/${searchResult.block.height}`}
                className="text-color"
              >
                {searchResult.block.height}
              </Link>
            </Dropdown.Item>
          </>
        )}
        {searchResult?.contract && (
          <>
            <Dropdown.Label>Contract</Dropdown.Label>
            <Dropdown.Item className={classes.dropdownItem()}>
              <Link
                as={NextLink}
                href={`/contract/${searchResult.contract.id}/assets`}
                className="text-color"
              >
                {shortAddress(searchResult.contract.id || '', trimL, trimR)}
              </Link>
            </Dropdown.Item>
          </>
        )}
        {searchResult?.transaction && (
          <>
            <Dropdown.Label>Transaction</Dropdown.Label>
            <Dropdown.Item className={classes.dropdownItem()}>
              <Link
                as={NextLink}
                href={`/tx/${searchResult.transaction.id}`}
                className="text-color"
              >
                {shortAddress(searchResult.transaction.id || '', trimL, trimR)}
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
  onClear,
  autoFocus,
  placeholder = 'Search here...',
  searchResult,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState<string>(initialValue as string);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && hasSubmitted) {
      setOpenDropdown(true);
      setHasSubmitted(false);
    }
  }, [pending]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    setHasSubmitted(true);
  }

  function handleClear() {
    setValue('');
    setHasSubmitted(false);
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <VStack gap="2">
      <Focus.ArrowNavigator autoFocus={autoFocus}>
        <Input
          className={cx(className)}
          radius="large"
          size="3"
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              (e.target as HTMLFormElement).form?.dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true }),
              );
              handleSubmit();
            }
          }}
        >
          <Input.Slot className="mx-1">
            <Icon icon={IconSearch} size={16} />
          </Input.Slot>
          <Input.Field
            {...props}
            ref={inputRef}
            name="query"
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
                  type="submit"
                  aria-label="Submit"
                  icon={IconCheck}
                  iconColor="text-brand"
                  variant="link"
                  isLoading={pending}
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
          if (openDropdown) {
            setHasSubmitted(false);
          }
          setOpenDropdown(!openDropdown);
        }}
      />
      <Text size="1">
        Search by address, contract id, transaction id, or block id
      </Text>
    </VStack>
  );
}

const styles = tv({
  slots: {
    dropdownItem: 'hover:bg-border focus:bg-border',
  },
});
