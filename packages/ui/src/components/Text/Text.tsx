import {
  Blockquote as RadixBlockquote,
  Code as RadixCode,
  Em as RadixEm,
  Kbd as RadixKbd,
  Quote as RadixQuote,
  Strong as RadixStrong,
  Text as RadixText,
} from '@radix-ui/themes';
import { tv } from 'tailwind-variants';

import { useIconProps } from '../../hooks/useIconProps';
import type { WithIconProps } from '../../hooks/useIconProps';
import {
  createComponent,
  createPolymorphicComponent,
  withNamespace,
} from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

const styles = {
  root: tv({
    variants: {
      withIcon: {
        true: 'flex items-center gap-1',
      },
    },
    defaultVariants: {
      withIcon: false,
    },
  }),
};

export type BlockquoteProps = PropsOf<typeof RadixBlockquote>;
export const Blockquote = createComponent<
  BlockquoteProps,
  typeof RadixBlockquote
>({
  id: 'Blockquote',
  baseElement: RadixBlockquote,
});

export type CodeProps = PropsOf<typeof RadixCode>;
export const Code = createComponent<CodeProps, typeof RadixCode>({
  id: 'Code',
  baseElement: RadixCode,
});

export type EmProps = PropsOf<typeof RadixEm>;
export const Em = createComponent<EmProps, typeof RadixEm>({
  id: 'Em',
  baseElement: RadixEm,
});

export type KbdProps = PropsOf<typeof RadixKbd>;
export const Kbd = createComponent<KbdProps, typeof RadixKbd>({
  id: 'Kbd',
  baseElement: RadixKbd,
});

export type QuoteProps = PropsOf<typeof RadixQuote>;
export const Quote = createComponent<QuoteProps, typeof RadixQuote>({
  id: 'Quote',
  baseElement: RadixQuote,
});

export type StrongProps = PropsOf<typeof RadixStrong>;
export const Strong = createComponent<StrongProps, typeof RadixStrong>({
  id: 'Strong',
  baseElement: RadixStrong,
});

export type TextProps = WithAsProps &
  WithIconProps &
  Omit<PropsOf<typeof RadixText>, 'as' | 'asChild'>;

export const TextBase = createPolymorphicComponent<TextProps, typeof RadixText>(
  {
    id: 'Text',
    baseElement: RadixText,
    render: (
      Comp,
      {
        as: Root = 'span',
        asChild,
        size = '3',
        className,
        leftIcon,
        rightIcon,
        iconColor = 'text-icon',
        ...props
      },
    ) => {
      const { children, ...itemProps } = useIconProps({
        size,
        leftIcon,
        rightIcon,
        iconColor,
        ...props,
      });

      const classes = styles.root({
        className,
        withIcon: Boolean(leftIcon || rightIcon),
      });

      const innerChildren = asChild ? children : <Root>{children}</Root>;
      return (
        <Comp {...itemProps} asChild className={classes}>
          {innerChildren}
        </Comp>
      );
    },
  },
);

export const Text = withNamespace(TextBase, {
  Blockquote,
  Code,
  Em,
  Kbd,
  Quote,
  Strong,
});
