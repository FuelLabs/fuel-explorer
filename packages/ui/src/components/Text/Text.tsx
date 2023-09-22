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

import { useIconProps, type WithIconProps } from '../../hooks/useIconProps';
import {
  createComponent,
  createPolymorphicComponent,
  withNamespace,
} from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

const styles = {
  root: tv({
    base: 'text-md',
    variants: {
      withIcon: {
        left: 'fuel-[Icon]:mr-2',
        right: 'fuel-[Icon]:ml-2',
        false: '',
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
      { className, leftIcon, rightIcon, iconColor = 'text-icon', ...props },
    ) => {
      const { children, ...itemProps } = useIconProps({
        leftIcon,
        rightIcon,
        iconColor,
        ...props,
      });
      const classes = styles.root({
        className,
        withIcon: leftIcon ? 'left' : rightIcon ? 'right' : false,
      });

      return (
        <Comp {...itemProps} className={classes}>
          {children}
        </Comp>
      );
    },
    defaultProps: {
      size: '3',
      as: 'span',
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
