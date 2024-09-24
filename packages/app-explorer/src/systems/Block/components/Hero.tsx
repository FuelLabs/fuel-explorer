import { HStack, Heading, Theme, VStack } from '@fuels/ui';
import { IconChevronRight } from '@tabler/icons-react';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-0 px-[0.85rem]">
        <Heading as="h1" className="m-0 p-0 font-mono">
          Blocks
        </Heading>
        <HStack align={'center'} className="mb-3">
          <a href="/" className="text-[#9f9f9f]  r">
            <p className="m-0 text-[14px]">Home</p>
          </a>
          <IconChevronRight color="#9f9f9f" size={20} />
          <p className="m-0">View All Blocks</p>
        </HStack>
      </VStack>
    </Theme>
  );
}
