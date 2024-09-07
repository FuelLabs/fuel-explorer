import { HStack, VStack } from '../Box';
import { Portal } from '../Portal';
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
    <Portal
      className="radix-themes"
      data-accent-color="grass"
      data-gray-color="slate"
      data-radius="medium"
      data-scaling="100%"
    >
      <ToastProvider>
        {toasts.map(
          ({ id, title, description, action, icon, width = 350, ...props }) => (
            <Toast
              key={id}
              {...props}
              hasDescription={!!description}
              style={
                { '--radix-toast-width': `${width}px` } as React.CSSProperties
              }
            >
              <HStack align="center" className="flex-1">
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
          ),
        )}
        <ToastViewport />
      </ToastProvider>
    </Portal>
  );
}
