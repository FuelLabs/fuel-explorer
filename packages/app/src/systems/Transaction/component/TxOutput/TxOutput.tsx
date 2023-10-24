import { GroupedOutputType } from '@fuel-explorer/graphql';
import type { GroupedOutput } from '@fuel-explorer/graphql';
import { Card, HStack, Text, VStack, createComponent, cx } from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { bn } from 'fuels';
import Image from 'next/image';
import { tv } from 'tailwind-variants';
import { useAsset } from '~/systems/Asset/hooks/useAsset';
import { Address } from '~/systems/Core/components/Address/Address';

import { TxIcon } from '../TxIcon/TxIcon';

const ICON_SIZE = 36;

export type TxOutputProps = CardProps & {
  output: GroupedOutput;
  title?: string;
};

const TxOutputCoin = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputCoin',
  render: (_, { output, title, ...props }) => {
    const classes = styles();
    const assetId = output.assetId;
    const amount = output.totalAmount;
    const asset = useAsset(assetId);

    if (!asset) return null;
    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
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
                {title || asset.name}
                {asset.symbol && (
                  <Text className="ml-2 text-muted text-sm">
                    ({asset.symbol})
                  </Text>
                )}
              </Text>
              <Address
                label="To"
                id={output.to}
                link={(id) => `/account/${id}`}
                linkLabel="View Account"
              />
            </VStack>
          </HStack>
          <HStack align="center">
            {amount && (
              <Text className="text-secondary">
                {bn(amount).format({ precision: 3 })} {asset.symbol}
              </Text>
            )}
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputContract = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputContract',
  render: (_, { output, ...props }) => {
    const classes = styles();

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <HStack align="center">
            <TxIcon status="Submitted" type="Contract" />
            <VStack gap="1">
              <Text className="font-medium">Contract Output</Text>
              <Text className="text-sm text-secondary">
                Input Index: {output.inputIndex}
              </Text>
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputContractCreated = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputContractCreated',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const contractId = output.contract?.id as string;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <HStack align="center">
            <TxIcon status="Success" type="Contract" />
            <VStack gap="1">
              <Text className="font-medium">Contract Created</Text>
              <Address label="Id" id={contractId} />
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputMessage = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputMessage',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const { recipient } = output;

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <TxIcon type="Message" status="Submitted" />
          <VStack gap="1" className="flex-1">
            <HStack gap="2" align="center">
              <Text>Message</Text>
            </HStack>
            <HStack>
              <Address
                label="From"
                id={recipient}
                link={(id) => `/account/${id}`}
              />
              <Address
                label="From"
                id={output.to}
                link={(id) => `/account/${id}`}
              />
            </HStack>
          </VStack>
        </Card.Header>
      </Card>
    );
  },
});

export function TxOutput({ output, ...props }: TxOutputProps) {
  if (output.type === GroupedOutputType.CoinOutput) {
    return <TxOutputCoin output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.VariableOutput) {
    return <TxOutputCoin output={output} {...props} title="Variable Output" />;
  }
  if (output.type === GroupedOutputType.ChangeOutput) {
    return <TxOutputCoin output={output} {...props} title="Change Output" />;
  }
  if (output.type === GroupedOutputType.ContractOutput) {
    return <TxOutputContract output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.ContractCreated) {
    return <TxOutputContractCreated output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.MessageOutput) {
    return <TxOutputMessage output={output} {...props} />;
  }
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
