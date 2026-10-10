import { bn, format } from '@fuel-ts/math';
import { Address, BlockieAvatar, LoadingBox, LoadingWrapper } from '@fuels/ui';
import { AddressType } from 'fuels';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { TX_STATUS_CHIP } from '~/systems/Transaction/component/TxItem/txStatusChip';
import type { TransactionNode } from '../../types';
import { TxActivity, TxActivityLoader } from '../TxActivity/TxActivity';
import { TxContractIcon } from '../TxContractIcon/TxContractIcon';
import { TxFullDateTimestamp } from '../TxFullDateTimestamp/TxFullDateTimestamp';
import { TxChip, TxSquare } from '../TxItem/TxChip';
import { TxRise, TxSection } from '../TxItem/TxSection';
import { TxTimeAgoTimestamp } from '../TxTimeAgoTimestamp/TxTimeAgoTimestamp';

type TxScreenProps = (
  | {
      transaction: TransactionNode;
      isLoading?: false;
    }
  | {
      transaction?: TransactionNode;
      isLoading: true;
    }
) & {
  isActivityLoading?: boolean;
};

const detailsLink: Record<AddressType, typeof Routes.accountAssets> = {
  [AddressType.contract]: Routes.contractMintedAssets,
  [AddressType.account]: Routes.accountAssets,
};

export function TxScreenSimple({
  transaction,
  isLoading,
  isActivityLoading,
}: TxScreenProps) {
  const { t } = useTranslation();
  if (!transaction && !isLoading) return null;

  const status = TX_STATUS_CHIP[transaction?.status?.__typename ?? ''];
  const hasSummary = !!transaction?.summary?.length;
  const showTransfersTitle =
    !isLoading && (transaction?.activity || isActivityLoading) && hasSummary;

  return (
    <div className="flex flex-col gap-8">
      <TxRise className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="h-6 w-20" />}
            regularEl={
              <TxChip>
                {transaction?.activity?.project ?? t('tx.transfer')}
              </TxChip>
            }
          />
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="h-6 w-16" />}
            regularEl={
              status && <TxChip kind={status.kind}>{t(status.label)}</TxChip>
            }
          />
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px]">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="h-5 w-16" />}
            regularEl={
              <span className="text-heading">
                <TxTimeAgoTimestamp
                  timeStamp={Number(transaction?.time?.rawUnix)}
                  loading={<LoadingBox className="h-5 w-16" />}
                />
              </span>
            }
          />
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="h-5 w-32" />}
            regularEl={
              <span className="text-[var(--fuel-element-low-em)]">
                <TxFullDateTimestamp
                  timeStamp={Number(transaction?.time?.rawUnix)}
                />
              </span>
            }
          />
        </div>
      </TxRise>

      {!isLoading && isActivityLoading && !transaction?.activity && (
        <TxActivityLoader />
      )}

      {!isLoading && transaction?.activity && (
        <TxRise index={1}>
          <TxActivity activity={transaction.activity} />
        </TxRise>
      )}

      <TxSection
        title={t('tx.token_transfers')}
        index={2}
        hideTitle={!showTransfersTitle}
      >
        <div className="fuel-edge border border-[var(--fuel-line)] px-4 py-4">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={
              <div className="flex flex-col gap-0">
                <div className="flex items-center gap-3">
                  <LoadingBox className="size-8 rounded-full" />
                  <LoadingBox className="h-5 w-40" />
                </div>

                <div className="flex flex-col py-3">
                  {['w-20', 'w-32'].map((w) => (
                    <div
                      key={w}
                      className="relative ml-4 border-l border-[var(--fuel-line)] py-3"
                    >
                      <div className="ml-8 flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                        <LoadingBox className="h-6 w-20" />
                        <LoadingBox className={`h-6 ${w}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <LoadingBox className="size-8 rounded-full" />
                  <LoadingBox className="h-5 w-40" />
                </div>
              </div>
            }
            regularEl={transaction?.summary?.map((operation, index) => (
              <div
                key={`${operation.from?.address}-${operation.to?.address}-${operation.name}`}
                className={
                  index + 1 < (transaction.summary?.length || 0)
                    ? 'mb-8 flex flex-col'
                    : 'mb-2 flex flex-col'
                }
              >
                <div className="flex items-center gap-3">
                  <TxContractIcon
                    contractId={operation.from?.address || ''}
                    size="32px"
                  >
                    <BlockieAvatar
                      address={operation.from?.address || ''}
                      size={32}
                    />
                  </TxContractIcon>
                  {operation.from && (
                    <Address
                      value={operation.from.address}
                      linkProps={{
                        href: detailsLink[operation.from.type](
                          operation.from.address,
                        ),
                      }}
                      isAccount={operation.from.type === AddressType.account}
                    />
                  )}
                </div>
                <div className="flex flex-col py-3">
                  {operation.assetsSent?.map((assetSent) => (
                    <div
                      className="relative ml-4 border-l border-[var(--fuel-line)] py-3"
                      key={assetSent.assetId}
                    >
                      <TxSquare className="absolute top-[22px] -left-[4.5px]" />
                      <div className="ml-8 flex items-center gap-2 mobile:max-tablet:flex-col mobile:max-tablet:items-start">
                        <TxChip>{t('tx.transfer')}</TxChip>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <Amount
                            className="font-medium text-heading"
                            assetId={assetSent.assetId}
                            value={bn(assetSent.amount)}
                            decimals={assetSent.asset?.decimals?.toString()}
                            asset={assetSent.asset}
                          />
                          {assetSent.asset?.amountInUsd && (
                            <span className="text-[13px] text-[var(--fuel-element-low-em)]">
                              ({assetSent.asset?.amountInUsd})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <TxContractIcon
                    contractId={operation.to?.address || ''}
                    size="32px"
                  >
                    <BlockieAvatar
                      address={operation.to?.address || ''}
                      size={32}
                    />
                  </TxContractIcon>

                  <span className="text-[var(--fuel-element-low-em)]">
                    {t('tx.to')}
                  </span>

                  {operation.to && (
                    <Address
                      value={operation.to.address}
                      linkProps={{
                        href: detailsLink[operation.to.type](
                          operation.to.address,
                        ),
                      }}
                      isAccount={operation.to.type === AddressType.account}
                    />
                  )}
                </div>
              </div>
            ))}
          />

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[var(--fuel-border)] pt-3 pl-12">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="h-4 w-5" />}
              regularEl={<span className="fuel-label">{t('tx.fee')}</span>}
            />
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="h-4 w-16" />}
              regularEl={
                <span className="text-xs text-heading">
                  {transaction?.gasCosts?.feeInUsd}
                </span>
              }
            />
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="h-4 w-24" />}
              regularEl={
                <span className="text-xs text-[var(--fuel-element-low-em)]">
                  ({format(bn(transaction?.gasCosts?.fee || 0))} ETH)
                </span>
              }
            />
          </div>
        </div>
      </TxSection>
    </div>
  );
}
