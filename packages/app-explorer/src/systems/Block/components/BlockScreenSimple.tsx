/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { BlockItemFragment, Maybe } from '@fuel-explorer/graphql';
import {
  Address,
  Grid,
  Icon,
  LoadingBox,
  LoadingWrapper,
  VStack,
} from '@fuels/ui';
import { IconListDetails } from '@tabler/icons-react';
import NextLink from 'next/link';
import { Routes } from '~/routes';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';
import { PageTitle } from '~/systems/Core/components/PageTitle/PageTitle';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';

type BlockScreenSimpleProps = {
  block?: Maybe<BlockItemFragment>;
  producer?: Maybe<string>;
  isLoading?: boolean;
};

export function BlockScreenSimple({
  block,
  producer,
  isLoading,
}: BlockScreenSimpleProps) {
  const txList = (block?.transactions.map((v) => ({ node: v })) as any) || [];
  return (
    <VStack>
      <Grid className="grid-rows-3 tablet:grid-rows-1 tablet:grid-cols-3 gap-6 mb-8">
        <CardInfo name="Producer" className="flex-1">
          <Address
            value={producer || ''}
            className="[&_button]:text-color [&_svg]:text-color [&_button]:text-base"
            linkProps={{ as: NextLink, href: Routes.accountAssets(producer!) }}
          />
        </CardInfo>
        <CardInfo
          name="Created"
          className="flex-1"
          description={
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-40 h-5 mt-1" />}
              regularEl={block?.time?.full}
            />
          }
        >
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-24 h-6" />}
            regularEl={block?.time?.fromNow}
          />
        </CardInfo>
        <CardInfo name="# of transactions" className="flex-1">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-12 h-6" />}
            regularEl={block?.header.transactionsCount}
          />
        </CardInfo>
      </Grid>
      <PageTitle size="3" icon={<Icon icon={IconListDetails} />}>
        Transactions
      </PageTitle>
      {isLoading ? (
        <TxListLoader numberOfTxs={4} />
      ) : (
        <TxList hidePagination transactions={txList} />
      )}
    </VStack>
  );
}
