import { Theme as RadixTheme } from '@radix-ui/themes';
import type { Colors, PropsOf } from '../../utils/types';
import {
  INIT_ICON_COLOR,
  INIT_ICON_SIZE,
  INIT_ICON_STROKE,
} from '../Icon/constants';
import { IconProvider } from '../Icon/useIconContext';

export type ThemeProps = PropsOf<typeof RadixTheme> & {
  iconSize?: number;
  iconStroke?: number;
  iconColor?: Colors;
};

const defaultProps = {
  grayColor: 'slate',
  accentColor: 'grass',
  appearance: 'dark',
  radius: 'medium',
  panelBackground: 'translucent',
  scaling: '105%',
  iconSize: INIT_ICON_SIZE,
  iconColor: INIT_ICON_COLOR,
  iconStroke: INIT_ICON_STROKE,
};

export const Theme = (themeProps: ThemeProps) => {
  const { iconSize, iconColor, iconStroke, children, ...props } = Object.assign(
    defaultProps,
    themeProps,
  );
  return (
    <RadixTheme>
      <IconProvider
        value={{ size: iconSize, color: iconColor, stroke: iconStroke }}
        {...props}
      >
        {children}
      </IconProvider>
    </RadixTheme>
  );
};
