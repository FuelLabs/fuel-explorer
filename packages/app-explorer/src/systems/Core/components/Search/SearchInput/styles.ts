import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    searchBox: [
      'transition-all duration-200 [&[data-active=false]]:ease-in [&[data-active=true]]:ease-out',
      'group justify-center items-center',
      'block left-0 w-full', // needed for properly execution of transitions
      '[&[data-active=true]]:w-[calc(100vw+1px)] [&[data-active=true]]:left-[-68px] tablet:[&[data-active=true]]:w-full',
      '[&[data-active=true]]:absolute tablet:[&[data-active=true]]:left-0 [&[data-active=true]]:right-0',
      'laptop:[&[data-active=true]]:static',
      '[&[data-active=true]]:top-[-14px] tablet:[&[data-active=true]]:top-[-4px] desktop:[&[data-active=true]]:top-[-20px]',
      '[&[data-active=true]]:z-50',
    ],
    inputContainer: 'w-full',
    inputWrapper: [
      'outline-none h-[40px] group-[&[data-active=true]]:h-[58px] tablet:group-[&[data-active=true]]:h-[40px]',
      'group-[&[data-active=true]]:rounded-none tablet:group-[&[data-active=true]]:rounded-[var(--text-field-border-radius)] ',
      'border-x-[1px] border-y-[1px] group-[&[data-active=true]]:border-x-0 group-[&[data-active=true]]:border-y-0 tablet:group-[&[data-active=true]]:border-x-[1px] tablet:group-[&[data-active=true]]:border-y-[1px]',
      'border-[var(--color-border)] shadow-none',
      'bg-none dark:bg-[var(--color-surface)] group-[&[data-active=true]]:bg-[var(--color-panel-solid)]',
      '[&_.rt-TextFieldChrome]:bg-gray-1 [&_.rt-TextFieldChrome]:outline-none',
      '[&_.rt-TextFieldChrome]:[&[data-opened=true]]:rounded-b-none',
      'group-[&[data-active=true]]:[&_.rt-TextFieldChrome]:shadow-none',
      'mobile:text-[16px] tablet:text-base tablet:[&>input]:pl-2',
    ],
    inputActionsContainer:
      '[&[data-show=false]]:hidden pl-0 gap-0 tablet:gap-[var(--space-3)]',
    iconCheck:
      '!ml-0 h-full min-w-[22px] tablet:ml-2 pointer-events-auto [&[data-should-hide=false]]:hidden mr-[calc(var(--space-3)/2)] tablet:mr-0 pointer-events-auto bg-transparent',
    iconClear:
      'm-0 min-w-[22px] h-full ml-[calc(var(--space-3)/2)] tablet:ml-0 pointer-events-auto bg-transparent',
  },
});
