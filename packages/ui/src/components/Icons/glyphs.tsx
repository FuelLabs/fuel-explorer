import { forwardRef } from 'react';

import { INIT_ICON_STROKE } from '../Icon/constants';
import type { FuelIcon, FuelIconProps } from './fromLucide';

function glyph(name: string, d: string): FuelIcon {
  const Component = forwardRef<SVGSVGElement, FuelIconProps>(
    (
      { size = 24, stroke, strokeWidth, color = 'currentColor', ...props },
      ref,
    ) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        {...props}
      >
        <path
          d={d}
          stroke={color}
          strokeLinecap="square"
          strokeWidth={strokeWidth ?? (Number(stroke) || INIT_ICON_STROKE)}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    ),
  );
  Component.displayName = name;
  return Component as unknown as FuelIcon;
}

export const IconX = glyph(
  'IconX',
  'M2.771 2.77075L11.2293 11.2291M11.2293 2.77075L2.771 11.2291',
);

export const IconMenu = glyph(
  'IconMenu',
  'M1.604 4.22925H12.3957M1.604 9.77091H12.3957',
);
