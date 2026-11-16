import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    root: 'max-w-full',
    content: [
      'overflow-hidden p-4',
      'data-[state=open]:animate-accordion-open',
      'data-[state=closed]:animate-accordion-closed',
    ],
    item: ['overflow-hidden rounded-none not-first:mt-1'],
    trigger: [
      'group fuel-hover-fill bg-transparent transition-colors px-4 flex text-lg font-medium',
      'w-full h-[45px] items-center justify-between border border-[var(--fuel-line)]',
      'focus:outline-none text-heading',
      'focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1',
      'focus-visible:outline-[var(--fuel-focus)]',
    ],
    header: 'flex',
    icon: [
      'transition-transform duration-200 text-icon group-data-[state=open]:rotate-180 motion-reduce:transition-none',
    ],
  },
});
