import { Tabs as RT } from '@radix-ui/themes';
import { createContext, useContext } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { useIconProps } from '../../hooks/useIconProps';
import type { WithIconProps } from '../../hooks/useIconProps';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type TabsVariantProps = VariantProps<typeof styles>;
export type TabsProps = PropsOf<typeof RT.Root> &
  TabsVariantProps & {
    defaultValue: string;
  };

export type TabsListProps = PropsOf<typeof RT.List>;
export type TabsTriggerProps = PropsOf<typeof RT.Trigger> &
  WithIconProps & {
    value: string;
  };

export type TabsContentProps = PropsOf<typeof RT.Content> & { value: string };

const ctx = createContext<TabsVariantProps>({} as TabsVariantProps);

export const TabsRoot = createComponent<TabsProps, typeof RT.Root>({
  id: 'Tabs',
  baseElement: RT.Root,
  render: (
    Root,
    { children, className, size = '1', variant = 'line', ...props },
  ) => {
    const classes = styles({ size, variant });
    return (
      <ctx.Provider value={{ size, variant }}>
        <Root className={classes.root({ className })} {...props}>
          {children}
        </Root>
      </ctx.Provider>
    );
  },
});

export const TabsList = createComponent<TabsListProps, typeof RT.List>({
  id: 'TabsList',
  baseElement: RT.List,
  className: ({ className }) => {
    const { size, variant } = useContext(ctx);
    return styles({ size, variant }).list({ className });
  },
});

export const TabsTrigger = createComponent<TabsTriggerProps, 'button'>({
  id: 'TabsTrigger',
  render: (_, { className, ...props }) => {
    const { size, variant } = useContext(ctx);
    const classes = styles({ size, variant });
    const itemProps = useIconProps({ size, ...props });
    return (
      <RT.Trigger
        className={classes.trigger({ size, variant, className })}
        {...itemProps}
      />
    );
  },
});

export const TabsContent = createComponent<TabsContentProps, typeof RT.Content>(
  {
    id: 'TabsContent',
    baseElement: RT.Content,
    className: ({ className }) => {
      const { size, variant } = useContext(ctx);
      return styles({ size, variant }).content({ className });
    },
  },
);

export const Tabs = withNamespace(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

const styles = tv({
  slots: {
    root: ['flex flex-col gap-4'],
    list: ['shrink-0 flex'],
    trigger: ['flex items-center justify-center'],
    content: ['grow'],
  },
  variants: {
    variant: {
      surface: {
        trigger: [
          'bg-transparent',
          'transition-colors',
          'fuel-[Icon]:mr-2',
          'fuel-[Icon]:mt-0.5',
          'disabled:opacity-50',
        ],
      },
      line: {
        list: ['border-b border-border'],
        trigger: [
          'transition-colors',
          'fuel-[Icon]:mr-2',
          'disabled:opacity-50',
        ],
      },
    },
    size: {
      '1': {
        list: 'gap-3',
        trigger: 'gap-2',
      },
      '2': {
        list: 'gap-4',
        trigger: 'gap-3',
      },
      '3': {
        list: 'gap-4',
        trigger: 'gap-4',
      },
    },
  },
  compoundVariants: [
    {
      variant: 'surface',
      size: '1',
      class: {
        trigger: ['text-sm'],
      },
    },
    {
      variant: 'surface',
      size: '2',
      class: {
        trigger: ['text-md'],
      },
    },
    {
      variant: 'surface',
      size: '3',
      class: {
        trigger: ['text-lg'],
      },
    },
    {
      variant: 'line',
      size: '1',
      class: {
        trigger: ['text-sm'],
      },
    },
    {
      variant: 'line',
      size: '2',
      class: {
        trigger: ['text-md'],
      },
    },
    {
      variant: 'line',
      size: '3',
      class: {
        trigger: ['text-lg'],
      },
    },
  ],
  defaultVariants: {
    variant: 'line',
    size: '1',
  },
});
