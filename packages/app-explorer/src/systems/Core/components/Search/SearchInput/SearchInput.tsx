'use client';

import type { GQLSearchResult, Maybe } from '@fuel-explorer/graphql';
import type { BaseProps, InputProps } from '@fuels/ui';
import { Focus, Icon, IconButton, Input, Tooltip, VStack } from '@fuels/ui';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import type { KeyboardEvent } from 'react';
import { useContext, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { cx } from '../../../utils/cx';

import { SearchResultDropdown } from '../SearchResultDropdown';
import { SearchContext } from '../SearchWidget';
import { usePropagateInputMouseClick } from '../hooks/usePropagateInputMouseClick';
import { DEFAULT_SEARCH_INPUT_WIDTH } from './constants';
import { styles } from './styles';

type SearchInputProps = BaseProps<InputProps> & {
  onSubmit?: (value: string) => void;
  searchResult?: Maybe<GQLSearchResult>;
  alwaysDisplayActionButtons?: boolean;
  variablePosition?: boolean;
};

export function SearchInput({
  value: initialValue = '',
  className,
  autoFocus,
  placeholder = 'Search here...',
  searchResult,
  variablePosition,
  ...props
}: SearchInputProps) {
  const classes = styles();
  const [value, setValue] = useState<string>(initialValue as string);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pending } = useFormStatus();
  const { dropdownRef } = useContext(SearchContext);
  const openDropdown = hasSubmitted
    ? !pending
    : isOpen && !pending && !!searchResult;

  usePropagateInputMouseClick({
    containerRef,
    inputRef,
    enabled: openDropdown,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    setIsOpen(true);
    setHasSubmitted(true);
  }

  function close() {
    setIsOpen(false);
    setHasSubmitted(false);
  }

  function handleClear() {
    setValue('');
    close();
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLFormElement).form?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
      handleSubmit();
    }
  }

  return (
    <div className="relative">
      <VStack
        gap="0"
        data-variable-position={variablePosition}
        className={classes.searchBox()}
        data-active={isFocused || openDropdown}
      >
        <Focus.ArrowNavigator autoFocus={autoFocus}>
          <div ref={containerRef} className={classes.inputContainer()}>
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
              data-active={isFocused || openDropdown}
              className={cx(className, classes.inputWrapper())}
              type="search"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={onKeyDown}
            >
              <div
                data-show={isFocused}
                className={classes.inputActionsContainer()}
              >
                <Input.Slot side="right">
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
                  <IconButton
                    aria-label="Clear"
                    icon={IconX}
                    iconColor="text-gray-11"
                    variant="link"
                    className="m-0"
                    onClick={handleClear}
                  />
                </Input.Slot>
              </div>

              <Input.Slot
                data-show={!isFocused}
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
          width={
            containerRef.current?.offsetWidth || DEFAULT_SEARCH_INPUT_WIDTH
          }
          searchResult={searchResult}
          searchValue={value}
          openDropdown={openDropdown}
          isFocused={isFocused}
          onSelectItem={() => {
            handleClear();
          }}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              close();
            }
          }}
        />
      </VStack>
    </div>
  );
}
