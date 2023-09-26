'use client';
import { Container, VStack, Nav } from '@fuels/ui';
import type { BaseProps } from '@fuels/ui';
import { Hero } from '~/systems/Home/components/Hero/Hero';

import { Footer } from '../Footer/Footer';

export type LayoutProps = BaseProps<{
  hero?: boolean;
}>;

export function Layout({ children, hero }: LayoutProps) {
  return (
    <VStack className="min-w-screen min-h-screen" gap="0">
      <Nav>
        <Nav.Desktop className="px-10">
          <Nav.Logo />
          <Nav.Menu>
            <Nav.MenuItem href="https://docs.wallet.network">
              Developers
            </Nav.MenuItem>
            <Nav.MenuItem href="https://forum.fuel.network">
              Community
            </Nav.MenuItem>
            <Nav.MenuItem isExternal href="#">
              Labs
            </Nav.MenuItem>
          </Nav.Menu>
          <Nav.Spacer />
          <Nav.Menu>
            <Nav.MenuItem href="#">Bridge</Nav.MenuItem>
            <Nav.MenuItem isActive href="#">
              Explorer
            </Nav.MenuItem>
            <Nav.MenuItem href="#">Ecosystem</Nav.MenuItem>
          </Nav.Menu>
          <Nav.ThemeToggle />
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
