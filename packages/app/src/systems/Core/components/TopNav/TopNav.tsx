'use client';
import { Nav, useBreakpoints } from '@fuels/ui';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { setTheme } from '../../actions/setTheme';
import { SearchWidget } from '../Search/SearchWidget';

export function TopNav() {
  // We need two of each variable bc both the mobile and desktop
  // nav elements are in the DOM and respond to click events.
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isLaptop } = useBreakpoints();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isLaptop && isMobileSearchOpen) {
      setIsDesktopSearchOpen(true);
    } else if (!isLaptop && isDesktopSearchOpen) {
      setIsMobileSearchOpen(true);
    }
  }, [isLaptop]);

  const logo = (
    <NextLink href="/" className="flex items-center">
      <Nav.Logo />
    </NextLink>
  );

  const externalLinks = (
    <>
      <Nav.MenuItem href="https://docs.fuel.network/">Developers</Nav.MenuItem>
      <Nav.MenuItem href="https://forum.fuel.network">Community</Nav.MenuItem>
      <Nav.MenuItem isExternal href="https://fuel.network">
        Labs
      </Nav.MenuItem>
    </>
  );

  const tooling = (
    <>
      <Nav.MenuItem
        isExternal
        href="https://alpha.fuel.network/bridge"
        target="_blank"
      >
        Bridge
      </Nav.MenuItem>
      <Nav.MenuItem
        isActive
        as={NextLink}
        href="/"
        className="flex items-center"
      >
        Explorer
      </Nav.MenuItem>
      <Nav.MenuItem
        isExternal
        href="https://alpha.fuel.network/ecosystem"
        target="_blank"
      >
        Ecosystem
      </Nav.MenuItem>
    </>
  );

  const themeToggle = (
    <Nav.ThemeToggle
      whenOpened="no-effect"
      onToggle={(theme) => setTheme({ theme })}
    />
  );

  return (
    <Nav>
      <Nav.Desktop className={`px-10 justify-between`}>
        <Nav.Menu>
          {logo}
          {externalLinks}
        </Nav.Menu>
        <Nav.Menu>
          <SearchWidget
            setIsSearchOpen={setIsDesktopSearchOpen}
            isSearchOpen={isDesktopSearchOpen}
          />
        </Nav.Menu>
        <Nav.Menu>
          {tooling}
          {themeToggle}
        </Nav.Menu>
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          {!isHomePage && (
            <SearchWidget
              setIsSearchOpen={setIsMobileSearchOpen}
              isSearchOpen={isMobileSearchOpen}
            />
          )}
          {themeToggle}
        </Nav.MobileContent>
        <Nav.Menu>
          {externalLinks}
          {tooling}
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  );
}
