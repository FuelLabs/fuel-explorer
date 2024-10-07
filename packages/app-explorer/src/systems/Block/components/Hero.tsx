import { Heading, Theme, VStack } from '@fuels/ui';

export function Hero() {
  return (
    <Theme>
      <VStack className="gap-0 px-[0.85rem]">
        <Heading
          as="h1"
          className="text-2xl leading-snug text-heading justify-center tablet:text-left tablet:text-4xl tablet:justify-start"
        >
          Blocks
        </Heading>
      </VStack>
    </Theme>
  );
}
