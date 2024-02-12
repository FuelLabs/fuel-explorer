import type { GroupedInput, InputCoin } from '@fuel-explorer/graphql';
import {
  Address,
  Box,
  Collapsible,
  HStack,
  Text,
  VStack,
  createComponent,
  useBreakpoints,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import type { UtxoItem } from '~/systems/Core/components/Utxos/Utxos';
import { Utxos } from '~/systems/Core/components/Utxos/Utxos';

import { TxIcon } from '../TxIcon/TxIcon';

export type TxInputProps = CardProps & {
  input: GroupedInput;
};

const TxInputCoin = createComponent<TxInputProps, typeof Collapsible>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    if (!input.assetId) return null;

    const assetId = input.assetId;
    const amount = input.totalAmount;
    const inputs = input.inputs as InputCoin[];
    const { isMobile } = useBreakpoints();

    return (
      <Collapsible {...props}>
        <Collapsible.Header className="gap-2 tablet:gap-4">
          <AssetItem assetId={assetId} className="flex-1">
            <Address
              prefix="From:"
              value={input.owner || ''}
              className="text-white"
              addressOpts={isMobile ? { trimLeft: 4, trimRight: 2 } : undefined}
              linkProps={{
                as: NextLink,
                href: Routes.accountAssets(input.owner!),
              }}
            />
          </AssetItem>
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
        <Utxos items={inputs satisfies UtxoItem[]} assetId={assetId} />
      </Collapsible>
    );
  },
});

const TxInputMessage = createComponent<TxInputProps, typeof Collapsible>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const { sender, recipient, data } = input;

    if (!sender || !recipient) return null;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <TxIcon type="Message" status="Submitted" />
          <HStack className="gap-1 flex-col tablet:flex-row tablet:items-center tablet:flex-1">
            <Text className="hidden tablet:block">Message</Text>
            <VStack className="gap-1 tablet:flex-1 tablet:items-end">
              <Address
                value={sender}
                prefix="Sender:"
                linkProps={{ as: NextLink, href: Routes.accountAssets(sender) }}
              />
              <Address
                value={recipient}
                prefix="Recipient:"
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(recipient),
                }}
              />
            </VStack>
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Data</Collapsible.Title>
          <Collapsible.Body className="text-xs leading-normal text-wrap break-all">
            {data}
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});

export function TxInput({ input, ...props }: TxInputProps) {
  if (input.type === 'InputCoin') {
    return <TxInputCoin input={input} {...props} />;
  }
  if (input.type === 'InputMessage') {
    return <TxInputMessage input={input} {...props} />;
  }
}
