import type { BoxProps, FlexProps } from '../Box';
import type { InputFieldProps, InputProps } from '../Input';

// TODO:adjust createComponent to accept a generic type in the future

export type ComboBoxProps<T = string> = Pick<
  InputFieldProps,
  'onFocus' | 'onClick' | 'onBlur' | 'onKeyDown' | 'children'
> & {
  suggestions: Array<T>;
  debounce?: number;
  value: string | undefined;
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
  inputRef: React.Ref<HTMLInputElement>;
};
export type ComboBoxContentProps = FlexProps;
export type ComboBoxItemProps<T = string> = BoxProps &
  Pick<ComboBoxProps<T>, 'itemNameSelector'> & {
    suggestion: T | null;
    onItemSelected: (suggestion: T) => void;
  };

export type Context<T = string> = Pick<
  ComboBoxProps<T>,
  | 'onItemSelected'
  | 'itemNameSelector'
  | 'onFocus'
  | 'onClick'
  | 'onBlur'
  | 'onKeyDown'
> & {
  filteredSuggestions: Array<T>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
