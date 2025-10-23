import { IconX } from '@tabler/icons-react';

import { createComponent } from '../../utils/component';
import type { IconButtonProps } from '../IconButton/IconButton';
import { IconButton } from '../IconButton/IconButton';

export type ButtonCloseProps = Partial<IconButtonProps>;

export const ButtonClose = createComponent<ButtonCloseProps, typeof IconButton>(
  {
    id: 'ButtonClose',
    baseElement: IconButton,
    defaultProps: {
      'aria-label': 'Close',
      icon: IconX,
    },
  },
);
