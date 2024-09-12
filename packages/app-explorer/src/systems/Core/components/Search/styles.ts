import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'group justify-center items-center',
      '[&[data-expanded=true]]:absolute [&[data-expanded=true]]:top-0 [&[data-expanded=true]]:left-0 [&[data-expanded=true]]:right-0',
      '[&[data-expanded=true]]:bg-gray-1 [&[data-expanded=true]]:z-50',
    ],
    dropdownItem: 'hover:bg-border focus:bg-border',
    inputWrapper: [
      'bg-white dark:bg-[var(--color-surface)] h-[40px]',
      '[&_.rt-TextFieldChrome]:bg-gray-1 [&_.rt-TextFieldChrome]:outline-none',
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
      'group-[&[data-expanded=true]]:[&_.rt-TextFieldChrome]:shadow-none group-[&[data-expanded=true]]:[&_.rt-TextFieldInput]:h-[60px]',
    ],
    searchSize: 'w-full sm:w-[400px] group-[&[data-expanded=true]]:w-full',
    dropdownContent: [
      'mt-[-4px] rounded-t-none shadow-none border border-t-0 border-border',
      '[&[data-expanded=true]]:ml-[-10px] [&[data-expanded=true]]:border-t-0 [&[data-expanded=true]]:border-x-0',
    ],
  },
});
