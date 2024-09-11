import { HStack, Heading, Theme, VStack } from '@fuels/ui';
import { IconChevronRight } from '@tabler/icons-react';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-0">
        <Heading as="h1" className="m-0 p-0 font-mono">
          Blocks
        </Heading>
        <HStack align={'center'}>
          <a href="/" className="text-[#9f9f9f]  r">
            <p className="m-0">Home</p>
          </a>
          <IconChevronRight color="#9f9f9f" size={20} />
          <p className="m-0">View All Blocks</p>
        </HStack>
      </VStack>
    </Theme>
  );
}
