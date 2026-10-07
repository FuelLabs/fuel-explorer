import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import {
  Address,
  HStack,
  HelperIcon,
  IconArrowUp,
  Link,
  LoadingBox,
  LoadingWrapper,
  Tooltip,
  VStack,
} from '@fuels/ui';
import { DECIMAL_FUEL, bn } from 'fuels';

import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';

import { formatZeroUnits } from 'app-commons';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import type { InputContract } from '~/systems/Transaction/component/TxInput/TxInputContract/types';

import { TxFullDateTimestamp } from '~/systems/Transaction/component/TxFullDateTimestamp/TxFullDateTimestamp';
import { TxTimeAgoTimestamp } from '~/systems/Transaction/component/TxTimeAgoTimestamp/TxTimeAgoTimestamp';
import { useFormatBalance } from '~staking/systems/Core/hooks/useFormatBalance';
import { TxInput } from '../../component/TxInput/TxInput';
import { TxOutput } from '../../component/TxOutput/TxOutput';
import type { TransactionNode, TxIconType, TxStatus } from '../../types';
import { TxIcon } from '../TxIcon/TxIcon';
import { TxChip, type TxChipKind } from '../TxItem/TxChip';
import { TxFact } from '../TxItem/TxFact';
import { TxItem, TxItemGroup } from '../TxItem/TxItem';
import { TxRise, TxSection } from '../TxItem/TxSection';
import { TxItemLoader } from '../TxItemLoader';
import { TxPolicies } from '../TxPolicies/TxPolicies';
import { TxScripts } from '../TxScripts/TxScripts';

type TxScreenProps =
  | {
      transaction: TransactionNode;
      isLoading?: false;
    }
  | {
      transaction?: TransactionNode;
      isLoading: true;
    };

const STATUS_CHIP: Record<string, { kind: TxChipKind; label: string }> = {
  Success: { kind: 'success', label: 'tx.status.success' },
  Failure: { kind: 'failed', label: 'tx.status.failed' },
  Submitted: { kind: 'pending', label: 'tx.status.pending' },
  Info: { kind: 'neutral', label: 'tx.status.info' },
  Warning: { kind: 'pending', label: 'tx.status.waiting' },
};

export function TxScreenStandard({
  transaction: tx,
  isLoading,
}: TxScreenProps) {
  const { t } = useTranslation();
  const title = tx?.title as string;
  const classes = styles();
  const statusChip = STATUS_CHIP[tx?.statusType as string];

  const facts = [
    <TxFact key="type">
      <div className="flex items-center gap-4">
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="size-11 rounded-full" />}
          regularEl={
            <TxIcon
              type={title as TxIconType}
              size="lg"
              status={tx?.hasPredicate ? 'Info' : (tx?.statusType as TxStatus)}
            />
          }
        />
        <div className="flex min-w-0 flex-col gap-2">
          <LoadingWrapper
            isLoading={isLoading}
            loadingEl={<LoadingBox className="h-6 w-20" />}
            regularEl={<span className="font-medium">{title}</span>}
          />
          <HStack gap="1" className="flex-wrap">
            {tx?.hasPredicate && <TxChip>{t('tx.predicate')}</TxChip>}
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={<LoadingBox className="h-6 w-20" />}
              regularEl={
                <TxChip kind={statusChip?.kind}>
                  {statusChip ? t(statusChip.label) : tx?.statusType}
                </TxChip>
              }
            />
          </HStack>
        </div>
      </div>
    </TxFact>,
    <TxFact
      key="timestamp"
      label={t('tx.timestamp')}
      description={
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="mt-1 h-5 w-40" />}
          regularEl={
            <TxFullDateTimestamp timeStamp={tx?.time?.rawUnix as any} />
          }
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="h-6 w-24" />}
        regularEl={
          <TxTimeAgoTimestamp
            timeStamp={tx?.time?.rawUnix as any}
            loading={<LoadingBox className="h-6 w-24" />}
          />
        }
      />
    </TxFact>,
    (tx?.blockHeight || isLoading) && (
      <TxFact key="block" label={t('tx.block')}>
        <LoadingWrapper
          isLoading={isLoading}
          loadingEl={<LoadingBox className="h-6 w-28" />}
          regularEl={
            <Link
              href={`/block/${tx?.blockHeight}/simple`}
              className="text-link"
            >
              #{tx?.blockHeight}
            </Link>
          }
        />
      </TxFact>
    ),
    <TxFact
      key="fee"
      label={t('tx.network_fee')}
      description={
        <LoadingWrapper
          isLoading={isLoading}
          regularEl={t('tx.gas_used', {
            gas: formatZeroUnits(tx?.gasCosts?.gasUsed || ''),
          })}
          loadingEl={<LoadingBox className="mt-2 h-4 w-28" />}
        />
      }
    >
      <LoadingWrapper
        isLoading={isLoading}
        loadingEl={<LoadingBox className="h-6 w-36" />}
        regularEl={
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span>{tx?.gasCosts?.feeInUsd}</span>
            <span className="text-[13px] text-[var(--fuel-element-low-em)]">
              ({bn(tx?.gasCosts?.fee ?? 0).format()} ETH)
            </span>
          </div>
        }
      />
    </TxFact>,
    <TxPolicies key="policies" transaction={tx} isLoading={isLoading} />,
  ];

  return (
    <div className={classes.wrapper()}>
      <TxRise>
        <TxItemGroup className="fuel-edge">{facts}</TxItemGroup>
      </TxRise>
      <ContentMain tx={tx} isLoading={isLoading} />
    </div>
  );
}

