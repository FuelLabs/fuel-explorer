import { tv } from 'tailwind-variants';

// Literal class names: Tailwind only generates classes it can read verbatim.
const text = [
  '[--radix-toast-color:var(--fuel-element-mid-em)]',
  '[--radix-toast-title-color:var(--fuel-element-high-em)]',
  '[--radix-toast-description-color:var(--fuel-element-low-em)]',
];

const vars = {
  base: ['[--fuel-toast-edge:var(--fuel-element-low-em)]', ...text],
  info: ['[--fuel-toast-edge:var(--fuel-element-low-em)]', ...text],
  warning: ['[--fuel-toast-edge:var(--fuel-warning)]', ...text],
  success: ['[--fuel-toast-edge:var(--fuel-brand-text)]', ...text],
  error: ['[--fuel-toast-edge:var(--fuel-danger)]', ...text],
};

export const styles = tv({
  slots: {
    // Bottom on every width: a top viewport would cover the sticky nav on phones.
    viewport: [
      'fixed bottom-0 z-50 max-w-full flex flex-col p-4 tablet:right-0',
    ],
    toast: [
      'group pointer-events-auto relative w-full overflow-hidden',
      'flex flex-row items-center justify-between gap-6',
      'p-4 pl-5 outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--fuel-focus)] not-first:mt-4',
      'tablet:min-w-[var(--radix-toast-width)]',
      'data-[swipe=end]:transition-none',
      'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-move-x)]',
      'data-[state=open]:animate-in',
      'data-[state=open]:slide-in-from-bottom-full',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-80',
      'data-[state=closed]:slide-out-to-bottom-full',
      'bg-[var(--fuel-background)]',
      'border border-[var(--fuel-line)]',
      'before:absolute before:inset-y-[-1px] before:left-[-1px] before:w-[2px]',
      "before:bg-[var(--fuel-toast-edge)] before:content-['']",
      'text-[var(--radix-toast-color)]',
      'overflow-visible',
    ],
    action: [
      'fuel-label inline-flex h-9 shrink-0 items-center justify-center',
      'px-4 transition-colors duration-200 focus:outline-none',
      'disabled:pointer-events-none disabled:opacity-50',
      'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--fuel-focus)]',
      'border border-[var(--fuel-line)] text-[var(--fuel-element-high-em)]',
      'hover:bg-[var(--fuel-muted)]',
    ],
    close: [
      'fuel-hit absolute top-1 right-1 h-6 w-6 min-h-6 min-w-6',
      'transition-colors duration-200',
      'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--fuel-focus)]',
      'bg-transparent hover:bg-[var(--fuel-muted)]',
      'text-[var(--fuel-element-high-em)]',
    ],
    // Titles carry whole sentences (an error message), so they keep sentence case.
    title: [
      'text-sm font-medium leading-5 whitespace-normal break-words',
      'text-[var(--radix-toast-title-color)]',
    ],
    description:
      'text-sm whitespace-pre-line break-words text-[var(--radix-toast-description-color)]',
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
