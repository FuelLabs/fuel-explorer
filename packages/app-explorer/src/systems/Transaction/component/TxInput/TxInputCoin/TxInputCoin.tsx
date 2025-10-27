import {
  Address,
  Badge,
  Box,
  Collapsible,
  Flex,
  HStack,
  Text,
  createComponent,
} from '@fuels/ui';
import { IconCoins } from '@tabler/icons-react';
import { bn } from 'fuels';

import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { UtxoItem } from '~/systems/Core/components/UtxoItem/UtxoItem';
import type { TxInputCoinProps } from './types';

export const TxInputCoin = createComponent<
  TxInputCoinProps,
  typeof Collapsible
>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    if (!input.assetId) return null;

    const assetId = input.assetId;
    const amount = input.amount;

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
                asset={input}
              >
                <Address
                  prefix="From:"
                  value={input.owner || ''}
                  linkProps={{
                    href: Routes.accountAssets(input.owner!),
                  }}
                  isAccount
                />
              </AssetItem>
              {amount && (
                <Box className="w-full tablet:w-auto tablet:ml-0 justify-between flex flex-row tablet:block pl-14">
                  <HStack align="center">
                    <Amount
                      className="text-primary text-base"
                      hideIcon
                      hideSymbol
                      assetId={assetId}
                      value={bn(amount)}
                      decimals={input.decimals || undefined}
                    />
                    {input.amountInUsd && (
                      <Text className="text-secondary" as="div" size="2">
                        ({input.amountInUsd})
                      </Text>
                    )}
                  </HStack>
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
              decimals={input.decimals || undefined}
            />
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});
