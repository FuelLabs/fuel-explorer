import * as TP from '@radix-ui/react-toast';
import type { VariantProps } from 'tailwind-variants';

import { createComponent, withNamespace } from '../../utils/component';
import type { BaseProps, PropsOf } from '../../utils/types';
import type { ButtonCloseProps } from '../ButtonClose/ButtonClose';
import { ButtonClose } from '../ButtonClose/ButtonClose';
import type { Icon } from '../Icon/Icon';
import type { IconButtonProps } from '../IconButton';

import { styles } from './styles';

export type ToastProviderProps = PropsOf<typeof TP.Provider>;
export type ToastViewportProps = PropsOf<typeof TP.Viewport>;
export type ToastVariantProps = VariantProps<typeof styles>;
export type ToastProps = BaseProps<ToastVariantProps & PropsOf<typeof TP.Root>>;
export type ToastActionProps = PropsOf<typeof TP.Action>;
export type ToastCloseProps = ButtonCloseProps & PropsOf<typeof TP.Close>;
export type ToastTitleProps = PropsOf<typeof TP.Title>;
export type ToastDescriptionProps = PropsOf<typeof TP.Description>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;
export type ToastIconElement = React.ReactElement<typeof Icon>;

export const ToastProvider = createComponent<
  ToastProviderProps,
  typeof TP.Provider
>({
  id: 'ToastProvider',
  baseElement: TP.Provider,
});

export const ToastViewport = createComponent<
  ToastViewportProps,
  typeof TP.Viewport
>({
  id: 'ToastViewport',
  baseElement: TP.Viewport,
  className: ({ className }) => styles().viewport({ className }),
});

export const ToastRoot = createComponent<ToastProps, typeof TP.Root>({
  id: 'Toast',
  baseElement: TP.Root,
  render: (Comp, { className, variant = 'base', hasDescription, ...props }) => {
    const classes = styles({ variant, hasDescription }).toast({ className });
    return <Comp {...props} className={classes} />;
  },
});

export const ToastAction = createComponent<ToastActionProps, typeof TP.Action>({
  id: 'ToastAction',
  baseElement: TP.Action,
  className: ({ className }) => styles().action({ className }),
});

export const ToastClose = createComponent<ToastCloseProps, typeof TP.Close>({
  id: 'ToastClose',
  baseElement: TP.Close,
  className: ({ className }) => styles().close({ className }),
  render: (Comp, props) => {
    return (
      <Comp asChild>
        <ButtonClose {...(props as IconButtonProps)} />
      </Comp>
    );
  },
  defaultProps: {
    className: 'rounded-full bg-gray-12 -top-2 rounded-full',
    variant: 'solid',
  },
});

export const ToastTitle = createComponent<ToastTitleProps, typeof TP.Title>({
  id: 'ToastTitle',
  baseElement: TP.Title,
  className: ({ className }) => styles().title({ className }),
});

export const ToastDescription = createComponent<
  ToastDescriptionProps,
  typeof TP.Description
>({
  id: 'ToastDescription',
  baseElement: TP.Description,
  className: ({ className }) => styles().description({ className }),
});

export const Toast = withNamespace(ToastRoot, {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Action: ToastAction,
  Close: ToastClose,
  Title: ToastTitle,
  Description: ToastDescription,
});