// A 1px vertical line joins the sections where arrows used to be.
function Connector() {
  return <div aria-hidden className="mx-auto h-8 w-px bg-[var(--fuel-line)]" />;
}

function ContentMain({
  tx,
  isLoading,
}: {
  tx: TransactionNode | undefined;
  isLoading?: boolean;
}) {
  const { t } = useTranslation();
  const hasInputs = !!tx?.groupedInputs?.length;
  const hasOutputs = !!tx?.outputs?.length;

  const getContractByIndex = useCallback(
    (index: number) => {
      return tx?.inputs?.[index] as InputContract | undefined;
    },
    [tx?.inputs],
  );

  return (
    <div className="flex min-w-0 flex-col">
      <TxSection title={t('tx.inputs')} index={1}>
        <LoadingWrapper
          isLoading={isLoading}
          repeatLoader={2}
          noItems={!hasInputs}
          loadingEl={<TxItemLoader />}
          regularEl={
            <TxItemGroup>
              {tx?.inputs?.map((input, i) => (
                <TxInput
                  key={`${i}-${input?.__typename}`}
                  input={
                    input as
                      | NonNullable<
                          GQLTransactionItemFragment['inputs']
                        >[number]
                      | undefined
                  }
                />
              ))}
            </TxItemGroup>
          }
          noItemsEl={
            <EmptyCard hideImage>
              <EmptyCard.Title>{t('tx.no_inputs')}</EmptyCard.Title>
              <EmptyCard.Description>
                {t('tx.no_inputs_body')}
              </EmptyCard.Description>
            </EmptyCard>
          }
        />
      </TxSection>
      <Connector />
      <TxScripts tx={tx} isLoading={isLoading} index={2} />
      <Connector />
      {tx?.isMint ? (
        <MintOutputs tx={tx} isLoading={Boolean(isLoading)} />
      ) : (
        <TxSection title={t('tx.outputs')} index={3}>
          <LoadingWrapper
            isLoading={isLoading}
            repeatLoader={2}
            noItems={!hasOutputs}
            loadingEl={<TxItemLoader />}
            regularEl={
              <TxItemGroup>
                {tx?.outputs?.map((output, i) => (
                  <TxOutput
                    // here we use only index as key because this component will not change
                    key={i}
                    output={output}
                    getContractByIndex={getContractByIndex}
                    txStatus={tx?.statusType}
                  />
                ))}
              </TxItemGroup>
            }
            noItemsEl={
              <EmptyCard hideImage>
                <EmptyCard.Title>{t('tx.no_outputs')}</EmptyCard.Title>
                <EmptyCard.Description>
                  {t('tx.no_outputs_body')}
                </EmptyCard.Description>
              </EmptyCard>
            }
          />
        </TxSection>
      )}
    </div>
  );
}

function MintOutputs({
  tx,
  isLoading,
}: {
  tx: TransactionNode;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const inputContractId = tx.inputContract?.contractId;
  const hasInputContract = Boolean(inputContractId);

  const amount = bn(tx.mintAmount);

  const { formatted, original } = useFormatBalance(amount, DECIMAL_FUEL);

  const content = (
    <TxItemGroup>
      <TxItem
        label={t('tx.minted')}
        trailing={
          <div className="flex flex-wrap items-center gap-2 tablet:justify-end">
            <IconArrowUp
              aria-hidden
              size={16}
              className="text-[var(--fuel-brand-text)]"
            />
            <span>{tx.mintAmountUsd}</span>
            <Tooltip content={`${original.display} ETH`}>
              <span className="text-[13px] text-[var(--fuel-element-low-em)]">
                ({formatted.display} ETH)
              </span>
            </Tooltip>
            <HelperIcon message={t('tx.minted_help')} />
          </div>
        }
      >
        {tx.mintAssetId && tx.mintedAsset && (
          <AssetItem
            assetId={tx.mintAssetId}
            prefix={t('tx.asset_prefix')}
            asset={tx.mintedAsset}
          >
            <Address
              prefix={t('tx.id_prefix')}
              value={tx.mintAssetId}
              linkProps={{
                href: Routes.accountAssets(tx.mintAssetId),
              }}
            />
          </AssetItem>
        )}
      </TxItem>
      {hasInputContract && (
        <TxItem label={t('tx.input_contract')}>
          <Address
            value={inputContractId || ''}
            linkProps={{
              href: Routes.accountAssets(inputContractId!),
            }}
          />
        </TxItem>
      )}
      {tx.txPointer && (
        <TxItem label={t('tx.tx_pointer_label')}>
          <Address full value={tx.txPointer} />
        </TxItem>
      )}
    </TxItemGroup>
  );

  return (
    <TxSection title={t('tx.minted_assets')} index={3}>
      <LoadingWrapper
        isLoading={isLoading}
        regularEl={content}
        loadingEl={
          <TxItemGroup>
            <VStack className="gap-2 px-4 py-3">
              <LoadingBox className="h-6 w-40" />
              <LoadingBox className="h-6 w-40" />
              <LoadingBox className="h-6 w-40" />
            </VStack>
          </TxItemGroup>
        }
      />
    </TxSection>
  );
}

const styles = tv({
  slots: {
    wrapper: [
      'grid grid-cols-1 gap-10 laptop:grid-cols-[300px_1fr] laptop:items-start',
    ],
  },
});
