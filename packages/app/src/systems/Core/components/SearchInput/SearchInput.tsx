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
  Link,
  VStack,
  useBreakpoints,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import NextLink from 'next/link';
import type { KeyboardEvent } from 'react';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';

import { cx } from '../../utils/cx';
import { SearchContext } from '../SearchWidget/SearchWidget';

type SearchDropdownProps = {
  searchResult?: Maybe<SearchResult>;
  openDropdown: boolean;
  onOpenChange: () => void;
  searchValue: string;
};

const SearchResultDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  ({ searchResult, searchValue, openDropdown, onOpenChange }, ref) => {
    const classes = styles();
    const { isMobile } = useBreakpoints();
    const trimL = isMobile ? 15 : 20;
    const trimR = isMobile ? 13 : 18;

    return (
      <Dropdown open={openDropdown} onOpenChange={onOpenChange}>
        <Dropdown.Trigger>
          <div></div>
        </Dropdown.Trigger>
        <Dropdown.Content ref={ref} className="w-[311px] tablet:w-[400px]">
          {!searchResult && (
            <>
              <Dropdown.Item className="hover:bg-transparent focus:bg-transparent text-error hover:text-error focus:text-error">
                {`"${searchValue}" is not a valid address.`}
              </Dropdown.Item>
            </>
          )}
          {searchResult?.account && (
            <>
              <Dropdown.Label>Account</Dropdown.Label>
              <Dropdown.Item className={classes.dropdownItem()}>
                <Link
                  as={NextLink}
                  href={Routes.accountAssets(searchResult.account.address!)}
                  className="text-color"
                >
                  {shortAddress(
                    searchResult.account.address || '',
                    trimL,
                    trimR,
                  )}
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
                      href={Routes.txSimple(transaction!.id!)}
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
                  href={Routes.blockSimple(searchResult.block.id!)}
                  className="text-color"
                >
                  {shortAddress(searchResult.block.id || '', trimL, trimR)}
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className={classes.dropdownItem()}>
                <Link
                  as={NextLink}
                  href={Routes.blockSimple(searchResult.block.height!)}
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
                  href={Routes.contractAssets(searchResult.contract.id!)}
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
                  href={Routes.txSimple(searchResult.transaction.id!)}
                  className="text-color"
                >
                  {shortAddress(
                    searchResult.transaction.id || '',
                    trimL,
                    trimR,
                  )}
                </Link>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Content>
      </Dropdown>
    );
  },
);

type SearchInputProps = BaseProps<InputProps & InputFieldProps> & {
  onSubmit?: (value: string) => void;
  onClear?: (value: string) => void;
  searchResult?: Maybe<SearchResult>;
  alwaysDisplayActionButtons?: boolean;
};

export function SearchInput({
  value: initialValue = '',
  className,
  onClear,
  autoFocus,
  placeholder = 'Search here...',
  searchResult,
  alwaysDisplayActionButtons,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState<string>(initialValue as string);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { pending } = useFormStatus();
  const { dropdownRef } = useContext(SearchContext);

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
    onClear?.(value);
    inputRef.current?.focus();
  }

  return (
    <VStack gap="0" className="justify-center">
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
          {(alwaysDisplayActionButtons || !!value.length) && (
            <Input.Slot className="mx-1">
              <IconButton
                aria-label="Clear"
                icon={IconX}
                iconColor="text-icon"
                variant="link"
                className="!ml-0 tablet:ml-2"
                onClick={handleClear}
              />
              <Tooltip content="Submit">
                <IconButton
                  type="submit"
                  aria-label="Submit"
                  icon={IconCheck}
                  iconColor="text-brand"
                  variant="link"
                  className="!ml-0 tablet:ml-2"
                  isLoading={pending}
                  onClick={handleSubmit}
                />
              </Tooltip>
            </Input.Slot>
          )}
        </Input>
      </Focus.ArrowNavigator>
      <SearchResultDropdown
        ref={dropdownRef}
        searchResult={searchResult}
        searchValue={value}
        openDropdown={openDropdown}
        onOpenChange={() => {
          if (openDropdown) {
            setHasSubmitted(false);
          }
          setOpenDropdown(!openDropdown);
        }}
      />
    </VStack>
  );
}

const styles = tv({
  slots: {
    dropdownItem: 'hover:bg-border focus:bg-border',
  },
});
