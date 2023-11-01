import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { Flex, HStack, VStack } from '@fuels/ui';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';

type BlockScreenSimpleProps = {
  block?: Maybe<BlockItemFragment>;
};

export function BlockScreenSimple({ block }: BlockScreenSimpleProps) {
  return (
    <VStack>
      <HStack>
        <CardInfo name="Producer" className="flex-1">
          TODO
        </CardInfo>
        <CardInfo name="Created" className="flex-1">
          TODO
        </CardInfo>
        <CardInfo name="Gas spent (gwei)" className="flex-1">
          TODO
        </CardInfo>
        <CardInfo name="# of transactions" className="flex-1">
          {block?.header.transactionsCount}
        </CardInfo>
      </HStack>
      <Flex>transaction info header</Flex>
      <Flex>Transactions</Flex>
    </VStack>
  );
}
