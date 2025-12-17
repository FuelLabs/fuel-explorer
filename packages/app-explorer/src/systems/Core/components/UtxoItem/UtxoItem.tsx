import { Address, Box } from '@fuels/ui';
import { bn, toBytes, toHex } from 'fuels';

import { useMemo } from 'react';

import { Routes as CommonRoutes } from 'app-commons';
import { Amount } from '../Amount/Amount';
import { TX_ID_SIZE, UTXO_ID_SIZE } from './constants';
import { styles } from './styles';
import type { UtxoItemProps } from './types';

export function UtxoItem({
  item,
  style,
  assetId,
  index,
  decimals,
}: UtxoItemProps) {
  const txId = useMemo<string | null>(() => {
    if (!item.utxoId) return null;
    const bytes = toBytes(item.utxoId, UTXO_ID_SIZE).slice(0, TX_ID_SIZE);
    return toHex(bytes, TX_ID_SIZE);
  }, []);

  if (!txId) return null;

  const { item: itemStyle } = styles({
    color: index % 2 !== 0 ? 'odd' : undefined,
  });

  return (
    <Box style={style} className={itemStyle()}>
      <Address
        prefix="ID:"
        value={item.utxoId}
        className="flex-1 gap-1 tablet:gap-4"
        linkProps={{
          href: CommonRoutes.txSimple(txId),
        }}
      />
      <Amount
        hideSymbol
        hideIcon
        assetId={assetId}
        value={bn(item.amount)}
        className="text-primary text-xs"
        iconSize={14}
        decimals={decimals || ''}
      />
    </Box>
  );
}
