'use client';

import { Box, Icon } from '@fuel-ui/react';

export function HomePage() {
  return (
    <Box.Flex
      css={{
        width: '100vw',
        height: '100vh',
        gap: '$4',
        is: ['centered'],
      }}
    >
      <Icon icon="Calendar" />
      Hello World
    </Box.Flex>
  );
}
