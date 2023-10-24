import type { GroupedInput, InputCoin } from '@fuel-explorer/graphql';
import {
  Card,
  Copyable,
  EntityItem,
  HStack,
  IconButton,
  Text,
  VStack,
  createComponent,
  cx,
  shortAddress,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import Image from 'next/image';
import { useState } from 'react';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { Address } from '~/systems/Core/components/Address/Address';

import { TxIcon } from '../TxIcon/TxIcon';

const ICON_SIZE = 36;

export type TxInputProps = CardProps & {
  input: GroupedInput;
};

const TxInputCoin = createComponent<TxInputProps, typeof Card>({
  id: 'TxInputCoin',
  render: (_, { input, ...props }) => {
    const [opened, setOpened] = useState(false);
    const classes = styles();
    const assetId = input.assetId;
    const amount = input.totalAmount;
    const inputs = input.inputs as InputCoin[];
    const asset = useAsset(assetId);

    if (!asset) return null;
    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header
          className={classes.header()}
          data-state={opened ? 'opened' : 'closed'}
        >
          <HStack align="center">
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
            <VStack gap="0">
              <Text className="text-md font-medium">
                {asset.name}
                {asset.symbol && (
                  <Text className="ml-2 text-muted text-sm">
                    ({asset.symbol})
                  </Text>
                )}
              </Text>
              <Address
                label="From"
                id={input.owner}
                link={(id) => `/account/${id}`}
                linkLabel="View Account"
              />
            </VStack>
          </HStack>
          <HStack align="center">
            {amount && (
              <Text className="text-secondary">
                {bn(amount).format()} {asset.symbol}
              </Text>
            )}
            <IconButton
              iconColor="text-muted"
              variant="link"
              className={classes.icon()}
              icon={opened ? IconChevronUp : IconChevronDown}
              onClick={() => setOpened(!opened)}
            />
          </HStack>
        </Card.Header>
        {opened && (
          <Card.Body className={classes.utxos()}>
            <Text as="div" className="text-xs border-b pb-1 border-border mb-2">
              UTXOs
            </Text>
            {inputs?.map((input: InputCoin) => (
              <HStack key={input.utxoId} align="center" justify="between">
                <Copyable
                  className="text-xs leading-relaxed"
                  value={input.utxoId}
                >
                  {shortAddress(input.utxoId, 14, 14)}
                </Copyable>
                <Text className="text-xs leading-relaxed text-muted">
                  {bn(input.amount).format()} {asset.symbol}
                </Text>
              </HStack>
            ))}
          </Card.Body>
        )}
      </Card>
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
              <Address id={contractId} label="Id" />
            </EntityItem.Info>
          </EntityItem>
        </Card.Header>
      </Card>
    );
  },
});

const TxInputMessage = createComponent<TxInputProps, typeof Card>({
  id: 'TxInputMessage',
  render: (_, { input, ...props }) => {
    const classes = styles();
    const [opened, setOpened] = useState(false);
    const { sender, recipient, data } = input;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header
          className={classes.header()}
          data-state={opened ? 'opened' : 'closed'}
        >
          <TxIcon type="Message" status="Submitted" />
          <VStack gap="1" className="flex-1">
            <Text>Message</Text>
            <HStack>
              <Address
                label="From"
                id={sender}
                link={(id) => `/account/${id}`}
              />
              <Address
                label="To"
                id={recipient}
                link={(id) => `/account/${id}`}
              />
            </HStack>
          </VStack>
          <IconButton
            iconColor="text-muted"
            variant="link"
            className={classes.icon()}
            icon={opened ? IconChevronUp : IconChevronDown}
            onClick={() => setOpened(!opened)}
          />
        </Card.Header>
        {opened && (
          <Card.Body className={classes.utxos()}>
            <Text as="div" className="text-xs border-b pb-1 border-border mb-2">
              Data
            </Text>
            <Text as="p" className="text-xs leading-normal">
              {data}
            </Text>
          </Card.Body>
        )}
      </Card>
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
    utxos: 'bg-gray-3 mx-4 py-3 px-4 rounded',
  },
});
