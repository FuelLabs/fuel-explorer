import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    logo: 'items-center justify-start',
    menu: [
      'flex flex-col gap-1 py-4 px-4 tablet:flex-row tablet:gap-4 desktop:px-2 desktop:py-0',
      'not-first:border-t not-first:border-border desktop:not-first:border-t-0 border-t-0',
    ],
    menuItem: [
      'relative h-auto data-[active=true]:text-brand hover:text-brand flex items-center',
      'desktop:data-[active=true]:before:content-[""]',
      'desktop:data-[active=true]:before:absolute',
      'desktop:data-[active=true]:before:block',
      'desktop:data-[active=true]:before:w-full',
      'desktop:data-[active=true]:before:h-1',
      'desktop:data-[active=true]:before:bg-brand',
      'desktop:data-[active=true]:before:top-[-24px]',
    ],
    navConnection: 'items-center',
    navNetwork: 'h-8',
    spacer: 'flex-1 opacity-0',
    themeToggle: [
      'relative cursor-pointer flex items-center px-2 w-12 h-8 rounded-full border-border',
      'bg-gray-3 select-none',
    ],
    themeToggleIcon: [
      'absolute opacity-100 transition-all duration-200 text-icon transform',
      'aria-[label=Sun]:right-2',
      'aria-[label=Moon]:left-2',
      'dark-theme:aria-[label=Sun]:transform',
      'dark-theme:aria-[label=Sun]:opacity-0',
      'dark-theme:aria-[label=Sun]:-translate-x-full',
      'light-theme:aria-[label=Moon]:transform',
      'light-theme:aria-[label=Moon]:opacity-0',
      'light-theme:aria-[label=Moon]:translate-x-full',
    ],
    desktop: [
      'mobile:max-desktop:hidden gap-8 flex-row items-center',
      'desktop:px-8 desktop:flex min-h-[var(--nav-height)]',
    ],
    desktopWrapper: ['border-b border-border min-h-[var(--nav-height)]'],
    mobileWrapper: [
      'pl-3 pr-2 border-b border-border min-h-[var(--nav-height)]',
    ],
    mobile: ['desktop:hidden flex-col fuel-[NavLogo]:flex-1'],
    mobileContent: [
      'max-w-screen flex items-center py-2 px-4 justify-between tablet:justify-start',
      'transition-colors duration-200 ease-in-out',
      'min-h-[var(--nav-height)] data-[open=true]:border-b data-[open=true]:border-border',
      'fuel-[NavLogo]:flex-1',
      'fuel-[IconButton]:text-icon',
    ],
  },
});
