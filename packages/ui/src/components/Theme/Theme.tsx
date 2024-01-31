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
  baseElement: RadixTheme,
  render: (
    Comp,
    {
      iconSize = INIT_ICON_SIZE,
      iconColor = INIT_ICON_COLOR,
      iconStroke = INIT_ICON_STROKE,
      ...props
    }
  ) => {
    return (
      <IconProvider
        value={{ size: iconSize, color: iconColor, stroke: iconStroke }}
      >
        <Comp {...props} />
      </IconProvider>
    );
  },
  defaultProps: {
    grayColor: 'slate',
    accentColor: 'grass',
    appearance: 'dark',
    radius: 'medium',
    panelBackground: 'translucent',
    scaling: '105%',
  },
});
