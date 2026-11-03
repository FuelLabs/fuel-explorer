import type { BaseProps } from '@fuels/ui';
import {
  Address,
  IconChevronDown,
  LoadingBox,
  LoadingWrapper,
} from '@fuels/ui';
import { bn } from 'fuels';
import { type ReactNode, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { TxExpand } from '~/systems/Transaction/component/TxItem/TxExpand';

import type { GQLBalanceItemFragment } from '@fuel-explorer/graphql';
import { Amount } from '../Amount/Amount';

import type { UtxoItemType } from '~/systems/Core/components/Utxos/types';
import { Utxos } from '../Utxos/Utxos';

type BalanceItemProps = BaseProps<{
  item: Omit<GQLBalanceItemFragment, 'owner' | '__typename'>;
  isLoading?: boolean;
}>;

export function BalanceItem({ item, isLoading, className }: BalanceItemProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const assetId = item.assetId;
  const amount = item.amount;
  const hasUTXOs = !!item.utxos?.length;
  const asset = item;

  return (
    <div
      className={`border-t border-[var(--fuel-border)] first:border-t-0 ${className ?? ''}`}
    >
      <div className="fuel-hover-fill flex min-h-16 items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 flex-col tablet:flex-row tablet:items-center tablet:justify-between">
          <AssetItem assetId={assetId} isLoading={isLoading} asset={asset}>
            <Address
              value={item.assetId}
              prefix={t('tx.id_prefix')}
              isLoading={isLoading}
            />
          </AssetItem>
          <div className="ml-14 mt-2 tablet:ml-0 tablet:mt-0">
            <LoadingWrapper
              isLoading={isLoading}
              loadingEl={
                <div className="flex items-center gap-2">
                  <LoadingBox className="h-5 w-20" />
                  <LoadingBox className="h-4 w-16" />
                </div>
              }
              regularEl={
                <div className="flex items-baseline gap-2">
                  {amount && (
                    <Amount
                      className="text-[16px] text-heading"
                      hideIcon
                      hideSymbol
                      assetId={assetId}
                      value={bn(amount)}
                      decimals={asset.decimals || undefined}
                    />
                  )}
                  {asset.amountInUsd && (
                    <span className="text-[13px] text-[var(--fuel-element-low-em)]">
                      ({asset.amountInUsd})
                    </span>
                  )}
                </div>
              }
            />
          </div>
        </div>
        {hasUTXOs && (
          <ToggleButton
            open={open}
            panelId={panelId}
            label={t(open ? 'asset.hide_utxos' : 'asset.show_utxos')}
            onToggle={() => setOpen((value) => !value)}
          />
        )}
      </div>
      {hasUTXOs && (
        <TxExpand id={panelId} open={open}>
          <Utxos
            items={item.utxos as Array<UtxoItemType>}
            assetId={assetId}
            decimals={asset.decimals}
          />
        </TxExpand>
      )}
    </div>
  );
}

function ToggleButton({
  open,
  panelId,
  label,
  onToggle,
}: {
  open: boolean;
  panelId: string;
  label: ReactNode;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={panelId}
      aria-label={typeof label === 'string' ? label : undefined}
      onClick={onToggle}
      className="fuel-hit relative grid size-8 shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-[var(--fuel-element-low-em)] transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-[var(--fuel-focus)] motion-reduce:transition-none"
    >
      <IconChevronDown
        aria-hidden
        size={16}
        stroke={1.75}
        className={`transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
      />
    </button>
  );
}
