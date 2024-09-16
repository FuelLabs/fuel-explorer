import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'transition-all duration-200 [&[data-expanded=false]]:ease-in [&[data-expanded=true]]:ease-out',
      'group justify-center items-center',
      'block left-0 w-full', // needed for properly execution of transitions
      '[&[data-expanded=true]]:w-[calc(100vw+1px)] [&[data-expanded=true]]:left-[-64px] tablet:[&[data-expanded=true]]:w-full',
      '[&[data-expanded=true]]:absolute tablet:[&[data-expanded=true]]:left-0 [&[data-expanded=true]]:right-0',
      '[&[data-expanded=true]]:top-[-14px] tablet:[&[data-expanded=true]]:top-[-4px] desktop:[&[data-expanded=true]]:top-[-1px]',
      '[&[data-expanded=true]]:z-50',
    ],
    dropdownItem: 'hover:bg-border focus:bg-border cursor-pointer',
    inputWrapper: [
      'outline-none h-[40px] group-[&[data-expanded=true]]:h-[60px] tablet:group-[&[data-expanded=true]]:h-[40px]',
      'group-[&[data-expanded=true]]:rounded-none tablet:group-[&[data-expanded=true]]:rounded-[var(--text-field-border-radius)] ',
      'border-x-[1px] border-y-[1px] group-[&[data-expanded=true]]:border-x-0 group-[&[data-expanded=true]]:border-y-0 tablet:group-[&[data-expanded=true]]:border-x-[1px] tablet:group-[&[data-expanded=true]]:border-y-[1px]',
      'border-[var(--color-border)] shadow-none',
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
