import * as RD from '@radix-ui/react-dialog';

import { Portal } from '@radix-ui/react-portal';
import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { IconButton } from '../IconButton';

export type AnimatedDialogProps = PropsOf<typeof RD.Root>;
export type AnimatedDialogTriggerProps = PropsOf<typeof RD.Trigger>;
export type AnimatedDialogPortalProps = PropsOf<typeof Portal>;
export type AnimatedDialogOverlayProps = PropsOf<typeof RD.Overlay>;
export type AnimatedDialogTitleProps = PropsOf<typeof RD.Title>;
export interface AnimatedDialogContentProps extends PropsOf<typeof RD.Content> {
  open: boolean;
  color?: 'green' | 'orange';
  hideClose?: boolean;
}
export type AnimatedDialogCloseProps = PropsOf<typeof RD.Close>;
export type AnimatedDialogCloseButtonProps = Partial<
  Omit<PropsOf<typeof IconButton>, 'icon'>
>;
export type AnimatedDialogDescriptionProps = PropsOf<typeof RD.Description>;

const animations = {
  closed: {
    opacity: 0,
    transform: 'var(--animated-dialog-transform-closed)',
  },
  open: {
    opacity: 1,
    transform: 'var(--animated-dialog-transform-open)',
  },
};

const fadeOuter = {
  closed: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      duration: 0.2,
    },
  },
};

const contentTransition = {
  type: 'spring',
  duration: 0.5,
  bounce: 0.1,
};

export const AnimatedDialogRoot = createComponent<
  AnimatedDialogProps,
  typeof RD.Root
>({
  id: 'AnimatedDialog',
  baseElement: RD.Root,
});

export const AnimatedDialogTrigger = createComponent<
  AnimatedDialogTriggerProps,
  typeof RD.Trigger
>({
  id: 'AnimatedDialogTrigger',
  baseElement: RD.Trigger,
});

export const AnimatedDialogOverlay = createComponent<
  AnimatedDialogOverlayProps,
  typeof RD.Overlay
>({
  id: 'AnimatedDialogOverlay',
  baseElement: RD.Overlay,
  className: () => 'backdrop-blur-sm bg-black/70',
});

export const AnimatedDialogClose = createComponent<
  AnimatedDialogCloseProps,
  typeof RD.Close
>({
  id: 'AnimatedDialogClose',
  baseElement: RD.Close,
});

export const AnimatedDialogCloseButton = createComponent<
  AnimatedDialogCloseButtonProps,
  typeof IconButton
>({
  id: 'AnimatedDialogCloseButton',
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

export const AnimatedDialogContent = createComponent<
  AnimatedDialogContentProps,
  typeof RD.Content
>({
  id: 'AnimatedDialogContent',
  defaultProps: {
    forceMount: true, // We're going to manage the destroying (with framer-motion)
    asChild: true, // To pass everything to a motion.div
  },
  render: (
    _,
    { children, open, hideClose = false, color = 'green', ...props },
  ) => {
    return (
      <AnimatePresence mode="wait">
        {open && (
          <Portal
            className="radix-themes"
            data-accent-color="grass"
            data-gray-color="slate"
            data-radius="medium"
            data-scaling="100%"
            asChild
          >
            <motion.div
              variants={fadeOuter}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <AnimatedDialogOverlay forceMount>
                <RD.Content {...props} forceMount asChild>
                  <motion.div
                    data-accent-color={color}
                    variants={animations}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    layout
                    layoutId="animated-dialog-content"
                    transition={contentTransition}
                  >
                    {children}

                    <AnimatePresence initial={false}>
                      {!hideClose && (
                        <AnimatedDialogClose asChild>
                          <AnimatedDialogCloseButton className="bg-transparent" />
                        </AnimatedDialogClose>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </RD.Content>
              </AnimatedDialogOverlay>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>
    );
  },
});

export const AnimatedDialogTitle = createComponent<
  AnimatedDialogTitleProps,
  typeof RD.Title
>({
  id: 'AnimatedDialogTitle',
  baseElement: RD.Title,
  className: ({ className }) =>
    `font-mono text-xl tablet:text-2xl ${className}`,
});

export const AnimatedDialogDescription = createComponent<
  AnimatedDialogDescriptionProps,
  typeof RD.Description
>({
  id: 'AnimatedDialogDescription',
  baseElement: RD.Description,
});

export const AnimatedDialog = withNamespace(AnimatedDialogRoot, {
  Trigger: AnimatedDialogTrigger,
  Content: AnimatedDialogContent,
  Close: AnimatedDialogClose,
  CloseButton: AnimatedDialogCloseButton,
  Description: AnimatedDialogDescription,
  Title: AnimatedDialogTitle,
});
