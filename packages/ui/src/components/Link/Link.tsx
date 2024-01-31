import { Link as RadixLink } from '@radix-ui/themes';
import { IconLink } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import type { VariantProps } from 'tailwind-variants';

import { createPolymorphicComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';
import { Icon } from '../Icon/Icon';

const link = tv({
  variants: {
    isExternal: {
      true: 'inline-flex items-center gap-2',
    },
  },
  defaultVariants: {
    isExternal: false,
  },
});

export type LinkVariantProps = VariantProps<typeof link>;
export type LinkProps = PropsOf<typeof RadixLink> &
  WithAsProps &
  LinkVariantProps & {
    externalIcon?: React.ComponentType | null;
    iconSize?: number;
  };

export const Link = createPolymorphicComponent<LinkProps, typeof RadixLink>({
  id: 'Link',
  baseElement: RadixLink,
  render: (
    Comp,
    {
      as: Root = 'a',
      asChild,
      children,
      className,
      isExternal: initIsExternal,
      externalIcon: ExternalIcon = IconLink,
      iconSize = 18,
      ...props
    }
  ) => {
    const isExternal =
      initIsExternal ||
      props.href?.startsWith('http') ||
      props.target === '_blank';

    const classes = link({ isExternal, className });
    const innerChildren = asChild ? children : <Root>{children}</Root>;

    if (isExternal) {
      return (
        <span className="inline-flex items-center gap-1">
          <Comp {...props} asChild className={classes}>
            {innerChildren}
          </Comp>
          {ExternalIcon && (
            <Icon className="text-icon" icon={ExternalIcon} size={iconSize} />
          )}
        </span>
      );
    }
    return (
      <Comp {...props} asChild className={classes}>
        {innerChildren}
      </Comp>
    );
  },
});
