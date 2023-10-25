import type { GroupedInput, InputCoin } from '@fuel-explorer/graphql';
import {
  Address,
  Card,
  EntityItem,
  HStack,
  Collapsible,
  Text,
  VStack,
  createComponent,
  cx,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import type { UtxoItem } from '~/systems/Account/components/Utxos/Utxos';
import { Utxos } from '~/systems/Account/components/Utxos/Utxos';
import { useAsset } from '~/systems/Asset/hooks/useAsset';

import { TxIcon } from '../TxIcon/TxIcon';

const ICON_SIZE = 36;

export type TxInputProps = CardProps & {
  input: GroupedInput;
};

const TxInputCoin = createComponent<TxInputProps, typeof Collapsible>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    const assetId = input.assetId;
    const amount = input.totalAmount;
    const inputs = input.inputs as InputCoin[];
    const asset = useAsset(assetId);

    if (!asset) return null;
    return (
      <Collapsible {...props}>
        <Collapsible.Header>
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
          <VStack gap="0" className="flex-1">
            <Text className="text-md font-medium">
              {asset.name}
              {asset.symbol && (
                <Text className="ml-2 text-muted text-sm">
                  ({asset.symbol})
                </Text>
              )}
            </Text>
            <Address prefix="From:" value={input.assetId} fixed="b256" />
          </VStack>
          {amount && (
            <Text className="text-secondary">
              {bn(amount).format()} {asset.symbol}
            </Text>
          )}
        </Collapsible.Header>
        <Utxos items={inputs satisfies UtxoItem[]} assetId={assetId} />
      </Collapsible>
    );
  },
});

const TxInputContract = createComponent<TxInputProps, typeof Card>({
  id: 'TxInputContract',
  render: (_, { input, ...props }) => {
    const classes = styles();
    const contractId = input.contractId;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <EntityItem>
            <EntityItem.Slot>
              <TxIcon status="Submitted" type="Contract" />
            </EntityItem.Slot>
            <EntityItem.Info title="Contract Input">
              <Address value={contractId} prefix="Id:" />
            </EntityItem.Info>
          </EntityItem>
        </Card.Header>
      </Card>
    );
  },
});

const TxInputMessage = createComponent<TxInputProps, typeof Collapsible>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const { sender, recipient, data } = input;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <TxIcon type="Message" status="Submitted" />
          <HStack align="center" gap="1" className="flex-1 justify-between">
            <Text>Message</Text>
            <VStack gap="1" className="mr-2">
              <Address value={sender} linkPos="left">
                <Address.Link
                  as={NextLink}
                  href={`/account/${sender}`}
                  className="w-[60px] text-right"
                >
                  Sender
                </Address.Link>
              </Address>
              <Address value={recipient} linkPos="left">
                <Address.Link
                  as={NextLink}
                  href={`/account/${recipient}`}
                  className="w-[60px] text-right"
                >
                  Recipient
                </Address.Link>
              </Address>
            </VStack>
          </HStack>
        </Collapsible.Header>
        <Collapsible.Content>
          <Collapsible.Title>Data</Collapsible.Title>
          <Collapsible.Body className="text-xs leading-normal">
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
  if (input.type === 'InputContract') {
    return <TxInputContract input={input} {...props} />;
  }
  if (input.type === 'InputMessage') {
    return <TxInputMessage input={input} {...props} />;
  }
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
  },
});
