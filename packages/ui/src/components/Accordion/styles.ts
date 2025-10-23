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
      'group bg-card-bg rounded-md transition-colors px-4 flex text-lg font-medium',
      'w-full h-[45px] items-center justify-between border border-border',
      'focus:outline-none text-heading hover:text-accent',
      'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent',
    ],
    header: 'flex',
    icon: [
      'transition-transform text-icon group-hover:rotate-180 group-data-[state=open]:rotate-180',
    ],
  },
});
