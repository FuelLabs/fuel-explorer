'use client';

import { Box, Link } from '@fuel-ui/react';

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
      <Link href="/storybook">Go to Storybook</Link>
    </Box.Flex>
  );
}
