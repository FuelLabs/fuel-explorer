import { useIconProps } from '../../hooks/useIconProps';
import type { WithIconProps } from '../../hooks/useIconProps';
import { createComponent } from '../../utils/component';
import type { PropsOf, WithAsProps } from '../../utils/types';

import { styles } from './styles';

export type HeadingProps = Omit<WithIconProps, 'size'> &
  PropsOf<'h2'> &
  WithAsProps & {
    size?: '1' | '2' | '3' | '4' | '5' | '6';
  };

export const Heading = createComponent<HeadingProps, 'h2'>({
  id: 'Heading',
  baseElement: 'h2',
  render(
    _,
    {
      as: Root = 'h2',
      size = '2',
      className,
      iconColor = 'text-icon',
      ...props
    },
  ) {
    const { size: __, ...itemProps } = useIconProps({
      iconColor,
      ...props,
    } as WithIconProps);

    const classes = styles({
      className,
      withIcon: !!itemProps['data-icon'],
    });
    return <Root {...itemProps} className={classes} data-size={size} />;
  },
});
