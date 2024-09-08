import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
import { createComponent, withNamespace } from '../../utils/component';
import { Input, type InputProps } from '../Input';
import { Text } from '../Text';
import { icon, item } from './ListBox.styles';

type ListBoxBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type ListBoxItemVariant = 'idle' | 'selected' | 'focused';

export interface ListBoxProps<T> {
  filter?: boolean;
  options: T[];
  selected: string;
  getValue: (option: T, index: number) => string;
  render: (option: T) => React.ReactNode;
  onChange: InputProps['onChange'];
  onSelect: (value: string) => void;
}

interface ListBoxInputProps<T> {
  onChange: ListBoxProps<T>['onChange'];
  options: ListBoxProps<T>['options'];
  getValue: ListBoxProps<T>['getValue'];
}

type ListBoxBaseContextType = {
  total: number;
  focused: number;
  setFocused: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (value: string) => void;
};

type ListBoxItemContextType = {
  selected: string;
  value: string;
  index: number;
};

type ListBoxItemIconContextType = {
  variant: ListBoxItemVariant;
  index: number;
};

const ListBoxBaseContext = createContext<ListBoxBaseContextType | undefined>(
  undefined,
);

const ListBoxItemContext = createContext<ListBoxItemContextType | undefined>(
  undefined,
);

const ListBoxItemIconContext = createContext<
  ListBoxItemIconContextType | undefined
>(undefined);

const ListBoxRoot = <T,>({
  filter,
  options,
  selected,
  getValue,
  render,
  onChange,
  onSelect,
}: ListBoxProps<T>) => {
  const [focused, setFocused] = useState(-1);
  const total = options.length;

  return (
    <ListBoxBaseContext.Provider
      value={{ focused, setFocused, total, onSelect }}
    >
      <div>
        {filter && (
          <ListBoxInput
            options={options}
            getValue={getValue}
            onChange={onChange}
          />
        )}

        <ul
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: this component is a listbox
          role="listbox"
          tabIndex={-1}
          aria-multiselectable="false"
        >
          <AnimatePresence initial={false}>
            {options.map((option, index) => {
              const key = getValue(option, index);

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ListBoxItemContext.Provider
                    value={{ index, selected, value: key }}
                  >
                    {render(option)}
                  </ListBoxItemContext.Provider>
                </motion.div>
              );
            })}
            {total === 0 && (
              <div className="flex flex-col items-center justify-center p-4">
                <Text size="2" weight="medium" color="gray">
                  No results found
                </Text>
              </div>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </ListBoxBaseContext.Provider>
  );
};

const ListBoxInput = <T,>({
  options,
  getValue,
  onChange,
}: ListBoxInputProps<T>) => {
  const ctx = useContext(ListBoxBaseContext);

  if (!ctx) {
    throw new Error('ListBoxInput must be used within a ListBox');
  }

  const { total, setFocused, focused, onSelect } = ctx;

  return (
    <div className="mb-3">
      <Input
        placeholder="Search..."
        size="3"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setFocused(-1);
            e.preventDefault();
          }
          if (e.key === 'Enter') {
            onSelect(getValue(options[focused], focused));
            setFocused(-1);
          }
          if (e.key === 'ArrowUp') {
            setFocused((prev) => (prev - 1 <= -1 ? -1 : prev - 1));
            e.preventDefault();
          }
          if (e.key === 'ArrowDown') {
            setFocused((prev) => (prev >= total - 1 ? prev : prev + 1));
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          setFocused(-1);
          onChange?.(e);
        }}
      />
    </div>
  );
};

const ListBoxItem = createComponent<ListBoxBaseProps, 'li'>({
  id: 'ListBoxItem',
  render: (_, { children, className }) => {
    const baseCtx = useContext(ListBoxBaseContext);
    const ctx = useContext(ListBoxItemContext);

    const variant = useMemo<ListBoxItemVariant>(() => {
      if (ctx?.selected === ctx?.value) {
        return 'selected';
      }

      if (baseCtx?.focused === ctx?.index) {
        return 'focused';
      }

      return 'idle';
    }, [ctx?.selected, ctx?.value, ctx?.index, baseCtx?.focused]);

    if (!ctx || !baseCtx) {
      throw new Error('ListBoxItem must be used within a ListBoxItem');
    }

    const classes = item({
      className,
      variant,
    });

    return (
      <div className={ctx.index === 0 ? 'pt-0' : 'pt-4'}>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <li
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
          role="option"
          tabIndex={-1}
          aria-selected={variant === 'selected'}
          aria-disabled="false"
          onClick={() => baseCtx.onSelect(ctx.value)}
          className={classes}
        >
          <ListBoxItemIconContext.Provider
            value={{ index: ctx.index, variant }}
          >
            {children}
          </ListBoxItemIconContext.Provider>
        </li>
      </div>
    );
  },
});

const ListBoxItemIcon = createComponent<{}, 'div'>({
  id: 'ListBoxItemIcon',
  render: () => {
    const ctx = useContext(ListBoxItemIconContext);

    if (!ctx) {
      throw new Error('ListBoxItemIcon must be used within a ListBoxItem');
    }

    const classes = icon({ variant: ctx.variant });

    return (
      <Text as="span" size="2" weight="medium" className={classes}>
        {ctx.index + 1}
      </Text>
    );
  },
});

export const ListBox = withNamespace(ListBoxRoot, {
  Item: ListBoxItem,
  ItemIcon: ListBoxItemIcon,
});
