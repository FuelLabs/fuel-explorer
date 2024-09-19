import {
  Box,
  Dropdown,
  Link,
  Text,
  shortAddress,
  useBreakpoints,
} from '@fuels/ui';
import NextLink from 'next/link';
import { forwardRef } from 'react';
import { Routes } from '~/routes';

import { cx } from '../../../utils/cx';

import { useRouter } from 'next/navigation';
import { styles as searchStyles } from '../styles';
import { styles } from './styles';
import type { SearchDropdownProps } from './types';

export const SearchResultDropdown = forwardRef<
  HTMLDivElement,
  SearchDropdownProps
>(
  (
    {
      searchResult,
      searchValue,
      openDropdown,
      onOpenChange,
      width,
      onSelectItem,
      isFocused,
    },
    ref,
  ) => {
    const router = useRouter();

    function onClick(href: string | undefined) {
      onSelectItem?.();
      if (href) {
        router.push(href);
      }
    }
    const classes = styles();
    const searchClasses = searchStyles();
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
          style={{ width }}
          data-active={isFocused || openDropdown}
          className={cx(
            classes.dropdownContent(openDropdown),
            searchClasses.searchSize(),
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
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.account?.address &&
                      onClick(
                        Routes.accountAssets(searchResult.account.address!),
                      )
                    }
                  >
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
                  {!!searchResult.account.transactions?.length && (
                    <>
                      <Dropdown.Separator />
                      <Dropdown.Label>Recent Transactions</Dropdown.Label>
                      {searchResult.account.transactions?.map((transaction) => {
                        return (
                          <Dropdown.Item
                            key={transaction?.id}
                            className={classes.dropdownItem()}
                            onClick={() =>
                              transaction?.id &&
                              onClick(Routes.txSimple(transaction?.id))
                            }
                          >
                            <Link
                              as={NextLink}
                              href={Routes.txSimple(transaction?.id!)}
                              onClick={onSelectItem}
                            >
                              {shortAddress(
                                transaction?.id || '',
                                trimL,
                                trimR,
                              )}
                            </Link>
                          </Dropdown.Item>
                        );
                      })}
                    </>
                  )}
                </>
              )}
              {searchResult?.block && (
                <>
                  {searchResult.block.id === searchValue && (
                    <>
                      <Dropdown.Label>Block Hash</Dropdown.Label>
                      <Dropdown.Item
                        className={classes.dropdownItem()}
                        onClick={() =>
                          searchResult.block?.id &&
                          onClick(`/block/${searchResult.block.id}/simple`)
                        }
                      >
                        <Link
                          as={NextLink}
                          href={`/block/${searchResult.block.id}/simple`}
                          onClick={onSelectItem}
                        >
                          {shortAddress(
                            searchResult.block.id || '',
                            trimL,
                            trimR,
                          )}
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                  {searchResult.block.height === searchValue && (
                    <>
                      <Dropdown.Label>Block Height</Dropdown.Label>
                      <Dropdown.Item
                        className={classes.dropdownItem()}
                        onClick={() =>
                          searchResult.block?.height &&
                          onClick(`/block/${searchResult.block?.height}/simple`)
                        }
                      >
                        <Link
                          as={NextLink}
                          href={`/block/${searchResult.block.height}/simple`}
                          onClick={onSelectItem}
                        >
                          {searchResult.block.height}
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </>
              )}
              {searchResult?.contract && (
                <>
                  <Dropdown.Label>Contract</Dropdown.Label>
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.contract?.id &&
                      onClick(Routes.contractAssets(searchResult.contract.id))
                    }
                  >
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
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.transaction?.id &&
                      onClick(Routes.txSimple(searchResult.transaction?.id))
                    }
                  >
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
