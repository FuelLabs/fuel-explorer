import type { TextProps } from '@radix-ui/themes';
import {
  type TransitionEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { IconChevronDown } from '../Icons';

import { createComponent, withNamespace } from '../../utils/component';
import { cx } from '../../utils/css';
import { Box } from '../Box';
import type { BoxProps } from '../Box';
import { Card } from '../Card';
import type { CardBodyProps, CardHeaderProps, CardProps } from '../Card';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

import type { WithIconProps } from '../../hooks/useIconProps';

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
            aria-label={opened ? 'Collapse' : 'Expand'}
            aria-expanded={opened}
            className={classes.icon()}
            icon={IconChevronDown}
          />
        )}
      </Root>
    );
  },
});

// Same duration as .fuel-collapsible-panel's close transition in feedback.css.
// Content stays mounted only long enough for that transition, then leaves the tree.
const COLLAPSE_UNMOUNT_MS = 280;

export const CollapsibleContent = createComponent<
  CollapsibleContentProps,
  typeof Card.Body
>({
  id: 'CollapsibleContent',
  baseElement: Card.Body,
  render: (Root, { children, className, ...props }) => {
    const { opened, variant } = useContext(ctx);
    const classes = styles({ variant });
    const [present, setPresent] = useState(opened);

    if (opened && !present) {
      setPresent(true);
    }

    useEffect(() => {
      if (opened || !present) return;
      const reduce = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      const delay = reduce ? 0 : COLLAPSE_UNMOUNT_MS;
      const timer = window.setTimeout(() => setPresent(false), delay);
      return () => window.clearTimeout(timer);
    }, [opened, present]);

    const onTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
      if (
        event.target !== event.currentTarget ||
        event.propertyName !== 'grid-template-rows' ||
        opened
      ) {
        return;
      }
      setPresent(false);
    };

    return (
      <div
        className="fuel-collapsible-panel"
        data-state={opened ? 'opened' : 'closed'}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="min-h-0 overflow-hidden">
          {present ? (
            <Root
              {...props}
              className={classes.content({ variant, className })}
            >
              {children}
            </Root>
          ) : null}
        </div>
      </div>
    );
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
    root: 'bg-transparent rounded-none py-[10px]',
    header:
      'group relative gap-4 cursor-pointer pr-9 flex flex-col justify-center tablet:items-center tablet:flex-row tablet:justify-start',
    icon: 'transition-transform duration-200 motion-reduce:transition-none group-data-[state=opened]:rotate-180 cursor-pointer absolute right-3 top-[50%] mt-[-12px]',
    content: 'mx-4 mb-2 border border-[var(--fuel-line)]',
    body: '',
    title: 'fuel-label flex items-center gap-2',
  },
  variants: {
    variant: {
      surface: {
        content: 'p-0 bg-transparent rounded-none',
        body: 'px-3 py-3',
        title: 'py-3 px-3 border-b border-[var(--fuel-line)]',
      },
      ghost: {
        content: 'p-3 rounded-none',
        body: 'pt-2',
      },
      classic: {},
    },
  },
  defaultVariants: {
    variant: 'surface',
  },
});
