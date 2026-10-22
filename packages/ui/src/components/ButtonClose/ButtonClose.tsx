import { useTranslation } from 'react-i18next';
import { IconX } from '../Icons';

import { createComponent } from '../../utils/component';
import type { IconButtonProps } from '../IconButton/IconButton';
import { IconButton } from '../IconButton/IconButton';

export type ButtonCloseProps = Partial<IconButtonProps>;

export const ButtonClose = createComponent<ButtonCloseProps, typeof IconButton>(
  {
    id: 'ButtonClose',
    render: (_, props) => {
      const { t } = useTranslation();
      return (
        <IconButton
          {...(props as IconButtonProps)}
          aria-label={
            props['aria-label'] ?? t('ui.close', { defaultValue: 'Close' })
          }
          icon={props.icon ?? IconX}
        />
      );
    },
  },
);
