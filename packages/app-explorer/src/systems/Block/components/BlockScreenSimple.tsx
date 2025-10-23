import type {
  GQLBlockFragment,
  GQLTransactionsByBlockIdQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import { Address, Grid, LoadingBox, LoadingWrapper, VStack } from '@fuels/ui';
import { PageTitle } from 'app-commons';

import { Routes } from '~/routes';
import { CardInfo } from '~/systems/Core/components/CardInfo/CardInfo';
import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';
import { TxTimeAgoTimestamp } from '~/systems/Transaction/component/TxTimeAgoTimestamp/TxTimeAgoTimestamp';
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
    <VStack gap="2" className="relative">
      <Grid className="grid-rows-3 tablet:grid-rows-2 tablet:grid-cols-2 desktop:grid-cols-4 desktop:grid-rows-1 gap-6">
        <CardInfo name="Height" className="flex-1">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-[68px] h-[20px] mb-[1px]" />}
            regularEl={block?.height}
          />
        </CardInfo>
        <CardInfo name="Producer" className="flex-1">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-[101px] h-[20px]" />}
            regularEl={
              <Address
                value={producer || ''}
                className="[&_button]:text-color [&_svg]:text-color [&_button]:text-base"
                linkProps={{ href: Routes.accountAssets(producer || '') }}
                isAccount
              />
            }
          />
        </CardInfo>
        <CardInfo
          name="Created"
          className="flex-1"
          description={
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="w-[154px] h-5" />}
              regularEl={
                <TxFullDateTimestamp timeStamp={block?.time?.rawUnix as any} />
              }
            />
          }
        >
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-[120px] h-[20px] mb-2" />}
            regularEl={
              <TxTimeAgoTimestamp
                timeStamp={block?.time?.rawUnix as any}
                loading={<LoadingBox className="w-24 h-6" />}
              />
            }
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

      {/* Transactions section - title always visible */}
      <PageTitle
        title="Transactions"
        mb={{ sm: '4', lg: '4' }}
        className="mt-8"
      />
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<TxListLoader numberOfTxs={4} />}
        regularEl={
          <TxList
            transactions={txs?.nodes}
            pageInfo={txs?.pageInfo}
            owner={id}
            route="blockSimple"
          />
        }
      />
    </VStack>
  );
}
