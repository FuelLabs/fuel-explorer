import { Theme as RadixTheme } from '@radix-ui/themes';
import { createComponent } from '../../utils/component';
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

export const Theme = createComponent<ThemeProps, typeof RadixTheme>({
  id: 'Theme',
  render: (
    _,
    {
      iconSize = INIT_ICON_SIZE,
      iconColor = INIT_ICON_COLOR,
      iconStroke = INIT_ICON_STROKE,
      children,
      ...props
    },
  ) => {
    return (
      <RadixTheme {...props}>
        <IconProvider
          value={{ size: iconSize, color: iconColor, stroke: iconStroke }}
        >
          {children}
        </IconProvider>
      </RadixTheme>
    );
  },
  defaultProps: {
    grayColor: 'slate',
    accentColor: 'grass',
    radius: 'medium',
    panelBackground: 'translucent',
    scaling: '100%',
  },
});
