'use client';

import { Nav } from '@fuels/ui';
import NextLink from 'next/link';

import { setTheme } from '../../actions/setTheme';

export function TopNav() {
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
      <Nav.MenuItem isActive as={NextLink} href="/">
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
      <Nav.Desktop className="px-10">
        {logo}
        <Nav.Menu>{externalLinks}</Nav.Menu>
        <Nav.Spacer />
        <Nav.Menu>{tooling}</Nav.Menu>
        {themeToggle}
      </Nav.Desktop>
      <Nav.Mobile>
        <Nav.MobileContent>
          {logo}
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
