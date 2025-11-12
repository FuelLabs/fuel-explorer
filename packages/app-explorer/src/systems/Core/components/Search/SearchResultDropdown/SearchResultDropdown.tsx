import {
  Box,
  Dropdown,
  Spinner,
  shortAddress,
  useBreakpoints,
} from '@fuels/ui';
import { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { cx } from '../../../utils/cx';

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
      loading,
      error,
      loadingMore,
    },
    ref,
  ) => {
    const navigate = useNavigate();

    function onClick(href: string | undefined) {
      onSelectItem?.();
      if (href) {
        navigate(href);
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
          {error ? (
            <div className={classes.errorContainer()}>
              <p className={classes.errorTitle()}>
                Something went wrong while fetching the results.
              </p>
            </div>
          ) : loading ? (
            <div className={classes.loadingContainer()}>
              <Spinner size={20} color="brand" aria-label="loading" />
            </div>
          ) : hasResult ? (
            <>
              {searchResult?.account && (
                <>
                  <Dropdown.Separator className={classes.dropdownSeparator()} />
                  <Dropdown.Label className={classes.dropdownLabel()}>
                    Account
                  </Dropdown.Label>
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.account?.address &&
                      onClick(`/account/${searchResult.account.address}/assets`)
                    }
                  >
                    <Link
                      className={classes.resultLink()}
                      to={`/account/${searchResult.account.address}/assets`}
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
                      <Dropdown.Separator
                        className={classes.dropdownSeparator()}
                      />
                      <Dropdown.Label className={classes.dropdownLabel()}>
                        Recent Transactions
                      </Dropdown.Label>
                      {searchResult.account.transactions?.map((transaction) => {
                        return (
                          <Dropdown.Item
                            key={transaction?.id}
                            className={classes.dropdownItem()}
                            onClick={() =>
                              transaction?.id &&
                              onClick(`/tx/${transaction?.id}`)
                            }
                          >
                            <Link
                              className={classes.resultLink()}
                              to={`/tx/${transaction?.id}`}
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
                      <Dropdown.Label className={classes.dropdownLabel()}>
                        Block Hash
                      </Dropdown.Label>
                      <Dropdown.Item
                        className={classes.dropdownItem()}
                        onClick={() =>
                          searchResult.block?.id &&
                          onClick(`/block/${searchResult.block.id}/simple`)
                        }
                      >
                        <Link
                          className={classes.resultLink()}
                          to={`/block/${searchResult.block.id}/simple`}
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
                      <Dropdown.Label className={classes.dropdownLabel()}>
                        Block Height
                      </Dropdown.Label>
                      <Dropdown.Item
                        className={classes.dropdownItem()}
                        onClick={() =>
                          searchResult.block?.height &&
                          onClick(`/block/${searchResult.block?.height}/simple`)
                        }
                      >
                        <Link
                          className={classes.resultLink()}
                          to={`/block/${searchResult.block?.height}/simple`}
                          onClick={onSelectItem}
                        >
                          {shortAddress(
                            searchResult.block.height || '',
                            trimL,
                            trimR,
                          )}
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </>
              )}
              {searchResult?.contract && (
                <>
                  <Dropdown.Separator className={classes.dropdownSeparator()} />
                  <Dropdown.Label className={classes.dropdownLabel()}>
                    Contract
                  </Dropdown.Label>
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.contract?.id &&
                      onClick(`/contract/${searchResult.contract.id}`)
                    }
                  >
                    <Link
                      className={classes.resultLink()}
                      to={`/contract/${searchResult.contract.id}`}
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
                  <Dropdown.Separator className={classes.dropdownSeparator()} />
                  <Dropdown.Label className={classes.dropdownLabel()}>
                    Transaction
                  </Dropdown.Label>
                  <Dropdown.Item
                    className={classes.dropdownItem()}
                    onClick={() =>
                      searchResult.transaction?.id &&
                      onClick(`/tx/${searchResult.transaction.id}`)
                    }
                  >
                    <Link
                      className={classes.resultLink()}
                      to={`/tx/${searchResult.transaction.id}`}
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
              {loadingMore && (
                <div className={classes.loadingContainer()}>
                  <Spinner
                    size={16}
                    color="brand"
                    aria-label="loading recent transactions"
                  />
                  <p className={classes.loadingText()}>
                    Loading recent transactions...
                  </p>
                </div>
              )}
            </>
          ) : loadingMore ? (
            <div className={classes.loadingContainer()}>
              <Spinner size={16} color="brand" aria-label="searching" />
              <p className={classes.loadingText()}>Searching...</p>
            </div>
          ) : (
            <Dropdown.Label className={classes.dropdownLabel()}>
              No results found.
            </Dropdown.Label>
          )}
        </Dropdown.Content>
      </Dropdown>
    );
  },
);
