import { type BoxProps, type VStackProps } from '../Box';
import type { InputFieldProps } from '../Input';

// TODO:adjust createComponent to accept a generic type in the future

export type ComboBoxProps<T = string> = Exclude<
  InputFieldProps,
  'onChange' | 'value'
> & {
  suggestions: Array<T>;
  debounce?: number;
  value: string | undefined;
  onChange?: (value: string | undefined) => void;
  suggestionFilter?: (suggestion: T) => boolean;
  itemNameSelector?: (suggestion: T) => string;
  onItemSelected: (suggestion: T) => void;
  /**
   * @description If true, input can only be a value from the ComboBox list
   */
  strict?: boolean;
};

export type ComboBoxContentProps = VStackProps;
export type ComboBoxItemProps<T = string> = BoxProps &
  Pick<ComboBoxProps<T>, 'itemNameSelector'> & {
    suggestion: T | null;
    onItemSelected: (suggestion: T) => void;
  };

export type Context<T = string> = Pick<
  ComboBoxProps<T>,
  'suggestions' | 'onItemSelected' | 'itemNameSelector'
> & { filteredSuggestions: Array<T> };
