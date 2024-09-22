import { tv } from 'tailwind-variants';

const vars = {
  base: [
    '[--tw-ring-color:var(--gray-4)]',
    '[--radix-toast-color:currentColor]',
    '[--radix-toast-bg:var(--gray-3)]',
    '[--radix-toast-border-color:var(--gray-6)]',
    '[--radix-toast-title-color:var(--gray-12)]',
    '[--radix-toast-description-color:var(--gray-11)]',
    '[--radix-toast-shadow:0_2px_16px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.10)]',
  ],
  info: [
    '[--tw-ring-color:var(--blue-4)]',
    '[--radix-toast-color:currentColor]',
    '[--radix-toast-bg:var(--blue-3)]',
    '[--radix-toast-border-color:var(--blue-6)]',
    '[--radix-toast-title-color:var(--blue-12)]',
    '[--radix-toast-description-color:var(--blue-11)]',
    '[--radix-toast-shadow:0_2px_16px_0_rgba(16,88,213,0.05),0_1px_1px_0_rgba(16,88,213,0.10)]',
  ],
  warning: [
    '[--tw-ring-color:var(--yellow-4)]',
    '[--radix-toast-color:currentColor]',
    '[--radix-toast-bg:var(--yellow-3)]',
    '[--radix-toast-border-color:var(--yellow-6)]',
    '[--radix-toast-title-color:var(--yellow-12)]',
    '[--radix-toast-description-color:var(--yellow-11)]',
    '[--radix-toast-shadow:0_2px_16px_0_rgba(187,148,7,0.05),0_1px_1px_0_rgba(187,148,7,0.10)]',
  ],
  success: [
    '[--tw-ring-color:var(--green-4)]',
    '[--radix-toast-color:currentColor]',
    '[--radix-toast-bg:var(--green-3)]',
    '[--radix-toast-border-color:var(--green-6)]',
    '[--radix-toast-title-color:var(--green-12)]',
    '[--radix-toast-description-color:var(--green-11)]',
    '[--radix-toast-shadow:0_2px_16px_0_rgba(0,0,0,0.05),0_1px_1px_0_rgba(0,0,0,0.10)]',
  ],
  error: [
    '[--tw-ring-color:var(--red-4)]',
    '[--radix-toast-color:currentColor]',
    '[--radix-toast-bg:var(--red-3)]',
    '[--radix-toast-border-color:var(--red-6)]',
    '[--radix-toast-title-color:var(--red-12)]',
    '[--radix-toast-description-color:var(--red-11)]',
    '[--radix-toast-shadow:0_2px_16px_0_rgba(160,21,8,0.05),0_1px_1px_0_rgba(160,21,8,0.10)]',
  ],
};

export const styles = tv({
  slots: {
    viewport: [
      'fixed top-0 z-50 flex flex-col-reverse p-4 tablet:bottom-0 tablet:right-0',
      'tablet:top-auto tablet:flex-col',
    ],
    toast: [
      'group pointer-events-auto relative w-full overflow-hidden rounded-lg',
      'flex flex-row items-center justify-between gap-6',
      'p-4 transition-all outline-none focus-visible:ring-2 not-first:mt-4',
      'tablet:min-w-[var(--radix-toast-width)]',
      'data-[swipe=end]:transition-none',
      'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-move-x)]',
      'data-[state=open]:animate-in',
      'data-[state=open]:slide-in-from-top-full',
      'tablet:data-[state=open]:slide-in-from-bottom-full',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-80',
      'tablet:data-[state=closed]:slide-out-from-bottom-full',
      'bg-[var(--radix-toast-bg)]',
      'border border-[var(--radix-toast-border-color)]',
      'shadow-[var(--radix-toast-shadow)]',
      'text-[var(--radix-toast-color)]',
      'fuel-[Icon]:text-gray-1',
      'overflow-visible',
    ],
    action: [
      'inline-flex h-9 shrink-0 items-center justify-center rounded-lg',
      'px-4 text-sm font-medium transition-colors focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2',
      'bg-gray-12 text-gray-1',
      'hover:opacity-90',
    ],
    close: [
      'absolute focus-visible:ring-2 top-0 -right-3',
      'h-6 w-6 transition-colors transition-opacity',
      'opacity-0 group-hover:opacity-100',
      'bg-gray-8 fuel-[Icon]:text-gray-1',
      'hover:fuel-[Icon]:text-gray-4',
    ],
    title: ['text-md font-medium', 'text-[var(--radix-toast-title-color)]'],
    description: 'text-sm text-[var(--radix-toast-description-color)]',
  },
  variants: {
    variant: {
      base: {
        toast: vars.base,
        toastIcon: vars.base,
      },
      info: {
        toast: vars.info,
        toastIcon: vars.info,
      },
      warning: {
        toast: vars.warning,
        toastIcon: vars.warning,
      },
      success: {
        toast: vars.success,
        toastIcon: vars.success,
      },
      error: {
        toast: vars.error,
        toastIcon: vars.error,
      },
    },
    hasDescription: {
      true: {},
    },
  },
});
