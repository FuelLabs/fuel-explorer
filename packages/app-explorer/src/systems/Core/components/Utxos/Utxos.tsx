import { useBreakpoints } from '@fuels/ui';
import { useTranslation } from 'react-i18next';
import { FixedSizeList as List } from 'react-window';

import { UtxoItem } from '~/systems/Core/components/UtxoItem/UtxoItem';
import type { UtxosProps } from './types';

function VirtualList({ items, assetId, decimals }: UtxosProps) {
  const { isMobile } = useBreakpoints();

  const itemSize = isMobile ? 60 : 35;
  const len = items?.length ?? 0;
  return (
    <List
      height={len >= 10 ? 350 : itemSize * len}
      itemCount={items?.length ?? 0}
      width="100%"
      itemSize={itemSize}
    >
      {({ index: idx, style }) => {
        const item = items?.[idx];
        return (
          item && (
            <UtxoItem
              key={item.utxoId}
              style={style}
              item={item}
              assetId={assetId}
              index={idx}
              decimals={decimals}
            />
          )
        );
      }}
    </List>
  );
}

export function Utxos({
  items,
  assetId,
  decimals,
  className,
  ...props
}: UtxosProps) {
  const { t } = useTranslation();
  return (
    <div
      {...props}
      className={`border-t border-[var(--fuel-border)] bg-[var(--fuel-card)] ${className ?? ''}`}
    >
      <div className="fuel-label px-4 pt-3 pb-2">
        {t('asset.utxos', { count: items?.length ?? 0 })}
      </div>
      <VirtualList items={items} assetId={assetId} decimals={decimals} />
    </div>
  );
}
