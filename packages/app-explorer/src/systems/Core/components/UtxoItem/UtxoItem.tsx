import { Address, Box, useBreakpoints } from '@fuels/ui';
import { bn, toBytes, toHex } from 'fuels';
import NextLink from 'next/link';
import { useMemo } from 'react';
import { Routes } from '~/routes';

import { Amount } from '../Amount/Amount';
import { TX_ID_SIZE, UTXO_ID_SIZE } from './constants';
import { styles } from './styles';
import { UtxoItemProps } from './types';

export function UtxoItem({ item, style, assetId, index }: UtxoItemProps) {
  const { isMobile } = useBreakpoints();

  const txId = useMemo<string | null>(() => {
    if (!item.utxoId) return null;
    const bytes = toBytes(item.utxoId, UTXO_ID_SIZE).slice(0, TX_ID_SIZE);
    return toHex(bytes, TX_ID_SIZE);
  }, []);

  if (!txId) return null;

  const trim = isMobile ? 8 : 16;
  const { item: itemStyle } = styles({
    color: index % 2 !== 0 ? 'odd' : undefined,
  });

  return (
    <Box style={style} className={itemStyle()}>
      <Address
        prefix="ID:"
        value={item.utxoId}
        className="flex-col items-start gap-1 flex-1 tablet:flex-row tablet:items-center tablet:gap-4"
        addressOpts={{ trimLeft: trim, trimRight: trim }}
        linkProps={{
          as: NextLink,
          href: Routes.txSimple(txId),
        }}
      />
      <Amount
        hideSymbol
        hideIcon
        assetId={assetId}
        value={bn(item.amount)}
        className="text-xs"
        iconSize={14}
      />
    </Box>
  );
}
