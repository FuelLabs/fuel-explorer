import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack, Grid, Address, Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { TxCard } from '~/systems/Transaction/component/TxCard/TxCard';

type BlockScreenSimpleProps = {
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
};

export function BlockScreenSimple({ block, producer }: BlockScreenSimpleProps) {
  return (
    <VStack>
      <Grid className="grid-rows-4 tablet:grid-rows-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-6 mb-8">
        <CardInfo name="Producer" className="flex-1">
          <Address
            value={producer || ''}
            className="[&_button]:text-color [&_svg]:text-color [&_button]:text-base"
          >
            <Address.Link as={NextLink} href={`/account/${producer}`}>
              View Account
            </Address.Link>
          </Address>
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
      </Grid>
      <PageTitle size="3" icon={<Icon icon={IconListDetails} />}>
        Transactions
      </PageTitle>
      <Grid className="gap-6 grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3">
        {block?.transactions.map((transaction) => (
          <TxCard key={transaction.id} transaction={transaction} />
        ))}
      </Grid>
    </VStack>
  );
}
