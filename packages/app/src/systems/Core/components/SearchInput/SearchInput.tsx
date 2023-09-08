'use client';
import { cssObj } from '@fuel-ui/css';
import type { BaseProps, InputFieldProps, InputProps } from '@fuel-ui/react';
import { Box, Focus, Icon, IconButton, Input } from '@fuel-ui/react';
import { useRef, useState } from 'react';

type SearchInputProps = BaseProps<InputProps & InputFieldProps> & {
  onSubmit?: (value: string) => void;
  onClear?: () => void;
};

export function SearchInput({
  css,
  className,
  size = 'lg',
  value: initialValue = '',
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
      <Input size={size} css={{ ...styles.root, ...css }} className={className}>
        <Input.ElementLeft element={<Icon icon="Search" />} />
        <Input.Field
          {...props}
          ref={inputRef}
          onChange={handleChange}
          value={value}
        />
        {Boolean(value.length) && (
          <Input.ElementRight
            element={
              <Box.HStack css={styles.actions}>
                <IconButton
                  variant="link"
                  aria-label="Clear"
                  onClick={handleClear}
                  icon="X"
                />
                <IconButton
                  variant="link"
                  aria-label="Submit"
                  onClick={handleSubmit}
                  tooltip="Submit"
                  icon="Check"
                />
              </Box.HStack>
            }
          />
        )}
      </Input>
    </Focus.ArrowNavigator>
  );
}

SearchInput.defaultProps = {
  placeholder: 'Search transactions...',
};

const styles = {
  root: cssObj({
    '@lg': {
      minWidth: '350px',
    },
  }),
  actions: cssObj({
    '& .fuel_Icon-Check': {
      color: '$brand',
    },
  }),
};
