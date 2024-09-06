'use client';

import { HStack, Heading, Theme, VStack } from '@fuels/ui';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-1">
        <Heading as="h1" className="m-0 p-0 font-mono">
          Blocks
        </Heading>
        <HStack>
          <p className="text-[#9f9f9f]">Home</p>
          <p>{'>'}</p>
          <p>View All Blocks</p>
        </HStack>
      </VStack>
    </Theme>
  );
}
