import { Callout as RC } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type AlertProps = PropsOf<typeof RC.Root>;
export type AlertIconProps = PropsOf<typeof RC.Icon>;
export type AlertTextProps = PropsOf<typeof RC.Text>;

export const AlertRoot = createComponent<AlertProps, typeof RC.Root>({
  id: 'Alert',
  baseElement: RC.Root,
  defaultProps: {
    color: 'blue',
  },
});

export const AlertIcon = createComponent<AlertIconProps, typeof RC.Icon>({
  id: 'AlertIcon',
  baseElement: RC.Icon,
});

export const AlertText = createComponent<AlertTextProps, typeof RC.Text>({
  id: 'AlertText',
  baseElement: RC.Text,
});

export const Alert = withNamespace(AlertRoot, {
  Icon: AlertIcon,
  Text: AlertText,
});
