import { HStack, VStack } from '../Box';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
} from '../Icons';
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

// Color alone does not tell the variants apart, so each one gets its own glyph.
const VARIANT_ICONS = {
  success: IconCircleCheck,
  error: IconAlertCircle,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
} as const;

const VARIANT_COLORS = {
  success: 'var(--fuel-brand-text)',
  error: 'var(--fuel-danger-text)',
  warning: 'var(--fuel-warning-text)',
  info: 'var(--fuel-element-low-em)',
} as const;

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
          ({ id, title, description, action, icon, width = 350, ...props }) => {
            const variant = props.variant as
              | keyof typeof VARIANT_ICONS
              | undefined;
            const VariantIcon = variant ? VARIANT_ICONS[variant] : undefined;
            return (
              <Toast
                key={id}
                {...props}
                hasDescription={!!description}
                style={
                  { '--radix-toast-width': `${width}px` } as React.CSSProperties
                }
              >
                <HStack align="center" gap="2" className="flex-1">
                  {icon ??
                    (VariantIcon && variant && (
                      <span
                        aria-hidden
                        className="shrink-0"
                        style={{ color: VARIANT_COLORS[variant] }}
                      >
                        <VariantIcon size={18} />
                      </span>
                    ))}
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
          },
        )}
        <ToastViewport />
      </ToastProvider>
    </Portal>
  );
}
