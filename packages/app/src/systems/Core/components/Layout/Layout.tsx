'use client';
import { Container, VStack, Nav } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import Link from 'next/link';
import { Hero } from '~/systems/Home/components/Hero/Hero';

import { setTheme } from '../../actions/setTheme';
import { Footer } from '../Footer/Footer';

export type LayoutProps = BaseProps<{
  hero?: boolean;
}>;

export function Layout({ children, hero }: LayoutProps) {
  return (
    <VStack className="min-w-screen min-h-screen" gap="0">
      <Nav>
        <Nav.Desktop className="px-10">
          <Link href="/" className="flex items-center">
            <Nav.Logo />
          </Link>
          <Nav.Menu>
            <Nav.MenuItem href="https://docs.fuel.network/">
              Developers
            </Nav.MenuItem>
            <Nav.MenuItem href="https://forum.fuel.network">
              Community
            </Nav.MenuItem>
            <Nav.MenuItem isExternal href="https://fuel.network">
              Labs
            </Nav.MenuItem>
          </Nav.Menu>
          <Nav.Spacer />
          <Nav.Menu>
            <Nav.MenuItem
              isExternal
              href="https://alpha.fuel.network/bridge"
              target="_blank"
            >
              Bridge
            </Nav.MenuItem>
            <Nav.MenuItem isActive>
              <Link href="/">Explorer</Link>
            </Nav.MenuItem>
            <Nav.MenuItem
              isExternal
              href="https://alpha.fuel.network/ecosystem"
              target="_blank"
            >
              Ecosystem
            </Nav.MenuItem>
          </Nav.Menu>
          <Nav.ThemeToggle onToggle={(theme) => setTheme({ theme })} />
        </Nav.Desktop>
      </Nav>
      {hero && <Hero />}
      <Container className="py-24" size="4">
        {children}
      </Container>
      <Footer />
    </VStack>
  );
}
