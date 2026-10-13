import type { LucideIcon, LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

import { INIT_ICON_STROKE } from '../Icon/constants';

// `stroke` is the line width, as <Icon> passes it; Lucide calls it `strokeWidth`.
export type FuelIconProps = Omit<LucideProps, 'stroke'> & {
  stroke?: number;
};

// A plain function type: forwardRef's propTypes fail the ComponentType icon slots.
export type FuelIcon = (
  props: FuelIconProps & React.RefAttributes<SVGSVGElement>,
) => React.ReactElement | null;

export function fromLucide(Lucide: LucideIcon, name: string): FuelIcon {
  const Component = forwardRef<SVGSVGElement, FuelIconProps>(
    ({ stroke, strokeWidth, ...props }, ref) => (
      <Lucide
        ref={ref}
        strokeWidth={strokeWidth ?? (Number(stroke) || INIT_ICON_STROKE)}
        strokeLinecap="square"
        strokeLinejoin="miter"
        absoluteStrokeWidth
        {...props}
      />
    ),
  );
  Component.displayName = name;
  return Component as unknown as FuelIcon;
}
