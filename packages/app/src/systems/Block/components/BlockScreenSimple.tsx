import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import {
  Card,
  Flex,
  HStack,
  VStack,
  Text,
  shortAddress,
  Link,
} from '@fuels/ui';
import { IconChecklist } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';

type BlockScreenSimpleProps = {
  block?: Maybe<BlockItemFragment>;
};

export function BlockScreenSimple({ block }: BlockScreenSimpleProps) {
  return (
    <VStack>
      <HStack className="my-6">
        <CardInfo name="Producer" className="flex-1">
          TODO
        </CardInfo>
        <CardInfo
          name="Created"
          description={block?.time?.full}
          className="flex-1"
        >
          {block?.time?.fromNow}
        </CardInfo>
        <CardInfo name="Gas spent (gwei)" className="flex-1">
          {bn(block?.totalGasUsed).format()}
        </CardInfo>
        <CardInfo name="# of transactions" className="flex-1">
          {block?.header.transactionsCount}
        </CardInfo>
      </HStack>
      <Flex className="border-b border-border pb-4">
        <Card>
          <Card.Body>
            <Flex>
              <IconChecklist /> Transactions
            </Flex>
          </Card.Body>
        </Card>
      </Flex>
      <Flex>
        {block?.transactions.map((transaction) => {
          return (
            <Card key={transaction.id} className="flex-1">
              <Card.Header className="justify-between flex-row">
                <HStack>
                  <Text>{transaction.title}</Text>
                  <Link as={NextLink} href={`/tx/${transaction.id}`}>
                    <Text className="text-black">
                      {shortAddress(transaction.id)}
                    </Text>
                  </Link>
                </HStack>
                <HStack>
                  <Text>{}</Text>
                  <Text className="text-muted">
                    {bn(transaction.gasUsed).format()} gwei
                  </Text>
                </HStack>
              </Card.Header>
            </Card>
          );
        })}
      </Flex>
    </VStack>
  );
}
