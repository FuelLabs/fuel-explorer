import * as RD from '@radix-ui/react-dialog';

import { Portal } from '@radix-ui/react-portal';
import clsx from 'clsx';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { createComponent, withNamespace } from '../../utils/component';
import type { PropsOf } from '../../utils/types';
import { IconButton } from '../IconButton';
import { IconX } from '../Icons';

export type AnimatedDialogProps = PropsOf<typeof RD.Root>;
export type AnimatedDialogTriggerProps = PropsOf<typeof RD.Trigger>;
export type AnimatedDialogPortalProps = PropsOf<typeof Portal>;
export type AnimatedDialogOverlayProps = PropsOf<typeof RD.Overlay>;
export type AnimatedDialogTitleProps = PropsOf<typeof RD.Title>;
export interface AnimatedDialogContentProps extends PropsOf<typeof RD.Content> {
  open: boolean;
  color?: 'grass' | 'green' | 'orange';
  hideClose?: boolean;
}
export type AnimatedDialogCloseProps = PropsOf<typeof RD.Close>;
export type AnimatedDialogCloseButtonProps = Partial<
  Omit<PropsOf<typeof IconButton>, 'icon'>
>;
export type AnimatedDialogDescriptionProps = PropsOf<typeof RD.Description>;

const enterEase = [0.16, 1, 0.3, 1] as const;
const exitEase = [0.4, 0, 0.2, 1] as const;

const fadeOuter = {
  closed: {
    opacity: 0,
    transition: { duration: 0.18, ease: exitEase },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.2, ease: enterEase },
  },
};

function getContentVariants(reduced: boolean | null) {
  return {
    closed: {
      opacity: 0,
      y: reduced ? 0 : 12,
      scale: reduced ? 1 : 0.98,
      transition: { duration: 0.18, ease: exitEase },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: enterEase },
    },
  };
}

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
        iconColor="text-heading"
        className={clsx(
          'fuel-hover-fill fuel-hit absolute top-4 right-4 max-h-[32px] min-h-[32px] min-w-[32px] max-w-[32px]',
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
    { children, open, hideClose = false, color = 'grass', ...props },
  ) => {
    const reduced = useReducedMotion();
    const variants = getContentVariants(reduced);
    return (
      <AnimatePresence mode="wait">
        {open && (
          <Portal
            className="radix-themes"
            data-accent-color="grass"
            data-gray-color="slate"
            data-radius="none"
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
                    variants={variants}
                    initial="closed"
                    animate="open"
                    exit="closed"
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
  className: ({ className }) => clsx('fuel-stat-sm', className),
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
