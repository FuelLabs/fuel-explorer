import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'transition-[width] duration-200 [&[data-expanded=false]]:ease-in [&[data-expanded=true]]:ease-out',
      'group justify-center items-center',
      '[&[data-expanded=true]]:absolute [&[data-expanded=true]]:top-[-1px] [&[data-expanded=true]]:left-0 [&[data-expanded=true]]:right-0',
      'w-full [&[data-expanded=true]]:w-[calc(100%+48px+0.5rem)] tablet:[&[data-expanded=true]]:w-full',
      '[&[data-expanded=true]]:z-50',
    ],
    dropdownItem: 'hover:bg-border focus:bg-border cursor-pointer',
    inputWrapper: [
      'h-[40px]',
      'border-[var(--color-border)] border-x-[1px] border-y-[1px] shadow-none',
      'bg-white dark:bg-[var(--color-surface)] group-[&[data-expanded=true]]:bg-[var(--color-panel-solid)] bg-none',
      '[&_.rt-TextFieldChrome]:bg-gray-1 [&_.rt-TextFieldChrome]:outline-none',
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
      'group-[&[data-expanded=true]]:[&_.rt-TextFieldChrome]:shadow-none',
    ],
    searchSize: 'w-full sm:w-[400px] group-[&[data-expanded=true]]:w-full',
    dropdownContent: [
      'mt-[-10px] rounded-t-none shadow-none border border-t-0 border-border',
      '[&[data-expanded=true]]:border-t-0',
    ],
  },
});
