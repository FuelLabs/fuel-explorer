import {
  Address,
  Badge,
  Box,
  Collapsible,
  Flex,
  createComponent,
  useBreakpoints,
} from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';

import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { UtxoItem } from '~/systems/Core/components/UtxoItem/UtxoItem';
import { TxInputCoinProps } from './types';

export const TxInputCoin = createComponent<
  TxInputCoinProps,
  typeof Collapsible
>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    if (!input.assetId) return null;

    const assetId = input.assetId;
    const amount = input.amount;
    const { isMobile } = useBreakpoints();

    return (
      <Collapsible {...props}>
        <Collapsible.Header className="w-full">
          <Flex className="flex flex-col items-center tablet:flex-row gap-2 w-full">
            <Badge
              color="gray"
              className="font-mono ml-14 tablet:ml-0 self-start tablet:self-center justify-center flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              COIN
            </Badge>

            <Flex className="w-full items-start tablet:items-center flex flex-col tablet:flex-row gap-2 tablet:gap-4">
              <AssetItem
                assetId={assetId}
                className="flex-1 text-sm"
                prefix="Asset:"
              >
                <Address
                  prefix="From:"
                  value={input.owner || ''}
                  className="text-white"
                  addressOpts={
                    isMobile ? { trimLeft: 4, trimRight: 2 } : undefined
                  }
                  linkProps={{
                    as: NextLink,
                    href: Routes.accountAssets(input.owner!),
                  }}
                />
              </AssetItem>
              {amount && (
                <Box className="w-full tablet:w-auto tablet:ml-0 justify-between flex flex-row tablet:block pl-14">
                  <Amount
                    hideIcon
                    hideSymbol
                    assetId={assetId}
                    value={bn(amount)}
                  />
                </Box>
              )}
            </Flex>
          </Flex>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title leftIcon={IconCoins} iconColor="text-icon">
            UTXO
          </Collapsible.Title>
          <Collapsible.Body className="p-0">
            <UtxoItem
              key={input.utxoId}
              item={input}
              assetId={assetId}
              index={0}
            />
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
