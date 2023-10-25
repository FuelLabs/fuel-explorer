import type { TextProps } from '@radix-ui/themes/dist/cjs/components/text';
import { IconChevronDown } from '@tabler/icons-react';
import { createContext, useContext, useState } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { createComponent, withNamespace } from '../../utils/component';
import { Box, HStack } from '../Box';
import type { BoxProps } from '../Box';
import { Card } from '../Card';
import type { CardProps, CardHeaderProps, CardBodyProps } from '../Card';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

type CollapsibleBaseProps = VariantProps<typeof styles> & {
  defaultOpened?: boolean;
};

type Context = CollapsibleBaseProps & {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  defaultOpened?: boolean;
};

const ctx = createContext<Context>({} as Context);

export type CollapsibleProps = CollapsibleBaseProps & CardProps;
export type CollapsibleHeaderProps = CardHeaderProps;
export type CollapsibleContentProps = CardBodyProps;
export type CollapsibleTitleProps = TextProps;
export type CollapsibleBodyProps = BoxProps;

export const CollapsibleRoot = createComponent<CollapsibleProps, typeof Card>({
  id: 'Collapsible',
  baseElement: Card,
  render: (
    Root,
    { children, className, defaultOpened, variant = 'surface', ...props },
  ) => {
    const classes = styles();
    const [opened, setOpened] = useState(Boolean(defaultOpened));
    return (
      <ctx.Provider value={{ opened, setOpened, defaultOpened, variant }}>
        <Root {...props} className={classes.root({ className })}>
          {children}
        </Root>
      </ctx.Provider>
    );
  },
});

export const CollapsibleHeader = createComponent<
  CardHeaderProps,
  typeof Card.Header
>({
  id: 'CollapsibleHeader',
  baseElement: Card.Header,
  render: (Root, { children, className, ...props }) => {
    const classes = styles();
    const { opened, setOpened } = useContext(ctx);
    return (
      <Root
        {...props}
        className={classes.header({ className })}
        data-state={opened ? 'opened' : 'closed'}
      >
        <HStack align="center">{children}</HStack>
        <IconButton
          iconSize={20}
          iconColor="text-muted"
          variant="link"
          className={classes.icon()}
          icon={IconChevronDown}
          onClick={() => setOpened(!opened)}
        />
      </Root>
    );
  },
});

export const CollapsibleContent = createComponent<
  CardBodyProps,
  typeof Card.Body
>({
  id: 'CollapsibleContent',
  baseElement: Card.Body,
  render: (Root, { children, className, ...props }) => {
    const { opened, variant } = useContext(ctx);
    const classes = styles({ variant });
    return opened ? (
      <Root {...props} className={classes.content({ variant, className })}>
        {children}
      </Root>
    ) : null;
  },
});

export const CollapsibleTitle = createComponent<
  CollapsibleTitleProps,
  typeof Text
>({
  id: 'CollapsibleTitle',
  baseElement: Text,
  className: () => {
    const { variant } = useContext(ctx);
    return styles({ variant }).title();
  },
});

export const CollapsibleBody = createComponent<
  CollapsibleBodyProps,
  typeof Box
>({
  id: 'CollapsibleBody',
  baseElement: Box,
  className: () => {
    const { variant } = useContext(ctx);
    return styles({ variant }).body();
  },
});

export const Collapsible = withNamespace(CollapsibleRoot, {
  Header: CollapsibleHeader,
  Content: CollapsibleContent,
  Title: CollapsibleTitle,
  Body: CollapsibleBody,
});

const styles = tv({
  slots: {
    root: 'py-[10px]',
    header: 'group grid grid-cols-[1fr_auto] grid-rows-1 gap-4 items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:-rotate-180 group-data-[state=opened]:-rotate-180',
    content: 'mx-4 mb-2 border border-border',
    body: '',
    title: 'flex items-center gap-2 text-sm font-medium text-secondary',
  },
  variants: {
    variant: {
      surface: {
        content: 'p-0 bg-gray-3 rounded-sm',
        body: 'px-3 py-3',
        title: 'py-3 px-3 border-b border-border',
      },
      ghost: {
        content: 'p-3 rounded-sm',
        body: 'pt-2',
      },
    },
  },
  defaultVariants: {
    variant: 'surface',
  },
});
