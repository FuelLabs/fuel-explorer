import { Heading, Theme, VStack } from '@fuels/ui';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-0 px-[0.85rem]">
        <Heading as="h2" className="m-0 p-0 font-mono">
          Blocks
        </Heading>
      </VStack>
    </Theme>
  );
}
