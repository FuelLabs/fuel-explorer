import type { TextProps } from '@radix-ui/themes/dist/cjs/components/text';
import { IconChevronDown } from '@tabler/icons-react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

import { createComponent, withNamespace } from '../../utils/component';
import { cx } from '../../utils/css';
import { Box } from '../Box';
import type { BoxProps } from '../Box';
import { Card } from '../Card';
import type { CardBodyProps, CardHeaderProps, CardProps } from '../Card';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

import { WithIconProps } from '../../hooks/useIconProps';

type CollapsibleBaseProps = VariantProps<typeof styles> & {
  defaultOpened?: boolean;
  opened?: boolean;
  onOpenChange?: (opened: boolean) => void;
};

type Context = CollapsibleBaseProps & {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  defaultOpened?: boolean;
  hideIcon?: boolean;
};

const ctx = createContext<Context>({} as Context);

export type CollapsibleProps = CollapsibleBaseProps &
  CardProps & { hideIcon?: boolean };
export type CollapsibleHeaderProps = CardHeaderProps;
export type CollapsibleContentProps = CardBodyProps;
export type CollapsibleTitleProps = TextProps & WithIconProps;
export type CollapsibleBodyProps = BoxProps;

export const CollapsibleRoot = createComponent<CollapsibleProps, typeof Card>({
  id: 'Collapsible',
  baseElement: Card,
  render: (
    Root,
    {
      children,
      className,
      defaultOpened,
      hideIcon,
      opened: initialOpened,
      onOpenChange,
      variant = 'surface',
      ...props
    },
  ) => {
    const classes = styles();
    const [opened, setOpened] = useState(
      Boolean(defaultOpened || initialOpened),
    );

    useEffect(() => {
      onOpenChange?.(opened);
    }, [opened, onOpenChange]);

    return (
      <ctx.Provider
        value={{ opened, setOpened, defaultOpened, variant, hideIcon }}
      >
        <Root
          {...props}
          className={cx(
            classes.root({ className }),
            hideIcon ? 'cursor-default' : '',
          )}
        >
          {children}
        </Root>
      </ctx.Provider>
    );
  },
});

export const CollapsibleHeader = createComponent<
  CollapsibleHeaderProps,
  typeof Card.Header
>({
  id: 'CollapsibleHeader',
  baseElement: Card.Header,
  render: (Root, { children, className, ...props }) => {
    const classes = styles();
    const { opened, setOpened, hideIcon } = useContext(ctx);
    return (
      <Root
        {...props}
        data-state={opened ? 'opened' : 'closed'}
        className={cx(
          classes.header({ className }),
          hideIcon ? 'cursor-default' : '',
        )}
        onClick={() => setOpened(!opened)}
      >
        {children}
        {!hideIcon && (
          <IconButton
            iconSize={20}
            iconColor="text-muted"
            variant="link"
            className={classes.icon()}
            icon={IconChevronDown}
          />
        )}
      </Root>
    );
  },
});

export const CollapsibleContent = createComponent<
  CollapsibleContentProps,
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
  className: ({ className }) => {
    const { variant } = useContext(ctx);
    return styles({ variant }).title({ className });
  },
});

export const CollapsibleBody = createComponent<
  CollapsibleBodyProps,
  typeof Box
>({
  id: 'CollapsibleBody',
  baseElement: Box,
  className: ({ className }) => {
    const { variant } = useContext(ctx);
    return styles({ variant }).body({ className });
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
    header:
      'group relative gap-4 cursor-pointer pr-9 flex flex-col justify-center tablet:items-center tablet:flex-row tablet:justify-start',
    icon: 'transition-transform group-data-[state=opened]:-rotate-180 cursor-pointer absolute right-3 top-[50%] mt-[-12px]',
    content: 'mx-4 mb-2 border border-gray-7',
    body: '',
    title: 'flex items-center gap-2 text-sm font-medium',
  },
  variants: {
    variant: {
      surface: {
        content: 'p-0 light-theme:bg-gray-2 dark-theme:bg-gray-1 rounded-sm',
        body: 'px-3 py-3',
        title: 'py-3 px-3 border-b border-gray-7',
      },
      ghost: {
        content: 'p-3 rounded-sm',
        body: 'pt-2',
      },
      classic: {},
    },
  },
  defaultVariants: {
    variant: 'surface',
  },
});
