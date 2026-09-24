import { forwardRef } from 'react';

import { INIT_ICON_STROKE } from '../Icon/constants';
import type { FuelIcon, FuelIconProps } from '../Icons/fromLucide';

// Outline GitHub mark from Tabler Icons (MIT).
const Github = forwardRef<SVGSVGElement, FuelIconProps>(
  (
    { size = 24, stroke, strokeWidth, color = 'currentColor', ...props },
    ref,
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth ?? (Number(stroke) || INIT_ICON_STROKE)}
      strokeLinecap="square"
      strokeLinejoin="miter"
      vectorEffect="non-scaling-stroke"
      {...props}
    >
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </svg>
  ),
);
Github.displayName = 'IconBrandGithub';

export const IconBrandGithub = Github as unknown as FuelIcon;
