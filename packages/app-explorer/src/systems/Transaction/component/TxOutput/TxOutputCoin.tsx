import type {
  GQLChangeOutput,
  GQLCoinOutput,
  GQLVariableOutput,
} from '@fuel-explorer/graphql';
import { Address, IconArrowUp, IconX } from '@fuels/ui';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { TxAmount } from '../TxItem/TxAmount';
import { TxItem } from '../TxItem/TxItem';
import { txIconTypeMap, typeNameMap } from './constants';
import type { TxOutputProps } from './types';

type TxOutputCoinProps = Pick<
  TxOutputProps<GQLChangeOutput | GQLCoinOutput | GQLVariableOutput>,
  'output' | 'txStatus'
>;

export function TxOutputCoin({ output, txStatus }: TxOutputCoinProps) {
  const { t } = useTranslation();
  if (!output.assetId) return null;
  const assetId = output.assetId;
  const amount = output.amount;
  const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Mint';
  const isFailure = txStatus === 'Failure';
  const Marker = isFailure ? IconX : IconArrowUp;

  return (
    <TxItem
      label={t(typeNameMap?.[output?.__typename] ?? 'tx.output_type.unknown')}
      trailing={
        <div className="flex items-center gap-2 tablet:justify-end">
          <Marker
            aria-hidden
            size={16}
            className={
              isFailure
                ? 'text-[var(--red-10)]'
                : 'text-[var(--fuel-brand-text)]'
            }
          />
          {!!amount && (
            <TxAmount
              hideSymbol
              hideIcon
              assetId={assetId}
              value={bn(amount)}
              decimals={output.decimals || undefined}
              usd={output.amountInUsd}
            />
          )}
        </div>
      }
    >
      <AssetItem
        assetId={assetId}
        txIconTypeFallback={txIconType}
        prefix={t('tx.asset_prefix')}
        asset={output}
      >
        <Address
          prefix={t('tx.to_prefix')}
          value={output.to || ''}
          linkProps={{
            href: Routes.accountAssets(output.to!),
          }}
          isAccount
        />
      </AssetItem>
    </TxItem>
  );
}
