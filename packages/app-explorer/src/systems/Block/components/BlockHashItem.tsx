import { Copyable, HStack, VStack } from '@fuels/ui';

type BlockHashItemProps = {
  hashAddress: string;
  width: string;
};

export default function BlockHashItem({
  hashAddress,
  width,
}: BlockHashItemProps) {
  return (
    <VStack>
      <HStack width={width} maxWidth={'1'}>
        <Copyable value={hashAddress} className="w-full font-mono text-heading">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-left">
            {hashAddress}
          </p>
        </Copyable>
      </HStack>
    </VStack>
  );
}
