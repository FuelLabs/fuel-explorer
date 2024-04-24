import React, {
  useMemo,
  useState,
  useRef,
  memo,
  type ReactElement,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { createComponent, withNamespace } from '../../utils/component';
import { Flex } from '../Box';
import { Input, type InputFieldProps } from '../Input';
import { Popover } from '../Popover';
import { Text } from '../Text';

export interface AutoCompleteProps<T = string> {
  suggestions: T[];
  placeholder?: string;
  debounce?: number;
  onChange: (value: string | null) => void;
  value: T | null;
  onClick?: (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement, Element>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputFieldProps?: InputFieldProps;
  suggestionFilter?: (suggestion: T) => boolean;
  itemNameSelector?: (suggestion: T) => string;
  onItemSelected?: (suggestion: T) => void;
  children: ReactElement<AutoCompleteContentProps<T>>;
  /**
   * @description If true, input can only be a value from the autocomplete list
   */
  strict?: boolean;
}

export interface AutoCompleteItemProps<T = string>
  extends Pick<AutoCompleteProps<T>, 'itemNameSelector'> {
  className?: string;
  suggestion: T | null;
  onItemSelected: (suggestion: T) => void;
}

export interface AutoCompleteContentProps<T = string>
  extends Pick<AutoCompleteProps<T>, 'itemNameSelector' | 'suggestions'> {
  suggestion: T | null;
  onItemSelected: (suggestion: T) => void;
  className?: string;
}

function AutoCompleteRoot<T = string>({
  suggestions,
  placeholder,
  strict,
  debounce = 300,
  suggestionFilter,
  itemNameSelector,
  onChange,
  onBlur: _onBlur,
  onClick: _onClick,
  onFocus: _onFocus,
  onKeyDown: _onKeyDown,
  value,
  onItemSelected,
  inputFieldProps,
  children,
}: AutoCompleteProps<T>) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<Array<T>>(suggestions);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemSelected(false);
    const input = event.target.value;
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = undefined;
      const filter =
        suggestionFilter ??
        ((_suggestion) =>
          typeof _suggestion === 'string'
            ? _suggestion.toLowerCase().includes(input.toLowerCase())
            : false);
      const newFilteredSuggestions = suggestions.filter(filter);
      onChange(input);
      setFilteredSuggestions(
        !newFilteredSuggestions?.length && !input
          ? suggestions
          : newFilteredSuggestions,
      );
    }, debounce);
  };

  const handleSuggestionClick = (suggestion: T) => {
    inputRef.current?.focus();
    const value = itemNameSelector?.(suggestion) ?? (suggestion as string);
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    setIsPopoverOpen(false);
    if (strict) {
      setItemSelected(true);
    }
    if (onItemSelected) {
      onItemSelected(suggestion);
      return;
    }
    onChange(value);
  };

  const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    _onFocus?.(e);
    setIsPopoverOpen(true);
  };

  const onClick = (e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) => {
    _onClick?.(e);
    setIsPopoverOpen(true);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    _onBlur?.(e);
    if (strict && !itemSelected) {
      onChange(null);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    _onKeyDown?.(event);
    switch (event.key) {
      case 'Enter': {
        const selectedValue = strict ? suggestionFilter?.[0] : value;
        selectedValue && handleSuggestionClick(selectedValue);
        setIsPopoverOpen(false);
        break;
      }
      case 'Escape':
        setIsPopoverOpen(false);
        break;
      default:
        break;
    }
  };

  const childWithProps = useMemo(() => {
    return React.cloneElement(children, {
      suggestions: filteredSuggestions,
      itemNameSelector,
      onItemSelected: handleSuggestionClick,
    });
  }, [children]);

  return (
    <Popover open={isPopoverOpen}>
      <Input>
        <Input.Field
          ref={inputRef}
          {...inputFieldProps}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </Input>
      <Popover.Trigger>
        <div />
      </Popover.Trigger>
      <Popover.Content
        // Goes against accessibility rules but otherwise we'd be constantly losing focus on the input
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {childWithProps}
      </Popover.Content>
    </Popover>
  );
}

function AutoCompleteItemBase<T = string>({
  onItemSelected,
  suggestion,
  itemNameSelector,
  className,
}: AutoCompleteItemProps<T>) {
  if (!suggestion) return null;

  const onClick = () => {
    onItemSelected(suggestion);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onItemSelected(suggestion);
    }
  };

  return (
    <div className={className} onClick={onClick} onKeyDown={onKeyDown}>
      <Text>{itemNameSelector?.(suggestion) ?? (suggestion as string)}</Text>
    </div>
  );
}

export const AutoCompleteItem = memo(
  createComponent({
    id: 'AutoCompleteItem',
    baseElement: AutoCompleteItemBase,
  }),
) as typeof AutoCompleteItemBase;

function AutoCompleteContentBase<T = string>({
  suggestions,
  itemNameSelector,
  onItemSelected,
  className,
}: AutoCompleteContentProps<T>) {
  return (
    <Flex className={className} direction="column" gap="2">
      {suggestions.map((suggestion: T) => (
        <AutoCompleteItem
          key={itemNameSelector?.(suggestion) ?? (suggestion as string)}
          suggestion={suggestion}
          itemNameSelector={itemNameSelector}
          onItemSelected={onItemSelected}
        />
      ))}
    </Flex>
  );
}

export const AutoCompleteContent = createComponent<
  AutoCompleteContentProps,
  typeof AutoCompleteContentBase
>({
  id: 'AutoCompleteContent',
  baseElement: AutoCompleteContentBase,
});

export const AutoComplete = withNamespace(AutoCompleteRoot, {
  Item: AutoCompleteItem,
  Content: AutoCompleteContent,
});
