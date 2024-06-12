import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    overlay: [
      'fixed inset-0 z-50 backdrop-blur-sm',
      'state-open:animate-in state-closed:animate-out',
      'state-closed:fade-out-0 state-open:fade-in-0',
    ],
    closeIcon: [
      'absolute right-4 top-4 rounded-sm opacity-70',
      'transition-opacity hover:opacity-100 focus:outline-none',
      'focus:ring-2 focus:ring-gray-4 focus:ring-offset-2',
      'disabled:pointer-events-none state-open:bg-secondary',
    ],
    content: [
      'flex flex-col fixed z-50 gap-4 bg-card-bg p-6',
      'border-border shadow-lg transition ease-in-out',
      'state-open:animate-in state-closed:animate-out',
      'state-closed:duration-500 state-open:duration-700',
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
          'state-closed:slide-out-to-top state-open:slide-in-from-top',
        ],
      },
      bottom: {
        content: [
          'inset-x-0 bottom-0 border-t',
          'state-closed:slide-out-to-bottom state-open:slide-in-from-bottom',
        ],
      },
      left: {
        content: [
          'inset-y-0 left-0 h-full w-3/4 border-r',
          'state-closed:slide-out-to-left state-open:slide-in-from-left',
          'tablet:max-w-sm',
        ],
      },
      right: {
        content: [
          'inset-y-0 right-0 h-full w-3/4 border-l',
          'state-closed:slide-out-to-right state-open:slide-in-from-right',
          'tablet:max-w-sm',
        ],
      },
    },
  },
  defaultVariants: {
    side: 'right',
  },
});
