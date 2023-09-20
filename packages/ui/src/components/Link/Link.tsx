import { Link as RadixLink } from '@radix-ui/themes';
import { IconLink } from '@tabler/icons-react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { createComponent } from '~/utils/component';
import type { PropsOf } from '~/utils/types';

import { Icon } from '../Icon/Icon';

const link = cva([], {
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
  LinkVariantProps & {
    externalIcon?: React.ComponentType | null;
    iconSize?: number;
  };

export const Link = createComponent<LinkProps, typeof RadixLink>({
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
      ...props
    },
  ) => {
    const isExternal =
      initIsExternal ||
      props.href?.startsWith('http') ||
      props.target === '_blank';

    const classes = link({ isExternal, className });
    if (isExternal) {
      return (
        <span className="inline-flex items-center gap-2">
          <Comp {...props} className={classes}>
            {children}
          </Comp>
          {ExternalIcon && (
            <Icon icon={ExternalIcon} size={iconSize} className="text-icon" />
          )}
        </span>
      );
    }
    return (
      <Comp {...props} className={classes}>
        {children}
      </Comp>
    );
  },
});
