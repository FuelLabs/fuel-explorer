import { useMemo } from 'react';

import { createComponent } from '../../utils/component';
import type { PropsOf, RadixColors } from '../../utils/types';

function getColor(color: string) {
  if (color === 'current') {
    return 'currentColor';
  }
  if (['brand', 'muted', 'secondary', 'icon'].includes(color)) {
    return `var(--color-${color})`;
  }
  return `var(--${color}-9)`;
}

export type SpinnerColor =
  | RadixColors
  | 'brand'
  | 'muted'
  | 'secondary'
  | 'icon'
  | 'current';

export type SpinnerProps = Omit<PropsOf<'svg'>, 'size' | 'color'> & {
  size?: number;
  color?: SpinnerColor;
};

export const Spinner = createComponent<SpinnerProps, 'svg'>({
  id: 'Spinner',
  render: (_, { size = 24, color = 'brand', ...props }) => {
    const radius = size * 0.4;
    const circumference = 2 * Math.PI * radius;
    const style = useMemo(
      () =>
        ({
          '--spinner-size': `${size}px`,
          '--spinner-circumference': `${circumference}px`,
          '--spinner-color': getColor(color),
        }) as React.CSSProperties,
      [size, color],
    );

    return (
      <svg {...props} style={style} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="fuel-Spinner__circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="fuel-Spinner__circle-animated"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </svg>
    );
  },
});
