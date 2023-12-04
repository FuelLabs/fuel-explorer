'use client';

import { Nav } from '@fuels/ui';
import NextLink from 'next/link';
import { useState } from 'react';

import { setTheme } from '../../actions/setTheme';
import { SearchWidget } from '../SearchWidget/SearchWidget';

export function TopNav() {
  // We need two separate state variables bc the desktop/mobile elements
  // that are not shown still exist in the DOM and respond to click events
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
        className={
          isDesktopSearchOpen || isMobileSearchOpen
            ? 'flex items-center laptop:data-[active=true]:before:top-[-16px]'
            : 'flex items-center'
        }
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

  // const temp = (isSearchOpen: boolean) => {
  //   return (

  //   )
  // }

  return (
    <Nav>
      <Nav.Desktop
        className={`px-10 ${isDesktopSearchOpen ? 'justify-between' : ''}`}
      >
        {logo}
        {!isDesktopSearchOpen && (
          <>
            <Nav.Menu>{externalLinks}</Nav.Menu>
            <Nav.Spacer />
          </>
        )}
        <Nav.Menu>
          <SearchWidget
            isSearchOpen={isDesktopSearchOpen}
            setIsSearchOpen={setIsDesktopSearchOpen}
          />
          {!isDesktopSearchOpen && tooling}
        </Nav.Menu>
        {isDesktopSearchOpen ? <div></div> : themeToggle}
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
          <SearchWidget
            isSearchOpen={isMobileSearchOpen}
            setIsSearchOpen={setIsMobileSearchOpen}
          />
          {isMobileSearchOpen ? <div></div> : themeToggle}
        </Nav.MobileContent>
        {!isMobileSearchOpen && (
          <Nav.Menu>
            {externalLinks}
            {tooling}
          </Nav.Menu>
        )}
      </Nav.Mobile>
    </Nav>
  );
}
