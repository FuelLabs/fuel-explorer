import * as TP from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { createComponent, withNamespace } from '~/utils/component';
import type { BaseProps, PropsOf } from '~/utils/types';

import type { ButtonCloseProps } from '../ButtonClose/ButtonClose';
import { ButtonClose } from '../ButtonClose/ButtonClose';
import type { Icon } from '../Icon/Icon';

const toastStyles = cva([], {
  variants: {
    variant: {
      base: 'fuel-Toast__base',
      success: 'fuel-Toast__success',
      warning: 'fuel-Toast__warning',
      info: 'fuel-Toast__info',
      error: 'fuel-Toast__error',
    },
    hasDescription: {
      true: 'fuel-Toast__hasDescription',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export type ToastProviderProps = PropsOf<typeof TP.Provider>;
export type ToastViewportProps = PropsOf<typeof TP.Viewport>;
export type ToastVariantProps = VariantProps<typeof toastStyles>;
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
});

export const ToastRoot = createComponent<ToastProps, typeof TP.Root>({
  id: 'Toast',
  baseElement: TP.Root,
  render: (Comp, { className, variant = 'base', hasDescription, ...props }) => {
    const classes = toastStyles({ variant, hasDescription, className });
    return <Comp {...props} className={classes} />;
  },
});

export const ToastAction = createComponent<ToastActionProps, typeof TP.Action>({
  id: 'ToastAction',
  baseElement: TP.Action,
});

export const ToastClose = createComponent<ToastCloseProps, typeof TP.Close>({
  id: 'ToastClose',
  baseElement: TP.Close,
  render: (Comp, props) => {
    return (
      <Comp>
        <ButtonClose {...props} />
      </Comp>
    );
  },
  defaultProps: {
    variant: 'link',
    color: 'gray',
  },
});

export const ToastTitle = createComponent<ToastTitleProps, typeof TP.Title>({
  id: 'ToastTitle',
  baseElement: TP.Title,
});

export const ToastDescription = createComponent<
  ToastDescriptionProps,
  typeof TP.Description
>({
  id: 'ToastDescription',
  baseElement: TP.Description,
});

export const Toast = withNamespace(ToastRoot, {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Action: ToastAction,
  Close: ToastClose,
  Title: ToastTitle,
  Description: ToastDescription,
});
