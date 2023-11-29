/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import { VStack, Grid, Address, Icon } from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import NextLink from 'next/link';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { TxList } from '~/systems/Transaction/component/TxList/TxList';

type BlockScreenSimpleProps = {
  block?: Maybe<BlockItemFragment>;
  producer: Maybe<string>;
};

export function BlockScreenSimple({ block, producer }: BlockScreenSimpleProps) {
  const txList = (block?.transactions.map((v) => ({ node: v })) as any) || [];
  return (
    <VStack>
      <Grid className="grid-rows-3 tablet:grid-rows-1 tablet:grid-cols-3 gap-6 mb-8">
        <CardInfo name="Producer" className="flex-1">
          <Address
            value={producer || ''}
            className="[&_button]:text-color [&_svg]:text-color [&_button]:text-base"
            linkProps={{ as: NextLink, href: `/account/${producer}/assets` }}
          />
        </CardInfo>
        <CardInfo
          name="Created"
          description={block?.time?.full}
          className="flex-1"
        >
          {block?.time?.fromNow}
        </CardInfo>
        <CardInfo name="# of transactions" className="flex-1">
          {block?.header.transactionsCount}
        </CardInfo>
      </Grid>
      <PageTitle size="3" icon={<Icon icon={IconListDetails} />}>
        Transactions
      </PageTitle>
      <TxList hidePagination transactions={txList} />
    </VStack>
  );
}
