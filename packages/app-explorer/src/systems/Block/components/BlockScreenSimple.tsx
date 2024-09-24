'use client';

import type {
  GQLBlockFragment,
  GQLTransactionsByBlockIdQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import { Address, Grid, LoadingBox, LoadingWrapper, VStack } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import NextLink from 'next/link';
import { Routes } from '~/routes';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';
import { fromNowUnix } from '~/systems/Core/utils/dayjs';
import { TxList } from '~/systems/Transactions/components/TxList/TxList';
import { TxListLoader } from '~/systems/Transactions/components/TxList/TxListLoader';

type BlockScreenSimpleProps = {
  id?: string;
  block?: Maybe<GQLBlockFragment>;
  txs?: GQLTransactionsByBlockIdQuery['transactionsByBlockId'];
  producer?: Maybe<string>;
  isLoading?: boolean;
};

export function BlockScreenSimple({
  id,
  block,
  txs,
  producer,
  isLoading,
}: BlockScreenSimpleProps) {
  return (
    <VStack>
      <Grid className="grid-rows-3 tablet:grid-rows-2 tablet:grid-cols-2 desktop:grid-cols-4 gap-6 mb-8">
        <CardInfo name="Height" className="flex-1">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-12 h-6" />}
            regularEl={block?.height}
          />
        </CardInfo>
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
            regularEl={fromNowUnix(block?.time?.rawUnix)}
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
      <PageTitle title="Transactions" />
      {isLoading ? (
        <TxListLoader numberOfTxs={4} />
      ) : (
        <TxList
          transactions={txs?.nodes}
          pageInfo={txs?.pageInfo}
          owner={id}
          route="blockSimple"
        />
      )}
    </VStack>
  );
}
