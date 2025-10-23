import { Collapsible, useBreakpoints } from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
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

export function Utxos({ items, assetId, decimals, ...props }: UtxosProps) {
  return (
    <Collapsible.Content className="bg-gray-2 dark:bg-gray-1" {...props}>
      <Collapsible.Title leftIcon={IconCoins} iconColor="text-icon">
        UTXOs ({items?.length ?? 0})
      </Collapsible.Title>
      <Collapsible.Body className="p-0">
        <VirtualList items={items} assetId={assetId} decimals={decimals} />
      </Collapsible.Body>
    </Collapsible.Content>
  );
}
