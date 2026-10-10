import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'transition-all duration-200 [&[data-active=false]]:ease-in [&[data-active=true]]:ease-out',
      'group justify-center items-center',
      'block left-0 w-full', // needed for properly execution of transitions
      // Focused below the md breakpoint, the box covers the compact nav bar (the header is positioned).
      '[&[data-active=true]]:absolute [&[data-active=true]]:inset-0 [&[data-active=true]]:z-50',
      '[&[data-active=true]]:px-4 [&[data-active=true]]:py-[10px]',
      '[&[data-active=true]]:bg-[var(--fuel-background)]',
      'md:[&[data-active=true]]:static md:[&[data-active=true]]:p-0',
      'md:[&[data-active=true]]:bg-transparent',
    ],
    inputContainer: 'w-full',
    inputWrapper: [
      'outline-none h-[40px]',
      'border-x-[1px] border-y-[1px] border-[var(--color-border)] shadow-none',
      'bg-none dark:bg-[var(--color-surface)] group-[&[data-active=true]]:bg-[var(--fuel-background)]',
      '[&_.rt-TextFieldChrome]:bg-[var(--fuel-background)] [&_.rt-TextFieldChrome]:outline-none',
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
      'group-[&[data-active=true]]:[&_.rt-TextFieldChrome]:shadow-none',
      'mobile:text-[16px] tablet:text-base [&>input]:pl-3 tablet:[&>input]:pl-2',
    ],
    inputActionsContainer:
      '[&[data-show=false]]:hidden pl-0 gap-0 tablet:gap-[var(--space-3)]',
    iconCheck:
      '!ml-0 h-full min-w-[22px] tablet:ml-2 pointer-events-auto [&[data-should-hide=false]]:hidden mr-[calc(var(--space-3)/2)] tablet:mr-0 pointer-events-auto bg-transparent',
    iconClear:
      'm-0 min-w-[22px] h-full ml-[calc(var(--space-3)/2)] tablet:ml-0 pointer-events-auto bg-transparent',
  },
});
