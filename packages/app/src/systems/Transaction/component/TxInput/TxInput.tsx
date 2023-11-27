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
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { useFuelAsset } from '~/systems/Asset/hooks/useFuelAsset';
import type { UtxoItem } from '~/systems/Core/components/Utxos/Utxos';
import { Utxos } from '~/systems/Core/components/Utxos/Utxos';
import { formatZeroUnits } from '~/systems/Core/utils/format';

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
    const asset = useAsset(assetId);
    const fuelAsset = useFuelAsset(asset);
    if (!asset) return null;

    return (
      <Collapsible {...props}>
        <Collapsible.Header>
          <AssetItem assetId={assetId} className="flex-1">
            <Address
              prefix="From:"
              value={input.owner || ''}
              className="text-white"
              addressOpts={isMobile ? { trimLeft: 4, trimRight: 2 } : undefined}
              linkProps={{
                as: NextLink,
                href: `/account/${input.owner}/assets`,
              }}
            />
          </AssetItem>
          {/*
            I'm just hidding this until we get the output/input design merged 
            https://linear.app/fuel-network/issue/FE-18/change-inputs-and-outputs-component-for-better-relevance
          */}
          {amount && (
            <Text className="text-secondary hidden tablet:block">
              {fuelAsset?.decimals ? (
                <>
                  {bn(amount).format({
                    precision: isMobile ? 3 : undefined,
                    units: fuelAsset.decimals,
                  })}{' '}
                </>
              ) : (
                formatZeroUnits(amount)
              )}
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
                linkProps={{
                  as: NextLink,
                  href: `/contract/${contractId}/assets`,
                }}
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
                prefix="Sender:"
                linkProps={{ as: NextLink, href: `/account/${sender}/assets` }}
              />
              <Address
                value={recipient}
                prefix="Recipient:"
                linkProps={{
                  as: NextLink,
                  href: `/account/${recipient}/assets`,
                }}
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
