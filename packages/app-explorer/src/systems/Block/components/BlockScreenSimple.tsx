import type {
  GQLBlockFragment,
  GQLTransactionsByBlockIdQuery,
  Maybe,
} from '@fuel-explorer/graphql';
import {
  Address,
  GridFrame,
  LoadingBox,
  LoadingWrapper,
  VStack,
} from '@fuels/ui';
import { PageTitle } from 'app-commons';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

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

// Stats rise in one after the other once the block has loaded.
function cell(index: number, isLoading?: boolean) {
  if (isLoading) return { className: 'flex-1' };
  return {
    className: 'fuel-rise flex-1',
    style: {
      '--fuel-enter-delay': `${Math.min(index, 6) * 40}ms`,
    } as CSSProperties,
  };
}

export function BlockScreenSimple({
  id,
  block,
  txs,
  producer,
  isLoading,
}: BlockScreenSimpleProps) {
  const { t } = useTranslation();
  return (
    <VStack gap="2" className="relative">
      <GridFrame className="grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4">
        <CardInfo name={t('block.height')} {...cell(0, isLoading)}>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-[68px] h-[20px] mb-[1px]" />}
            regularEl={block?.height}
          />
        </CardInfo>
        <CardInfo name={t('block.producer')} {...cell(1, isLoading)}>
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
          name={t('block.created')}
          {...cell(2, isLoading)}
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
        <CardInfo name={t('block.tx_count')} {...cell(3, isLoading)}>
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="w-12 h-6" />}
            regularEl={block?.header.transactionsCount}
          />
        </CardInfo>
      </GridFrame>

      {/* Transactions section - title always visible */}
      <PageTitle
        as="h2"
        title={t('block.transactions')}
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
