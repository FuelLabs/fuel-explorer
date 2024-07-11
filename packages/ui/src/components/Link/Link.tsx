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
      children,
      className,
      isExternal: initIsExternal,
      externalIcon: ExternalIcon = IconLink,
      iconSize = 18,
      href = '',
      ...props
    },
  ) => {
    const isExternal =
      initIsExternal ?? (href.startsWith('http') || props.target === '_blank');
    const target = props.target ?? (isExternal ? '_blank' : undefined);

    const classes = link({ isExternal, className });

    return (
      <Comp {...props} className={classes} href={href} target={target}>
        <>
          {children}
          {isExternal && ExternalIcon && (
            <Icon
              className="text-inherit"
              icon={ExternalIcon}
              size={iconSize}
            />
          )}
        </>
      </Comp>
    );
  },
});
