import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    logo: 'items-center justify-start',
    menu: [
      'flex flex-col gap-1 py-4 px-4 tablet:flex-row tablet:gap-4 desktop:px-2 desktop:py-0',
      'not-first:border-t not-first:border-border desktop:not-first:border-t-0 border-t-0',
    ],
    menuItem: [
      'flex items-center',
      'relative h-auto',
      'font-mono font-medium text-[14px] leading-none uppercase tracking-[0.05em]',
      'text-muted transition-colors duration-300',
      'data-[active=true]:text-heading hover:text-heading',
    ],
    navConnection: 'items-center',
    navNetwork: 'h-8',
    spacer: 'flex-1 opacity-0',
    themeToggle: [
      'relative cursor-pointer flex items-center justify-center w-10 h-10 border border-border',
      'bg-gray-3 select-none',
    ],
    themeToggleIcon: [
      'absolute transition-opacity duration-300 text-icon',
      'aria-[label=Sun]:opacity-100 aria-[label=Moon]:opacity-0',
      'dark:aria-[label=Sun]:opacity-0 dark:aria-[label=Moon]:opacity-100',
    ],
    desktop: [
      'hidden md:flex justify-between flex-row items-center',
      'md:px-8 min-h-[var(--nav-height)]',
    ],
    desktopWrapper: ['fuel-grid-divider min-h-[var(--nav-height)]'],
    mobileWrapper: ['pl-3 pr-2 fuel-grid-divider min-h-[var(--nav-height)]'],
    mobile: ['md:hidden flex-col fuel-[NavLogo]:flex-1'],
    mobileContent: [
      'max-w-screen flex items-center py-2 px-4 justify-between tablet:justify-start',
      'transition-colors duration-200 ease-in-out',
      'min-h-[var(--nav-height)] data-[open=true]:border-b data-[open=true]:border-border',
      'fuel-[NavLogo]:flex-1',
      'fuel-[IconButton]:text-icon',
    ],
  },
});
