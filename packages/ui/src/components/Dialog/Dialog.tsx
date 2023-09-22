import { DialogTitle, Dialog as RD } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type DialogProps = PropsOf<typeof RD.Root>;
export type DialogTriggerProps = PropsOf<typeof RD.Trigger>;
export type DialogTitleProps = PropsOf<typeof RD.Title>;
export type DialogContentProps = PropsOf<typeof RD.Content>;
export type DialogCloseProps = PropsOf<typeof RD.Close>;
export type DialogDescriptionProps = PropsOf<typeof RD.Description>;

export const DialogRoot = createComponent<DialogProps, typeof RD.Root>({
  id: 'Dialog',
  baseElement: RD.Root,
});

export const DialogTrigger = createComponent<
  DialogTriggerProps,
  typeof RD.Trigger
>({
  id: 'DialogTrigger',
  baseElement: RD.Trigger,
});

export const DialogContent = createComponent<
  DialogContentProps,
  typeof RD.Content
>({
  id: 'DialogContent',
  baseElement: RD.Content,
});

export const DialogClose = createComponent<DialogCloseProps, typeof RD.Close>({
  id: 'DialogClose',
  baseElement: RD.Close,
});

export const DialogDescription = createComponent<
  DialogDescriptionProps,
  typeof RD.Description
>({
  id: 'DialogDescription',
  baseElement: RD.Description,
});

export const Dialog = withNamespace(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Close: DialogClose,
  Description: DialogDescription,
  Title: DialogTitle,
});
