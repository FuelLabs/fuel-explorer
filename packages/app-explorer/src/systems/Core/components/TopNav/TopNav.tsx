'use client';
import { Nav, useBreakpoints } from '@fuels/ui';
import { isRoute } from 'app-commons';
import { useTheme } from 'next-themes';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Routes as PortalRoutes } from 'app-portal';
import { SearchWidget } from '../Search/SearchWidget';

export function TopNav() {
  const { theme, setTheme } = useTheme();
  // We need two of each variable bc both the mobile and desktop
  // nav elements are in the DOM and respond to click events.
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isLaptop } = useBreakpoints();
  const pathname = usePathname();
  const isBridge = isRoute(pathname, [
    PortalRoutes.bridge,
    PortalRoutes.bridgeHistory,
  ]);
  const isEcosystemBridge = isRoute(pathname, [PortalRoutes.ecosystem]);
  const isExplorer = !isBridge && !isEcosystemBridge;

  useEffect(() => {
    if (isLaptop && isMobileSearchOpen) {
      setIsDesktopSearchOpen(true);
    } else if (!isLaptop && isDesktopSearchOpen) {
      setIsMobileSearchOpen(true);
    }
  }, [isLaptop, isDesktopSearchOpen, isMobileSearchOpen]);

  const logo = (
    <NextLink href="/" className="flex items-center">
      <Nav.Logo />
    </NextLink>
  );

  const tooling = (
    <>
      <Nav.MenuItem
        isActive={isExplorer}
        as={NextLink}
        href="/"
        className="flex items-center"
      >
        Explorer
      </Nav.MenuItem>
      <Nav.MenuItem isActive={isBridge} href={PortalRoutes.bridge()}>
        Bridge
      </Nav.MenuItem>
      <Nav.MenuItem
        isActive={isEcosystemBridge}
        href={PortalRoutes.ecosystem()}
      >
        Ecosystem
      </Nav.MenuItem>
    </>
  );

  const themeToggle = (
    <Nav.ThemeToggle whenOpened="no-effect" theme={theme} onToggle={setTheme} />
  );

  return (
    <Nav>
      <Nav.Desktop className={'px-10 justify-between'}>
        <Nav.Menu>
          {logo}
        </Nav.Menu>
        <Nav.Menu>
          <SearchWidget />
        </Nav.Menu>
        <Nav.Menu>
          {tooling}
          {themeToggle}
        </Nav.Menu>
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          <SearchWidget />
          {themeToggle}
        </Nav.MobileContent>
        <Nav.Menu>{tooling}</Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}
