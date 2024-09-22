import type { CSSProperties } from 'react';
import type { UtxoItemType } from '~/systems/Core/components/Utxos/types';

export type UtxoItemProps = {
  item: UtxoItemType;
  assetId?: string;
  style?: CSSProperties;
  index: number;
};
