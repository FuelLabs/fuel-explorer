import { HStack, VStack } from '../Box';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './Toast';
import { useToast } from './useToast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        width = 350,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            style={{ '--radix-toast-width': `${width}px` } as any}
            hasDescription={!!description}
          >
            <HStack className="flex-1" align="center">
              {icon}
              <VStack gap="1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </VStack>
            </HStack>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
