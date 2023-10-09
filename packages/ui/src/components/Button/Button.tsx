import { Button as RadixButton } from '@radix-ui/themes';

import type { WithIconProps } from '../../hooks/useIconProps';
import { useIconProps } from '../../hooks/useIconProps';
import type { WithVariants } from '../../hooks/useVariants';
import { useVariants } from '../../hooks/useVariants';
import { createComponent } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

type RadixButtonProps = PropsOf<typeof RadixButton>;
export type ButtonProps = WithVariants<RadixButtonProps> & WithIconProps;

export const Button = createComponent<ButtonProps, 'button'>({
  id: 'Button',
  render: (_, props) => {
    const itemProps = useIconProps(props);
    const variantProps = useVariants(props);
    return (
      <RadixButton
        {...(itemProps as RadixButtonProps)}
        {...(variantProps as RadixButtonProps)}
      />
    );
  },
  defaultProps: {
    size: '2',
    variant: 'solid',
  },
});
