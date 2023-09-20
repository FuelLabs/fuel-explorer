'use client';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import { Focus } from 'pn-ui-primitives/Focus';
import { Icon } from 'pn-ui-primitives/Icon';
import { IconButton } from 'pn-ui-primitives/IconButton';
import {
  Input,
  type InputFieldProps,
  type InputProps,
} from 'pn-ui-primitives/Input';
import type { BaseProps } from 'pn-ui-primitives/dist/utils/types';
import { useRef, useState } from 'react';

import { cx } from '../../utils/cx';

type SearchInputProps = BaseProps<InputProps & InputFieldProps> & {
  onSubmit?: (value: string) => void;
  onClear?: () => void;
};

export function SearchInput({
  value: initialValue = '',
  className,
  onSubmit,
  onClear,
  autoFocus,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState<string>(initialValue as string);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSubmit() {
    onSubmit?.(value);
  }

  function handleClear() {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  }

  return (
    <Focus.ArrowNavigator autoFocus={autoFocus}>
      <Input className={cx(className)} radius="large" size="3">
        <Input.Slot className="ml-4 mr-4">
          <Icon icon={IconSearch} size={16} />
        </Input.Slot>
        <Input.Field
          {...props}
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
        {Boolean(value.length) && (
          <Input.Slot className="mr-4">
            <IconButton
              variant="link"
              aria-label="Clear"
              onClick={handleClear}
              iconColor="text-icon"
              icon={IconX}
            />
            <IconButton
              variant="link"
              aria-label="Submit"
              onClick={handleSubmit}
              tooltip="Submit"
              iconColor="text-brand"
              icon={IconCheck}
            />
          </Input.Slot>
        )}
      </Input>
    </Focus.ArrowNavigator>
  );
}

SearchInput.defaultProps = {
  placeholder: 'Search transactions...',
};
