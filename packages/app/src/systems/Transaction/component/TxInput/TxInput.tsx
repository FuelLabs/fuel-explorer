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
  useBreakpoints,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import type { UtxoItem } from '~/systems/Core/components/Utxos/Utxos';
import { Utxos } from '~/systems/Core/components/Utxos/Utxos';

import { TxIcon } from '../TxIcon/TxIcon';

const ICON_SIZE = 36;

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
    const asset = useAsset(assetId);
    const { isMobile } = useBreakpoints();

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
            <Text className="flex items-center gap-2 text-md font-medium">
              {asset.name}
              {asset.symbol && (
                <Text className="ml-2 text-muted text-sm">
                  ({asset.symbol})
                </Text>
              )}
              <Address
                value={assetId}
                fixed="b256"
                /*
                 * I'm just hidding this until we get the output/input design merged
                 * https://linear.app/fuel-network/issue/FE-18/change-inputs-and-outputs-component-for-better-relevance
                 */
                className="hidden tablet:block"
                addressOpts={
                  isMobile ? { trimLeft: 4, trimRight: 2 } : undefined
                }
              />
            </Text>
            <Address
              prefix="From:"
              value={input.owner || ''}
              className="text-white"
              addressOpts={isMobile ? { trimLeft: 4, trimRight: 2 } : undefined}
              linkProps={{ as: NextLink, href: `/account/${input.owner}` }}
            />
          </VStack>
          {/*
            I'm just hidding this until we get the output/input design merged 
            https://linear.app/fuel-network/issue/FE-18/change-inputs-and-outputs-component-for-better-relevance
          */}
          {amount && (
            <Text className="text-secondary hidden tablet:block">
              {bn(amount).format({ precision: isMobile ? 3 : undefined })}{' '}
              {asset.symbol}
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

    if (!input.contractId) return null;
    const contractId = input.contractId;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <EntityItem>
            <EntityItem.Slot>
              <TxIcon status="Submitted" type="Contract" />
            </EntityItem.Slot>
            <EntityItem.Info title="Contract Input">
              <Address
                value={contractId}
                prefix="Id:"
                linkProps={{ as: NextLink, href: `/contract/${contractId}` }}
              />
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

    if (!sender || !recipient) return null;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <TxIcon type="Message" status="Submitted" />
          <HStack align="center" gap="1" className="flex-1">
            <Text>Message</Text>
            <VStack gap="1" className="ml-4">
              <Address
                value={sender}
                linkProps={{ as: NextLink, href: `/account/${sender}` }}
              />
              <Address
                value={recipient}
                linkProps={{ as: NextLink, href: `/account/${recipient}` }}
              />
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
