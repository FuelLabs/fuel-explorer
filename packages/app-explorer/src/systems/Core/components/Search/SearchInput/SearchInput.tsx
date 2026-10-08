import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql';
import type { BaseProps, InputProps } from '@fuels/ui';
import {
  Focus,
  Icon,
  IconButton,
  Input,
  Tooltip,
  VStack,
  useBreakpoints,
} from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@fuels/ui';
import type { KeyboardEvent } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMedia } from 'react-use';

import { cx } from '../../../utils/cx';

import { SearchResultDropdown } from '../SearchResultDropdown';
import { SearchContext } from '../SearchWidget';
import {
  addRecentSearch,
  clearRecentSearches,
  useRecentSearches,
} from '../recentSearches';
import { BELOW_LAPTOP_QUERY, DEFAULT_SEARCH_INPUT_WIDTH } from './constants';
import { styles } from './styles';

type SearchInputProps = BaseProps<InputProps> & {
  loading: boolean;
  onSubmit?: (value: string) => void;
  searchResult?: Maybe<GQLSearchResult>;
  alwaysDisplayActionButtons?: boolean;
  error?: boolean;
  loadingMore?: boolean;
};

export function SearchInput({
  value: initialValue = '',
  className,
  autoFocus,
  placeholder: _placeholder,
  searchResult,
  loading,
  error,
  loadingMore,
  ...props
}: SearchInputProps) {
  const classes = styles();
  const [value, setValue] = useState<string>(initialValue as string);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const lastSearchTerm = useRef<string | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number>(
    DEFAULT_SEARCH_INPUT_WIDTH,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { dropdownRef } = useContext(SearchContext);
  const { isMobile } = useBreakpoints();
  const isCompactNav = useMedia(BELOW_LAPTOP_QUERY, false);
  const { t } = useTranslation();
  const placeholder =
    _placeholder ?? (isMobile ? t('common.search_short') : t('common.search'));
  const recents = useRecentSearches();
  const hasRecents = !value && recents.length > 0;
  const shouldOpen = !!error || !!value || searchResult !== null || hasRecents;
  const openDropdown = isOpen;
  const active = isFocused || openDropdown;
  const takeover = isCompactNav && active;
  const isPressingFloatingIcon = useRef<boolean>(false);
  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (searchResult !== undefined) {
      setValue((prev) => {
        lastSearchTerm.current = prev;
        return prev;
      });
      setIsOpen(true);
    }
  }, [searchResult]);

  // Creating another useEffect to keep behavior consistent
  useEffect(() => {
    if (isOpen) {
      setIsFocused(true);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    let animationFrameId: number;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        // Batch state updates to avoid unnecessary re-renders and layout trashing
        animationFrameId = window.requestAnimationFrame(() => {
          setDropdownWidth((prevWidth) => {
            if (prevWidth !== newWidth) {
              return newWidth;
            }
            return prevWidth;
          });
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function close() {
    lastSearchTerm.current = null;
    setIsOpen(false);
  }

  function handleClear() {
    if (loading) return;
    setValue('');
    close();
    if (takeover) {
      setIsFocused(false);
      inputRef.current?.blur();
      return;
    }
    inputRef.current?.focus();
  }

  function handleFocus() {
    setIsFocused(true);
    if (hasRecents && !isOpen) setIsOpen(true);
  }

  function handleBlur() {
    // Fixes onBlur triggering before the button is clicked
    if (!isPressingFloatingIcon.current) {
      setIsFocused(false);
    }
  }

  function handleButtonMouseDown() {
    // Fixes onBlur triggering before the button is clicked
    isPressingFloatingIcon.current = true;
  }

  function handleButtonMouseUp() {
    // Fixes onBlur triggering before the button is clicked
    isPressingFloatingIcon.current = false;
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLFormElement).form?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  }

  return (
    <div className="laptop:relative">
      <VStack gap="0" className={classes.searchBox()} data-active={active}>
        <Focus.ArrowNavigator autoFocus={autoFocus}>
          <div ref={containerRef} className={classes.inputContainer()}>
            <Input
              {...props}
              ref={inputRef}
              name="query"
              placeholder={placeholder}
              value={value}
              onInput={handleChange}
              variant="surface"
              radius="large"
              size="3"
              data-active={active}
              className={cx(className, classes.inputWrapper())}
              type="search"
              autoComplete="off"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={onKeyDown}
            >
              <Input.Slot
                side="left"
                data-show={takeover}
                className="[&[data-show=false]]:hidden"
              >
                <Icon icon={IconSearch} size={16} />
              </Input.Slot>
              <Input.Slot
                side="right"
                data-show={!!value || takeover}
                className={classes.inputActionsContainer()}
              >
                <Tooltip content={t('common.submit')}>
                  <IconButton
                    type="submit"
                    aria-label={t('common.submit')}
                    icon={IconCheck}
                    className={classes.iconCheck()}
                    iconColor="text-brand"
                    variant="link"
                    data-should-hide={
                      !!value && value !== lastSearchTerm.current
                    }
                    isLoading={loading}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                  />
                </Tooltip>
                <Tooltip
                  content={takeover ? t('common.close') : t('common.clear')}
                >
                  <IconButton
                    aria-label={
                      takeover ? t('common.close') : t('common.clear')
                    }
                    icon={IconX}
                    iconColor="text-gray-11"
                    className={classes.iconClear()}
                    variant="link"
                    disabled={loading}
                    aria-disabled={loading}
                    onClick={handleClear}
                    onPointerDown={handleClear}
                    onMouseDown={handleButtonMouseDown}
                    onMouseUp={handleButtonMouseUp}
                  />
                </Tooltip>
              </Input.Slot>

              <Input.Slot
                data-show={!isFocused && !value && !takeover}
                side="right"
                className="[&[data-show=false]]:hidden"
              >
                <Icon icon={IconSearch} size={16} />
              </Input.Slot>
            </Input>
          </div>
        </Focus.ArrowNavigator>
        <SearchResultDropdown
          ref={dropdownRef}
          width={dropdownWidth}
          searchResult={searchResult}
          searchValue={value}
          openDropdown={openDropdown}
          isFocused={isFocused}
          error={error}
          loading={loading}
          loadingMore={loadingMore}
          recents={recents}
          keepOpenWithin={containerRef}
          onSelectItem={(hit) => {
            addRecentSearch(hit);
            handleClear();
          }}
          onClearRecents={() => {
            clearRecentSearches();
            close();
          }}
          onOpenChange={(open) => {
            if (!open) {
              close();
              return;
            }
            shouldOpen && setIsOpen(true);
          }}
        />
      </VStack>
    </div>
  );
}
