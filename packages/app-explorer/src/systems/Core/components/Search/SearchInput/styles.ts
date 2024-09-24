import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'transition-all duration-200 [&[data-active=false]]:ease-in [&[data-active=true]]:ease-out',
      'group justify-center items-center',
      'block left-0 w-full', // needed for properly execution of transitions
      '[&[data-variable-position=true]]:[&[data-active=true]]:w-[calc(100vw+1px)] [&[data-variable-position=true]]:[&[data-active=true]]:left-[-64px] tablet:[&[data-variable-position=true]]:[&[data-active=true]]:w-full',
      '[&[data-active=true]]:absolute tablet:[&[data-variable-position=true]]:[&[data-active=true]]:left-0 [&[data-active=true]]:right-0',
      '[&[data-variable-position=true]]:[&[data-active=true]]:top-[-14px] [&[data-variable-position=true]]:tablet:[&[data-active=true]]:top-[-4px] [&[data-variable-position=true]]:desktop:[&[data-active=true]]:top-[-20px]',
      '[&[data-active=true]]:z-50',
    ],
    inputContainer: 'w-full',
    inputWrapper: [
      'outline-none h-[40px] group-[&[data-active=true]]:h-[60px] tablet:group-[&[data-active=true]]:h-[40px]',
      'group-[&[data-active=true]]:rounded-none tablet:group-[&[data-active=true]]:rounded-[var(--text-field-border-radius)] ',
      'border-x-[1px] border-y-[1px] group-[&[data-active=true]]:border-x-0 group-[&[data-active=true]]:border-y-0 tablet:group-[&[data-active=true]]:border-x-[1px] tablet:group-[&[data-active=true]]:border-y-[1px]',
      'border-[var(--color-border)] shadow-none',
      'bg-none dark:bg-[var(--color-surface)] group-[&[data-active=true]]:bg-[var(--color-panel-solid)]',
      '[&_.rt-TextFieldChrome]:bg-gray-1 [&_.rt-TextFieldChrome]:outline-none',
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
      'group-[&[data-active=true]]:[&_.rt-TextFieldChrome]:shadow-none',
    ],
    inputActionsContainer:
      '[&[data-show=false]]:hidden absolute flex items-center h-full right-0 top-0 transform',
  },
});
