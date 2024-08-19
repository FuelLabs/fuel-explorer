'use client';

import { HStack, Heading, Theme, VStack } from '@fuels/ui';

export function Hero() {
  return (
    <Theme appearance="dark">
      <VStack>
        <Heading as="h1">Blocks</Heading>
        <HStack>
          <p>Home</p>
          <p>-</p>
          <p>View All Blocks</p>
        </HStack>
      </VStack>
    </Theme>
  );
}
