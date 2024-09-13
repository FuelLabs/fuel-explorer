import {
  Address,
  Badge,
  Box,
  Collapsible,
  Flex,
  HStack,
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
import { BADGE_WIDTH } from '../constants';
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
        <Collapsible.Header className="gap-2 tablet:gap-4">
          <HStack className="items-center justify-center">
            <Flex
              className={`w-[${BADGE_WIDTH}] max-w-[${BADGE_WIDTH}] items-center justify-center`}
            >
              <Badge color="gray" className="font-mono" size="1">
                COIN
              </Badge>
            </Flex>
            <AssetItem assetId={assetId} className="flex-1">
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
          </HStack>
          {amount && (
            <Box className="ml-14 tablet:ml-0">
              <Amount
                hideIcon
                hideSymbol
                assetId={assetId}
                value={bn(amount)}
              />
            </Box>
          )}
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
