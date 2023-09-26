'use client';
import type { BaseProps, InputFieldProps, InputProps } from '@fuels/ui';
import { Focus, Icon, IconButton, Tooltip, Input } from '@fuels/ui';
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
          value={value}
          onChange={handleChange}
        />
        {Boolean(value.length) && (
          <Input.Slot className="mx-1">
            <IconButton
              aria-label="Clear"
              icon={IconX}
              iconColor="text-icon"
              variant="link"
              onClick={handleClear}
            />
            <Tooltip content="Submit">
              <IconButton
                aria-label="Submit"
                icon={IconCheck}
                iconColor="text-brand"
                variant="link"
                onClick={handleSubmit}
              />
            </Tooltip>
          </Input.Slot>
        )}
      </Input>
    </Focus.ArrowNavigator>
  );
}

SearchInput.defaultProps = {
  placeholder: 'Search transactions...',
};
