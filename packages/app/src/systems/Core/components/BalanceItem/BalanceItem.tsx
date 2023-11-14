import type { AccountBalanceFragment } from '@fuel-explorer/graphql';
import { CHAIN_IDS, getAssetFuel } from '@fuels/assets';
import type { BaseProps } from '@fuels/ui';
import {
  createComponent,
  Text,
  VStack,
  Address,
  Collapsible,
  useBreakpoints,
  Flex,
} from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import { useMemo } from 'react';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { TxIcon } from '~/systems/Transaction/component/TxIcon/TxIcon';

import type { UtxoItem } from '../Utxos/Utxos';
import { Utxos } from '../Utxos/Utxos';

const ICON_SIZE = 36;

type BalanceItemProps = BaseProps<{
  item: Omit<AccountBalanceFragment, 'owner' | '__typename'>;
}>;

export const BalanceItem = createComponent<
  BalanceItemProps,
  typeof Collapsible
>({
  id: 'BalanceItem',
  render: (_, { item, ...props }) => {
    const assetId = item.assetId;
    const amount = item.amount;
    const { isMobile } = useBreakpoints();
    const asset = useAsset(assetId);
    if (!asset) return null;

    const fuelAsset = useMemo(
      () => getAssetFuel(asset, CHAIN_IDS.fuel.beta4),
      [asset.assetId, asset.networks.length],
    );
    const hasUTXOs = !!item.utxos?.length;

    return (
      <Collapsible {...props}>
        <Collapsible.Header hideIcon={!hasUTXOs}>
          {asset.icon ? (
            <Image
              src={asset.icon as string}
              width={ICON_SIZE}
              height={ICON_SIZE}
              alt={asset.name}
            />
          ) : (
            <TxIcon type="Mint" status="Submitted" />
          )}
          <Flex className="flex-1 flex-col tablet:flex-row tablet:justify-between tablet:items-center">
            <VStack gap="1">
              <Text className="text-md font-medium">
                {asset.name}
                {!isMobile && asset.symbol && (
                  <Text className="ml-2 text-muted text-sm">
                    ({asset.symbol})
                  </Text>
                )}
              </Text>
              {!isMobile && (
                <Address value={item.assetId} prefix="Id:" fixed="b256" />
              )}
            </VStack>
            {amount && (
              <Text className="text-secondary">
                {fuelAsset?.decimals ? (
                  <>
                    {bn(amount).format({
                      precision: fuelAsset.decimals,
                      units: fuelAsset.decimals,
                    })}{' '}
                    {asset.symbol}
                  </>
                ) : (
                  amount
                )}
              </Text>
            )}
          </Flex>
        </Collapsible.Header>
        {hasUTXOs && (
          <Utxos items={item.utxos as UtxoItem[]} assetId={assetId} />
        )}
      </Collapsible>
    );
  },
});
