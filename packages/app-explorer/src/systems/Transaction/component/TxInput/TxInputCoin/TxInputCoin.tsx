import { Address } from '@fuels/ui';
import { bn } from 'fuels';
import { useTranslation } from 'react-i18next';

import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { UtxoItem } from '~/systems/Core/components/UtxoItem/UtxoItem';
import { TxAmount } from '../../TxItem/TxAmount';
import { TxItem } from '../../TxItem/TxItem';
import type { TxInputCoinProps } from './types';

export function TxInputCoin({ input }: TxInputCoinProps) {
  const { t } = useTranslation();
  if (!input.assetId) return null;

  const assetId = input.assetId;
  const amount = input.amount;

  return (
    <TxItem
      label={t('tx.input_type.coin')}
      trailing={
        amount ? (
          <TxAmount
            hideIcon
            hideSymbol
            assetId={assetId}
            value={bn(amount)}
            decimals={input.decimals || undefined}
            usd={input.amountInUsd}
          />
        ) : null
      }
      details={
        <>
          <span className="fuel-label">{t('tx.utxo')}</span>
          <div className="-mx-4 -mb-3">
            <UtxoItem
              key={input.utxoId}
              item={input}
              assetId={assetId}
              index={0}
              decimals={input.decimals || undefined}
            />
          </div>
        </>
      }
    >
      <AssetItem
        assetId={assetId}
        className="text-sm"
        prefix={t('tx.asset_prefix')}
        asset={input}
      >
        <Address
          prefix={t('tx.from_prefix')}
          value={input.owner || ''}
          linkProps={{
            href: Routes.accountAssets(input.owner!),
          }}
          isAccount
        />
      </AssetItem>
    </TxItem>
  );
}
