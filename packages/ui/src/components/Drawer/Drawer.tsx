import * as RD from '@radix-ui/react-dialog';

import {
  createComponent,
  createPolymorphicComponent,
  withNamespace,
} from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { Box } from '../Box';
import type { BoxProps } from '../Box';
import type { ButtonCloseProps } from '../ButtonClose/ButtonClose';
import { ButtonClose } from '../ButtonClose/ButtonClose';
import type { IconButtonProps } from '../IconButton';
import { Theme } from '../Theme';

import { styles } from './styles';

export type DrawerProps = PropsOf<typeof RD.Root>;
export type DrawerPortalProps = PropsOf<typeof RD.Portal>;
export type DrawerTriggerProps = PropsOf<typeof RD.Trigger>;
export type DrawerOverlayProps = PropsOf<typeof RD.Overlay>;
export type DrawerContentProps = PropsOf<typeof RD.Content> & {
  side?: 'left' | 'right' | 'top' | 'bottom';
};
export type DrawerCloseProps = PropsOf<typeof RD.Close>;
export type DrawerCloseIconProps = ButtonCloseProps;
export type DrawerTitleProps = PropsOf<typeof RD.Title>;
export type DrawerDescriptionProps = PropsOf<typeof RD.Description>;

export type DrawerHeaderProps = BoxProps;
export type DrawerBodyProps = BoxProps;
export type DrawerFooterProps = BoxProps;

export const DrawerRoot = createComponent<DrawerProps, typeof RD.Root>({
  id: 'Drawer',
  baseElement: RD.Root,
});

export const DrawerTrigger = createComponent<
  DrawerTriggerProps,
  typeof RD.Trigger
>({
  id: 'DrawerTrigger',
  baseElement: RD.Trigger,
  defaultProps: {
    asChild: true,
  },
});

export const DrawerPortal = createComponent<
  DrawerPortalProps,
  typeof RD.Portal
>({
  id: 'DrawerPortal',
  baseElement: RD.Portal,
});

export const DrawerOverlay = createComponent<
  DrawerOverlayProps,
  typeof RD.Overlay
>({
  id: 'DrawerOverlay',
  baseElement: RD.Overlay,
  className: ({ className }) => styles().overlay({ className }),
});

export const DrawerClose = createComponent<DrawerCloseProps, typeof RD.Close>({
  id: 'DrawerClose',
  baseElement: RD.Close,
  defaultProps: {
    asChild: true,
  },
});

export const DrawerCloseIcon = createComponent<
  DrawerCloseIconProps,
  typeof ButtonClose
>({
  id: 'DrawerCloseIcon',
  className: ({ className }) => styles().closeIcon({ className }),
  baseElement: ButtonClose,
  render: (Comp, props) => {
    return (
      <DrawerClose asChild>
        <Comp {...(props as IconButtonProps)} />
      </DrawerClose>
    );
  },
  defaultProps: {
    variant: 'link',
    color: 'gray',
  },
});

export const DrawerContent = createComponent<
  DrawerContentProps,
  typeof RD.Content
>({
  id: 'DrawerContent',
  baseElement: RD.Content,
  render: (Comp, { className, children, side = 'right', ...props }) => {
    const classes = styles({ side });
    return (
      <DrawerPortal>
        <Theme>
          <DrawerOverlay />
          <Comp {...props} className={classes.content({ className })}>
            {children}
            <DrawerCloseIcon />
          </Comp>
        </Theme>
      </DrawerPortal>
    );
  },
});

export const DrawerDescription = createComponent<
  DrawerDescriptionProps,
  typeof RD.Description
>({
  id: 'DrawerDescription',
  baseElement: RD.Description,
  className: ({ className }) => styles().description({ className }),
});

export const DrawerTitle = createComponent<DrawerTitleProps, typeof RD.Title>({
  id: 'DrawerTitle',
  baseElement: RD.Title,
  className: ({ className }) => styles().title({ className }),
});

export const DrawerHeader = createPolymorphicComponent<
  DrawerHeaderProps,
  typeof Box
>({
  id: 'DrawerHeader',
  baseElement: Box,
  className: ({ className }) => styles().header({ className }),
  defaultProps: {
    as: 'header',
  },
});

export const DrawerBody = createPolymorphicComponent<
  DrawerBodyProps,
  typeof Box
>({
  id: 'DrawerBody',
  baseElement: Box,
  className: ({ className }) => styles().body({ className }),
});

export const DrawerFooter = createPolymorphicComponent<
  DrawerFooterProps,
  typeof Box
>({
  id: 'DrawerFooter',
  baseElement: Box,
  className: ({ className }) => styles().footer({ className }),
  defaultProps: {
    as: 'header',
  },
});

export const Drawer = withNamespace(DrawerRoot, {
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  CloseIcon: DrawerCloseIcon,
  Content: DrawerContent,
  Header: DrawerHeader,
  Description: DrawerDescription,
  Title: DrawerTitle,
  Body: DrawerBody,
  Footer: DrawerFooter,
});
