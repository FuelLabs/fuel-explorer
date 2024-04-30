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
import { type BoxProps, Flex, type FlexProps } from '../Box';
import { Input, type InputFieldProps, type InputProps } from '../Input';
import { Popover } from '../Popover';
import { Text } from '../Text';

export type ComboBoxProps<T = string> = Pick<
  InputFieldProps,
  'onFocus' | 'onClick' | 'onBlur' | 'onKeyDown' | 'children'
> & {
  suggestions: Array<T>;
  debounce?: number;
  value?: string | undefined;
  onChange?: (value: string | undefined) => void;
  suggestionFilter?: (suggestion: T) => boolean;
  itemNameSelector?: (suggestion: T) => string;
  onItemSelected: (suggestion: T) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  /**
   * @description If true, input can only be a value from the ComboBox list
   */
  strict?: boolean;
};

export type ComboBoxInputProps = InputProps;
export type ComboBoxInputFieldProps = InputFieldProps & {
  ref: React.Ref<HTMLInputElement>;
};
export type ComboBoxContentProps = FlexProps;
export type ComboBoxItemProps<T = string> = BoxProps &
  Pick<ComboBoxProps<T>, 'itemNameSelector'> & {
    suggestion: T | null;
    onItemSelected: (suggestion: T) => void;
  };

export type Context<T = string> = Pick<
  ComboBoxProps<T>,
  'itemNameSelector' | 'onFocus' | 'onClick' | 'onBlur' | 'onKeyDown'
> & {
  filteredSuggestions: Array<T>;
  handleSuggestionClick: (suggestion: T) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const context = createContext<Context | undefined>(undefined);

function useComboBoxContext() {
  const data = useContext<Context | undefined>(context);
  if (!data) {
    throw new Error('ComboBox context is required');
  }
  return data;
}

const ComboBoxRoot = createComponent<ComboBoxProps, typeof Input>({
  id: 'ComboBox',
  render: (_, { children, ...props }) => {
    const {
      suggestions,
      strict,
      debounce = 300,
      suggestionFilter,
      itemNameSelector,
      onChange: _onChange,
      onBlur: _onBlur,
      onClick: _onClick,
      onFocus: _onFocus,
      onKeyDown: _onKeyDown,
      value,
      onItemSelected,
      inputRef,
    } = props as ComboBoxProps<string>;

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] =
      useState<Array<string>>(suggestions);
    const debounceTimeout = useRef<NodeJS.Timeout>();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        _onChange?.(input);
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
      _onChange?.(value);
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
        _onChange?.(undefined);
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
        itemNameSelector,
        handleSuggestionClick,
        filteredSuggestions,
        onChange,
        onFocus,
        onClick,
        onBlur,
        onKeyDown,
      }),
      [filteredSuggestions, itemNameSelector, onItemSelected],
    );

    return (
      <context.Provider value={providerData}>
        <Popover open={isPopoverOpen}>{children}</Popover>
      </context.Provider>
    );
  },
});

export const ComboBoxInput = createComponent<ComboBoxInputProps, typeof Input>({
  id: 'ComboBoxInput',
  baseElement: Input,
});

export const ComboBoxInputField = createComponent<
  ComboBoxInputFieldProps,
  typeof Input.Field
>({
  id: 'ComboBoxInputField',
  render: (_, { ref, ...props }) => {
    const { onChange, onFocus, onClick, onBlur, onKeyDown } =
      useComboBoxContext();

    return (
      <Input.Field
        ref={ref}
        onChange={onChange}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        {...props}
      />
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
  render: (_, { className, style, ...props }) => {
    const { filteredSuggestions, itemNameSelector, handleSuggestionClick } =
      useComboBoxContext();

    return (
      <>
        {/* Popover uses the trigger's position and container to determine the position and size of the content window. */}
        <Popover.Trigger>
          <div />
        </Popover.Trigger>
        <Popover.Content
          // Goes against accessibility rules but otherwise we'd be constantly losing focus on the input
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Flex
            className={className}
            direction="column"
            gap="2"
            style={style}
            {...props}
          >
            {filteredSuggestions.map((suggestion: string) => (
              <ComboBoxItem
                key={itemNameSelector?.(suggestion) ?? (suggestion as string)}
                suggestion={suggestion}
                itemNameSelector={itemNameSelector}
                onItemSelected={handleSuggestionClick}
              />
            ))}
          </Flex>
        </Popover.Content>
      </>
    );
  },
});

export const ComboBox = withNamespace(
  ComboBoxRoot as <T = string>(props: ComboBoxProps<T>) => JSX.Element,
  {
    Item: ComboBoxItem,
    Content: ComboBoxContent,
    Input: ComboBoxInput,
    InputField: ComboBoxInputField,
  },
);
