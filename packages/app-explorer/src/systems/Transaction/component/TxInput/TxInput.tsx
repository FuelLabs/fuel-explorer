import type { GQLTransactionItemFragment } from '@fuel-explorer/graphql';
import type { CardProps } from '@fuels/ui';
import {
  Address,
  Box,
  Collapsible,
  Flex,
  HStack,
  Text,
  VStack,
  createComponent,
  useBreakpoints,
} from '@fuels/ui';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';

import { IconCode, IconCoins } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
import { UtxoItem } from '~/systems/Core/components/Utxos/Utxos';
import { TxIcon } from '../TxIcon/TxIcon';

type InputCoin = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputCoin' }
>;
type InputMessage = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputMessage' }
>;
type InputContract = Extract<
  NonNullable<GQLTransactionItemFragment['inputs']>[number],
  { __typename: 'InputContract' }
>;

export type TxInputProps = CardProps & {
  input: NonNullable<GQLTransactionItemFragment['inputs']>[number] | undefined;
};

export type TxInputCoinProps = TxInputProps & {
  input: InputCoin;
};

export type TxInputMessageProps = TxInputProps & {
  input: InputMessage;
};

export type TxInputContractProps = TxInputProps & {
  input: InputContract;
};

const TxInputContract = createComponent<
  TxInputContractProps,
  typeof Collapsible
>({
  id: 'TxInputContract',
  render: (_, { input, ...props }) => {
    const { utxoId, balanceRoot, txPointer, contractId } = input;
    const { isMobile } = useBreakpoints();
    const trim = isMobile ? 8 : 16;
    const classes = styles();

    return (
      <Collapsible {...props}>
        <Collapsible.Header className="gap-2 tablet:gap-4">
          <HStack align="center">
            <Flex className="w-10 h-10 items-center justify-center overflow-clip rounded-full">
              <TxIcon type="ContractCall" status="Submitted" />
            </Flex>
            <VStack className="flex-1" gap="0">
              <Text className="flex items-center gap-2 text-md">Contract</Text>
              <Address
                prefix="Address: "
                value={contractId}
                className="text-white"
                addressOpts={
                  isMobile ? { trimLeft: 4, trimRight: 2 } : undefined
                }
                linkProps={{
                  as: NextLink,
                  href: Routes.contractAssets(contractId),
                }}
              />
            </VStack>
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title leftIcon={IconCode} iconColor="text-icon">
            Data
          </Collapsible.Title>
          <Collapsible.Body className="p-0">
            <VStack className="p-2 px-4">
              <Address
                prefix="ID:"
                value={contractId}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
                linkProps={{
                  as: NextLink,
                  href: Routes.contractCode(contractId),
                }}
              />
              <Address
                prefix="UTXO ID:"
                value={utxoId}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
                linkProps={{
                  as: NextLink,
                  href: Routes.txSimple(utxoId),
                }}
              />
              <Address
                prefix="Balance Root:"
                value={balanceRoot}
                className={classes.contractAddress()}
                addressOpts={{ trimLeft: trim, trimRight: trim }}
                linkProps={{
                  as: NextLink,
                  href: Routes.contractAssets(contractId),
                }}
              />
              <HStack gap="1">
                <Text className="text-xs text-secondary font-mono mr-px">
                  Tx Pointer:
                </Text>
                <Text className="text-xs text-secondary font-mono">
                  {txPointer}
                </Text>
              </HStack>
            </VStack>
          </Collapsible.Body>
        </Collapsible.Content>
      </Collapsible>
    );
  },
});

const TxInputCoin = createComponent<TxInputCoinProps, typeof Collapsible>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    if (!input.assetId) return null;

    const assetId = input.assetId;
    const amount = input.amount;
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

const TxInputMessage = createComponent<TxInputMessageProps, typeof Collapsible>(
  {
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
                  linkProps={{
                    as: NextLink,
                    href: Routes.accountAssets(sender),
                  }}
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
  },
);

export function TxInput({ input, ...props }: TxInputProps) {
  switch (input?.__typename) {
    case 'InputCoin':
      return <TxInputCoin input={input as InputCoin} {...props} />;
    case 'InputMessage':
      return <TxInputMessage input={input as InputMessage} {...props} />;
    case 'InputContract':
      return <TxInputContract input={input as InputContract} {...props} />;
    default:
      return null;
  }
}

const styles = tv({
  slots: {
    item: [
      'flex flex-col p-2 px-4 gap-2',
      'tablet:flex-row',
      'last:rounded-b-sm',
      'fuel-[Address]:text-[0.8rem] fuel-[Address]:leading-none',
    ],
    contractAddress:
      'flex-col items-start gap-1 flex-1 tablet:flex-row tablet:items-center tablet:gap-4',
  },
});
