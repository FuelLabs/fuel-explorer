'use client';
import { Focus } from '@fuel-explorer/ui/Focus';
import { Icon } from '@fuel-explorer/ui/Icon';
import { IconButton } from '@fuel-explorer/ui/IconButton';
import {
  Input,
  type InputFieldProps,
  type InputProps,
} from '@fuel-explorer/ui/Input';
import type { BaseProps } from '@fuel-explorer/ui/types';
import { IconCheck, IconSearch, IconX } from '@tabler/icons-react';
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
        <Input.Slot className="mx-1">
          <Icon icon={IconSearch} size={16} />
        </Input.Slot>
        <Input.Field
          {...props}
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
        {Boolean(value.length) && (
          <Input.Slot className="mx-1">
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
