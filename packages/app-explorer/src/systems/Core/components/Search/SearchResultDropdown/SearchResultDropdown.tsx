import {
  Box,
  Dropdown,
  Spinner,
  shortAddress,
  useBreakpoints,
} from '@fuels/ui';
import { Fragment, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import { cx } from '../../../utils/cx';

import { type SearchHit, hitsFromResult } from '../recentSearches';
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
      recents,
      onClearRecents,
      keepOpenWithin,
      isFocused,
      loading,
      error,
    },
    ref,
  ) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const classes = styles();
    const searchClasses = searchStyles();
    const { isMobile } = useBreakpoints();
    const trimL = isMobile ? 8 : 12;
    const trimR = isMobile ? 6 : 10;

    const hits = hitsFromResult(searchResult, searchValue);
    const showRecents =
      !loading && !error && !searchValue && !searchResult && recents.length > 0;

    function pick(hit: SearchHit) {
      onSelectItem(hit);
      navigate(hit.href);
    }

    // The item handles the click; the link keeps its href for new-tab opens.
    const row = (hit: SearchHit, trailing?: React.ReactNode) => (
      <Dropdown.Item
        key={`${hit.kind}-${hit.value}`}
        className={classes.dropdownItem()}
        onClick={() => pick(hit)}
      >
        <Link
          className={classes.resultLink()}
          to={hit.href}
          onClick={(event) => event.preventDefault()}
        >
          {shortAddress(hit.value, trimL, trimR)}
        </Link>
        {trailing}
      </Dropdown.Item>
    );

    let body: React.ReactNode;
    if (error) {
      body = (
        <div className={classes.errorContainer()}>
          <p className={classes.errorTitle()}>{t('common.search_error')}</p>
        </div>
      );
    } else if (loading) {
      body = (
        <div className={classes.loadingContainer()}>
          <Spinner size={20} color="brand" aria-label="loading" />
        </div>
      );
    } else if (showRecents) {
      body = (
        <>
          <Dropdown.Label className={classes.dropdownLabel()}>
            {t('common.recent_searches')}
          </Dropdown.Label>
          {recents.map((hit) =>
            row(
              hit,
              <span className={classes.recentKind()}>
                {t(`common.search_kind.${hit.kind}`)}
              </span>,
            ),
          )}
          <Dropdown.Separator className={classes.dropdownSeparator()} />
          <Dropdown.Item
            className={classes.clearRecent()}
            onClick={onClearRecents}
          >
            {t('common.clear_recent')}
          </Dropdown.Item>
        </>
      );
    } else if (hits.length) {
      body = hits.map((hit, index) => (
        <Fragment key={`${hit.kind}-${hit.value}`}>
          {index > 0 && (
            <Dropdown.Separator className={classes.dropdownSeparator()} />
          )}
          <Dropdown.Label className={classes.dropdownLabel()}>
            {t(`common.search_kind.${hit.kind}`)}
          </Dropdown.Label>
          {row(hit)}
        </Fragment>
      ));
    } else {
      body = (
        <div className={classes.emptyContainer()}>
          <p className={classes.emptyTitle()}>{t('common.no_results')}</p>
          <p className={classes.emptyHint()}>{t('common.no_results_hint')}</p>
        </div>
      );
    }

    // Non-modal, so the field keeps focus while the panel is open.
    return (
      <Dropdown open={openDropdown} onOpenChange={onOpenChange} modal={false}>
        <Dropdown.Trigger>
          <Box className="w-full" />
        </Dropdown.Trigger>
        <Dropdown.Content
          ref={ref}
          style={{ width }}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            const target = event.target as Node | null;
            if (target && keepOpenWithin?.current?.contains(target)) {
              event.preventDefault();
            }
          }}
          data-active={isFocused || openDropdown}
          className={cx(
            classes.dropdownContent(openDropdown),
            searchClasses.searchSize(),
          )}
        >
          {body}
        </Dropdown.Content>
      </Dropdown>
    );
  },
);
