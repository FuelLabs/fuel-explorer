'use client';

import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql';
import type { BaseProps, InputProps } from '@fuels/ui';
import {
  Box,
  Dropdown,
  Focus,
  Icon,
  IconButton,
  Input,
  Link,
  Text,
  Tooltip,
  VStack,
  shortAddress,
  useBreakpoints,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import NextLink from 'next/link';
import type { KeyboardEvent } from 'react';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Routes } from '~/routes';

import { cx } from '../../utils/cx';

import { SearchContext } from './SearchWidget';
import { styles } from './styles';

type SearchDropdownProps = {
  searchResult?: Maybe<GQLSearchResult>;
  openDropdown: boolean;
  onOpenChange: () => void;
  searchValue: string;
  width: number;
  onSelectItem: () => void;
  isExpanded?: boolean;
};

const SearchResultDropdown = forwardRef<HTMLDivElement, SearchDropdownProps>(
  (
    {
      searchResult,
      searchValue,
      openDropdown,
      onOpenChange,
      width,
      onSelectItem,
      isExpanded,
    },
    ref,
  ) => {
    const classes = styles();
    const { isMobile } = useBreakpoints();
    const trimL = isMobile ? 15 : 20;
    const trimR = isMobile ? 13 : 18;

    const hasResult =
      searchResult?.account ||
      searchResult?.block ||
      searchResult?.contract ||
      searchResult?.transaction;

    return (
      <Dropdown open={openDropdown} onOpenChange={onOpenChange}>
        <Dropdown.Trigger>
          <Box className="w-full" />
        </Dropdown.Trigger>
        <Dropdown.Content
          ref={ref}
          style={{ width: width - 0.5 }}
          data-expanded={isExpanded}
          className={cx(
            classes.dropdownContent(isExpanded),
            classes.searchSize(),
          )}
        >
          {!searchResult && (
            <>
              <Dropdown.Item className="hover:bg-transparent focus:bg-transparent text-error hover:text-error focus:text-error">
                {`"${shortAddress(
                  searchValue,
                  trimL,
                  trimR,
                )}" is not a valid address.`}
              </Dropdown.Item>
            </>
          )}
          {hasResult ? (
            <>
              {searchResult?.account && (
                <>
                  <Dropdown.Label>Account</Dropdown.Label>
                  <Dropdown.Item className={classes.dropdownItem()}>
                    <Link
                      as={NextLink}
                      href={Routes.accountAssets(searchResult.account.address!)}
                      onClick={onSelectItem}
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
                          onClick={onSelectItem}
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
                      onClick={onSelectItem}
                    >
                      {shortAddress(searchResult.block.id || '', trimL, trimR)}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className={classes.dropdownItem()}>
                    <Link
                      as={NextLink}
                      href={Routes.blockSimple(searchResult.block.height!)}
                      onClick={onSelectItem}
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
                      onClick={onSelectItem}
                    >
                      {shortAddress(
                        searchResult.contract.id || '',
                        trimL,
                        trimR,
                      )}
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
                      onClick={onSelectItem}
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
            </>
          ) : (
            <>
              <Dropdown.Label>No instances found for:</Dropdown.Label>
              <Text className="px-3 text-sm pb-1">
                &quot;{shortAddress(searchValue, trimL, trimR)}&quot;
              </Text>
            </>
          )}
        </Dropdown.Content>
      </Dropdown>
    );
  },
);

type SearchInputProps = BaseProps<InputProps> & {
  onSubmit?: (value: string) => void;
  onClear?: (value: string) => void;
  searchResult?: Maybe<GQLSearchResult>;
  alwaysDisplayActionButtons?: boolean;
  expandOnFocus?: boolean;
};

export function SearchInput({
  value: initialValue = '',
  className,
  onClear,
  autoFocus,
  placeholder = 'Search here...',
  searchResult,
  expandOnFocus,
  ...props
}: SearchInputProps) {
  const classes = styles();
  const [value, setValue] = useState<string>(initialValue as string);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      inputRef.current?.focus();
    }
  }

  function expandOnFocusHandler() {
    if (expandOnFocus) {
      setIsExpanded(true);
    }
  }

  return (
    <VStack gap="0" className={classes.searchBox()} data-expanded={isExpanded}>
      <Focus.ArrowNavigator autoFocus={autoFocus}>
        <Input
          {...props}
          ref={inputRef}
          name="query"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          variant="surface"
          radius="large"
          size="3"
          data-opened={openDropdown}
          className={cx(className, classes.inputWrapper())}
          onFocus={expandOnFocusHandler}
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
          {isExpanded || value?.length ? (
            <>
              <Input.Slot className="" side="right">
                {!!value?.length && (
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
                )}
                <IconButton
                  aria-label="Clear"
                  icon={IconX}
                  iconColor="text-gray-11"
                  variant="link"
                  className="m-0"
                  onClick={handleClear}
                />
              </Input.Slot>
            </>
          ) : (
            <Input.Slot side="right">
              <Icon icon={IconSearch} size={16} />
            </Input.Slot>
          )}
        </Input>
      </Focus.ArrowNavigator>
      <SearchResultDropdown
        ref={dropdownRef}
        width={inputRef.current?.offsetWidth || 0}
        searchResult={searchResult}
        searchValue={value}
        openDropdown={openDropdown}
        isExpanded={isExpanded}
        onSelectItem={() => {
          setOpenDropdown(false);
          handleClear();
        }}
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
