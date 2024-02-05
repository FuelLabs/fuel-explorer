import { AlertDialog as RAD } from '@radix-ui/themes';

import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';

export type AlertDialogProps = PropsOf<typeof RAD.Root>;
export type AlertDialogTriggerProps = PropsOf<typeof RAD.Trigger>;
export type AlertDialogContentProps = PropsOf<typeof RAD.Content>;
export type AlertDialogTitleProps = PropsOf<typeof RAD.Title>;
export type AlertDialogDescriptionProps = PropsOf<typeof RAD.Description>;
export type AlertDialogActionProps = PropsOf<typeof RAD.Action>;
export type AlertDialogCancelProps = PropsOf<typeof RAD.Cancel>;

export const AlertDialogRoot = createComponent<
  AlertDialogProps,
  typeof RAD.Root
>({
  id: 'AlertDialog',
  baseElement: RAD.Root,
});

export const AlertDialogTrigger = createComponent<
  AlertDialogTriggerProps,
  typeof RAD.Trigger
>({
  id: 'AlertDialogTrigger',
  baseElement: RAD.Trigger,
});

export const AlertDialogContent = createComponent<
  AlertDialogContentProps,
  typeof RAD.Content
>({
  id: 'AlertDialogContent',
  baseElement: RAD.Content,
});

export const AlertDialogTitle = createComponent<
  AlertDialogTitleProps,
  typeof RAD.Title
>({
  id: 'AlertDialogTitle',
  baseElement: RAD.Title,
});

export const AlertDialogDescription = createComponent<
  AlertDialogDescriptionProps,
  typeof RAD.Description
>({
  id: 'AlertDialogDescription',
  baseElement: RAD.Description,
});

export const AlertDialogAction = createComponent<
  AlertDialogActionProps,
  typeof RAD.Action
>({
  id: 'AlertDialogAction',
  baseElement: RAD.Action,
});

export const AlertDialogCancel = createComponent<
  AlertDialogCancelProps,
  typeof RAD.Cancel
>({
  id: 'AlertDialogCancel',
  baseElement: RAD.Cancel,
});

export const AlertDialog = withNamespace(AlertDialogRoot, {
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});
