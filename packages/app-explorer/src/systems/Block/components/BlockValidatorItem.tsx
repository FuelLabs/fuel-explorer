import { HStack } from '@fuels/ui';
import BlockHashItem from './BlockHashItem';

type BlockValidatorItemProps = {
  hashAddress: string;
};

export default function BlockValidatorItem({
  hashAddress,
}: BlockValidatorItemProps) {
  return (
    <HStack gap="2" width={'100px'} flexBasis={'100%'}>
      <BlockHashItem hashAddress={hashAddress} width="100px" />
    </HStack>
  );
}
