import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    dropdownItem:
      'text-base hover:bg-border focus:bg-border cursor-pointer py-6 my-1 justify-between gap-3',
    recentKind: 'fuel-label shrink-0',
    clearRecent:
      'fuel-label cursor-pointer hover:bg-border focus:bg-border my-1 text-[var(--fuel-element-low-em)]',
    emptyContainer: 'p-4 text-center text-pretty',
    emptyTitle: 'm-0 mb-2 font-medium text-heading',
    emptyHint: 'm-0 text-sm leading-snug text-[var(--fuel-element-low-em)]',
    dropdownContent: [
      'mt-[-10px] rounded-t-none shadow-none border border-t-0 border-border',
      'overflow-x-hidden',
    ],
    dropdownLabel: 'text-sm text-[var(--fuel-element-low-em)]',
    dropdownSeparator: 'opacity-50 my-4',
    resultLink: 'hover:no-underline font-mono py-4 min-w-0 truncate',
    loadingContainer: 'flex justify-center items-center h-[50px]',
    loadingText: 'text-sm text-[var(--fuel-element-mid-em)] ml-2',
    errorContainer: 'p-[16px] align-center flex text-pretty',
    errorTitle: 'text-center text-pretty text-[var(--fuel-danger-text)]',
  },
});
