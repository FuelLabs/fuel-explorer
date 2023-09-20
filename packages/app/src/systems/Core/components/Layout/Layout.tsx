'use client';
import { Container, VStack } from 'pn-ui-primitives/Box';
import { Heading } from 'pn-ui-primitives/Heading';
import { Nav } from 'pn-ui-primitives/Nav';
import type { BaseProps } from 'pn-ui-primitives/types';
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
            <Nav.MenuItem href="#" isExternal>
              Labs
            </Nav.MenuItem>
          </Nav.Menu>
          <Nav.Spacer />
          <Nav.Menu>
            <Nav.MenuItem href="#">Bridge</Nav.MenuItem>
            <Nav.MenuItem href="#" isActive>
              Explorer
            </Nav.MenuItem>
            <Nav.MenuItem href="#">Ecosystem</Nav.MenuItem>
          </Nav.Menu>
          <Nav.ThemeToggle />
          <Nav.Connection />
        </Nav.Desktop>
      </Nav>
      {hero && <Hero />}
      <Container className="py-10">
        <Heading as="h2" className="text-4xl mb-6">
          Recent Transactions
        </Heading>
        {children}
      </Container>
      <Footer className="border-t border-border" />
    </VStack>
  );
}
