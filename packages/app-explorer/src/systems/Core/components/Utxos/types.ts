import type { GQLUtxoItem as TUtxoItem } from '@fuel-explorer/graphql/sdk';
import type { BoxProps } from '@fuels/ui';

export type UtxoItemType = Partial<Omit<TUtxoItem, '__typename'>>;
export type UtxosProps = BoxProps & {
  assetId?: string;
  items?: UtxoItemType[] | null;
};
