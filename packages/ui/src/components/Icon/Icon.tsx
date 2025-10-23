import { createComponent } from '../../utils/component';
import { cx } from '../../utils/css';
import type { PropsOf } from '../../utils/types';

import { INIT_ICON_SIZE, INIT_ICON_STROKE } from './constants';
import type { IconComponent, IconContext } from './useIconContext';
import { useIconContext } from './useIconContext';

type SvgIconProps = Omit<PropsOf<'svg'>, 'size' | 'stroke'>;
export type IconBaseProps = Partial<IconContext> & { icon: IconComponent };
export type IconProps = IconBaseProps & SvgIconProps;

export const Icon = createComponent<IconProps, 'svg'>({
  id: 'Icon',
  baseElement: 'svg',
  render: (
    _,
    {
      className,
      color: initColor,
      size: initSize = INIT_ICON_SIZE,
      stroke: initStroke = INIT_ICON_STROKE,
      icon: IconComponent,
      ...props
    },
  ) => {
    const iconContext = useIconContext();
    const size = initSize || iconContext.size;
    const stroke = initStroke || iconContext.stroke;
    const color = initColor || iconContext.color;
    const itemProps = { ...props, size, stroke };
    const classes = cx(color, 'inline-flex items-center', className);
    return <IconComponent {...itemProps} className={classes} />;
  },
});
