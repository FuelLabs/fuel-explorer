import { Button as RadixButton } from '@radix-ui/themes';

import type { WithIconProps } from '../../hooks/useIconProps';
import { useIconProps } from '../../hooks/useIconProps';
import type { WithVariants } from '../../hooks/useVariants';
import { useVariants } from '../../hooks/useVariants';
import { createPolymorphicComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { PropsOf, WithAsProps } from '../../utils/types';

type RadixButtonProps = PropsOf<typeof RadixButton>;
export type ButtonProps = WithVariants<RadixButtonProps> &
  WithIconProps &
  WithAsProps;

export const Button = createPolymorphicComponent<ButtonProps, 'button'>({
  id: 'Button',
  render: (_, { as: Root = 'button', asChild, ...props }) => {
    const { children, ...itemProps } = useIconProps(props);
    const variantProps = useVariants(props);
    const innerChildren = asChild ? children : <Root>{children}</Root>;

    return (
      <RadixButton
        asChild
        {...(itemProps as RadixButtonProps)}
        {...(variantProps as RadixButtonProps)}
        className={cx(
          variantProps.className,
          itemProps.className,
          !itemProps.disabled && !itemProps['aria-readonly']
            ? 'cursor-pointer'
            : '',
        )}
      >
        {innerChildren}
      </RadixButton>
    );
  },
  defaultProps: {
    size: '2',
    variant: 'solid',
  },
});
