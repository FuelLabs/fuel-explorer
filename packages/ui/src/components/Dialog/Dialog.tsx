import { Dialog as RD } from '@radix-ui/themes';

import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { IconButton } from '../IconButton';

export type DialogProps = PropsOf<typeof RD.Root>;
export type DialogTriggerProps = PropsOf<typeof RD.Trigger>;
export type DialogTitleProps = PropsOf<typeof RD.Title>;
export type DialogContentProps = PropsOf<typeof RD.Content>;
export type DialogCloseProps = PropsOf<typeof RD.Close>;
export type DialogCloseButtonProps = Partial<
  Omit<PropsOf<typeof IconButton>, 'icon'>
>;
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

export const DialogCloseButton = createComponent<
  DialogCloseButtonProps,
  typeof IconButton
>({
  id: 'DialogCloseButton',
  render: (_, props) => {
    return (
      <IconButton
        {...props}
        variant="ghost"
        color="gray"
        iconSize={20}
        icon={IconX}
        iconColor="text-gray-12"
        className={clsx(
          'rounded-full absolute top-4 right-4 max-h-[32px] min-h-[32px] min-w-[32px] max-w-[32px]',
          props.className,
        )}
      />
    );
  },
});

export const DialogTitle = createComponent<DialogCloseProps, typeof RD.Title>({
  id: 'DialogTitle',
  baseElement: RD.Title,
  className: () => 'font-mono text-2xl',
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
  CloseButton: DialogCloseButton,
  Description: DialogDescription,
  Title: DialogTitle,
});
