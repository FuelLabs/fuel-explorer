import React, {
  useMemo,
  useState,
  useRef,
  memo,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useContext,
  createContext,
} from 'react';
import { createComponent, withNamespace } from '../../utils/component';
import { Flex } from '../Box';
import { Input } from '../Input';
import { Popover } from '../Popover';
import { Text } from '../Text';
import type {
  ComboBoxContentProps,
  ComboBoxItemProps,
  ComboBoxProps,
  Context,
} from './types';

const context = createContext<Context | undefined>(undefined);

const useComboBoxContext = () => {
  const data = useContext(context);
  if (!data) {
    throw new Error('ComboBox context is required');
  }
  return data;
};

const ComboBoxRoot = createComponent<ComboBoxProps, typeof Input>({
  id: 'ComboBox',
  render: (_, { children, ...props }) => {
    const {
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
    } = props as ComboBoxProps<string>;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [filteredSuggestions, setFilteredSuggestions] =
      useState<Array<string>>(suggestions);
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
        onChange?.(input);
        setFilteredSuggestions(
          !newFilteredSuggestions?.length && !input
            ? suggestions
            : newFilteredSuggestions,
        );
      }, debounce);
    };

    const handleSuggestionClick = (suggestion: string) => {
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
      onChange?.(value);
    };

    const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
      _onFocus?.(e);
      setIsPopoverOpen(true);
    };

    const onClick = (
      e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
    ) => {
      _onClick?.(e);
      setIsPopoverOpen(true);
    };

    const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
      _onBlur?.(e);
      if (strict && !itemSelected) {
        onChange?.(undefined);
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

    const providerData = useMemo<Context>(
      () => ({
        suggestions,
        itemNameSelector,
        onItemSelected,
        filteredSuggestions,
      }),
      [suggestions, itemNameSelector, onItemSelected],
    );

    return (
      <context.Provider value={providerData}>
        <Popover open={isPopoverOpen}>
          <Input>
            <Input.Field
              ref={inputRef}
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
            {children}
          </Popover.Content>
        </Popover>
      </context.Provider>
    );
  },
});

function ComboBoxItemBase<T = string>({
  onItemSelected,
  suggestion,
  itemNameSelector,
  className,
}: ComboBoxItemProps<T>) {
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

export const ComboBoxItem = memo(
  createComponent({
    id: 'ComboBoxItem',
    baseElement: ComboBoxItemBase,
  }),
) as typeof ComboBoxItemBase;

export const ComboBoxContent = createComponent<
  ComboBoxContentProps,
  typeof Flex
>({
  id: 'ComboBoxContent',
  render: (_, { className }) => {
    const { suggestions, itemNameSelector, onItemSelected } =
      useComboBoxContext();

    return (
      <Flex className={className} direction="column" gap="2">
        {suggestions.map((suggestion: string) => (
          <ComboBoxItem
            key={itemNameSelector?.(suggestion) ?? (suggestion as string)}
            suggestion={suggestion}
            itemNameSelector={itemNameSelector}
            onItemSelected={onItemSelected}
          />
        ))}
      </Flex>
    );
  },
});

export const ComboBox = withNamespace(
  ComboBoxRoot as (props: ComboBoxProps) => JSX.Element,
  {
    Item: ComboBoxItem,
    Content: ComboBoxContent as unknown as React.ComponentType<
      Pick<ComboBoxContentProps, 'className'>
    >,
  },
);
