import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    dropdownItem:
      'text-base hover:bg-border focus:bg-border cursor-pointer py-6 my-1',
    dropdownContent: [
      '[&[data-active=true]]:mobile:max-tablet:border-l-0 mobile:max-tablet:border-r-0',
      'ml-[-10px] tablet:ml-0',
      'mt-[-10px] rounded-t-none shadow-none border border-t-0 border-border',
      '[&[data-active=true]]:border-t-0',
    ],
    dropdownLabel: 'text-base text-gray-12',
    dropdownSeparator: 'opacity-50 my-4',
    resultLink: 'hover:no-underline font-mono',
    loadingContainer: 'flex justify-center items-center h-[50px]',
    errorContainer: 'p-[16px] align-center flex text-pretty',
    errorTitle: 'text-center text-pretty text-error',
  },
});
