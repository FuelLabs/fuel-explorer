import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    overlay: [
      'fixed inset-0 z-50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    ],
    closeIcon: [
      'absolute right-4 top-4 rounded-sm opacity-70',
      'transition-opacity hover:opacity-100 focus:outline-none',
      'focus:ring-2 focus:ring-gray-4 focus:ring-offset-2',
      'disabled:pointer-events-none data-[state=open]:bg-secondary',
    ],
    content: [
      'flex flex-col fixed z-50 gap-4 bg-card-bg p-6',
      'border-gray-8 shadow-lg transition ease-in-out',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:duration-500 data-[state=open]:duration-700',
    ],
    header: ['flex flex-col space-y-2'],
    description: ['text-sm text-muted'],
    footer: [
      'flex flex-col-reverse',
      'tablet:flex-row tablet:justify-end tablet:space-x-2',
    ],
    title: ['text-lg font-semibold text-heading'],
    body: ['py-4 flex-1'],
  },
  variants: {
    side: {
      top: {
        content: [
          'inset-x-0 top-0 border-b',
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        ],
      },
      bottom: {
        content: [
          'inset-x-0 bottom-0 border-t',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        ],
      },
      left: {
        content: [
          'inset-y-0 left-0 h-full w-3/4 border-r',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
          'tablet:max-w-sm',
        ],
      },
      right: {
        content: [
          'inset-y-0 right-0 h-full w-3/4 border-l',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
          'tablet:max-w-sm',
        ],
      },
    },
  },
  defaultVariants: {
    side: 'right',
  },
});
