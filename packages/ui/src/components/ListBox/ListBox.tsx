import clsx from 'clsx';
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

export interface ListBoxProps<T> extends ListBoxBaseProps {
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

type ListBoxContentProps = {
  className?: string;
};

type ListBoxBaseContextType<T> = {
  total: number;
  focused: number;
  setFocused: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (value: string) => void;
  render: (option: T) => React.ReactNode;
  options: ListBoxProps<T>['options'];
  selected: ListBoxProps<T>['selected'];
  getValue: (option: T, index: number) => string;
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

const ListBoxBaseContext = createContext<
  ListBoxBaseContextType<unknown> | undefined
>(undefined);

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
  onChange,
  onSelect,
  children,
  render,
  className,
}: ListBoxProps<T>) => {
  const [focused, setFocused] = useState(-1);
  const total = options.length;

  const TypedBaseListContext = ListBoxBaseContext as React.Context<
    ListBoxBaseContextType<T>
  >;
  return (
    <TypedBaseListContext.Provider
      value={{
        options,
        focused,
        setFocused,
        total,
        onSelect,
        selected,
        render,
        getValue,
      }}
    >
      <div className={className}>
        {filter && (
          <ListBoxInput
            options={options}
            getValue={getValue}
            onChange={onChange}
          />
        )}

        {children}
      </div>
    </TypedBaseListContext.Provider>
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

const ListBoxContent = createComponent<ListBoxContentProps, 'ol'>({
  id: 'ListBoxContent',
  render: (_, { className }) => {
    const baseCtx = useContext(ListBoxBaseContext);
    if (!baseCtx) {
      throw new Error("ListBoxContent must be used within ListBox's Root");
    }

    const { options, selected, render, total, getValue } = baseCtx;

    return (
      <ul
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: this component is a listbox
        role="listbox"
        tabIndex={-1}
        aria-multiselectable="false"
        className={clsx(
          'overflow-y-auto flex flex-col gap-2 px-[2px]',
          className,
        )}
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
            <div className="flex flex-1 items-center justify-center">
              <Text size="2" weight="medium" color="gray">
                No results found
              </Text>
            </div>
          )}
        </AnimatePresence>
      </ul>
    );
  },
});

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
  Content: ListBoxContent,
  Item: ListBoxItem,
  ItemIcon: ListBoxItemIcon,
});
