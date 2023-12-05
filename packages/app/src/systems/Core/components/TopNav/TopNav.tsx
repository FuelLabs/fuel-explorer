'use client';

import { Nav, useBreakpoints } from '@fuels/ui';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import { setTheme } from '../../actions/setTheme';
import { SearchWidget } from '../SearchWidget/SearchWidget';

export function TopNav() {
  // We need two of each variable bc both the mobile and desktop
  // nav elements are in the DOM and respond to click events.
  const [isDesktopExitComplete, setIsDesktopExitComplete] = useState(true);
  const [isMobileExitComplete, setIsMobileExitComplete] = useState(true);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isLaptop } = useBreakpoints();

  useEffect(() => {
    if (isLaptop && isMobileSearchOpen) {
      setIsDesktopSearchOpen(true);
    } else if (!isLaptop && isDesktopSearchOpen) {
      setIsMobileSearchOpen(true);
    }
  }, [isLaptop]);

  const logo = (
    <NextLink href="/" className="flex items-center flex-1 laptop:flex-initial">
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
    <Nav.ThemeToggle onToggle={(theme) => setTheme({ theme })} />
  );

  return (
    <Nav>
      <Nav.Desktop
        className={`px-10 ${!isDesktopExitComplete ? 'justify-between' : ''}`}
      >
        {logo}
        {isDesktopExitComplete && (
          <>
            <Nav.Menu>{externalLinks}</Nav.Menu>
            <Nav.Spacer />
          </>
        )}
        <Nav.Menu>
          <SearchWidget
            setIsExitComplete={setIsDesktopExitComplete}
            isExitComplete={isDesktopExitComplete}
            setIsSearchOpen={setIsDesktopSearchOpen}
            isSearchOpen={isDesktopSearchOpen}
          />
          {isDesktopExitComplete && tooling}
        </Nav.Menu>
        {!isDesktopExitComplete ? <div></div> : themeToggle}
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          <SearchWidget
            setIsExitComplete={setIsMobileExitComplete}
            isExitComplete={isMobileExitComplete}
            setIsSearchOpen={setIsMobileSearchOpen}
            isSearchOpen={isMobileSearchOpen}
          />
          {!isMobileExitComplete ? <div></div> : themeToggle}
        </Nav.MobileContent>
        {isMobileExitComplete && (
          <Nav.Menu>
            {externalLinks}
            {tooling}
          </Nav.Menu>
        )}
      </Nav.Mobile>
    </Nav>
  );
}
