import { GroupedOutputType } from '@fuel-explorer/graphql';
import type { GroupedOutput } from '@fuel-explorer/graphql';
import {
  Address,
  Card,
  HStack,
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
import { useAsset } from '~/systems/Asset/hooks/useAsset';

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
              <Text className="flex items-center gap-2 text-md font-medium">
                {title || asset.name}
                {asset.symbol && (
                  <Text className="text-muted text-sm">({asset.symbol})</Text>
                )}
                <Address value={output.assetId} fixed="b256" />
              </Text>
              <HStack>
                <Address prefix="To:" value={output.to}>
                  <Address.Link as={NextLink} href={`/account/${output.to}`}>
                    View Account
                  </Address.Link>
                </Address>
              </HStack>
            </VStack>
          </HStack>
          <HStack align="center">
            {amount && (
              <Text className="text-secondary">
                {bn(amount).format()} {asset.symbol}
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
              <Address prefix="Id:" value={contractId}>
                <Address.Link as={NextLink} href={`/contract/${contractId}`}>
                  View Contract
                </Address.Link>
              </Address>
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
          <HStack align="center" gap="1" className="flex-1 justify-between">
            <Text>Message</Text>
            <VStack gap="1" className="mr-2">
              <Address value={recipient} linkPos="left">
                <Address.Link
                  as={NextLink}
                  href={`/account/${recipient}`}
                  className="w-[60px] text-right"
                >
                  Recipient
                </Address.Link>
              </Address>
              <Address value={output.to} linkPos="left">
                <Address.Link
                  as={NextLink}
                  href={`/account/${output.to}`}
                  className="w-[60px] text-right"
                >
                  To
                </Address.Link>
              </Address>
            </VStack>
          </HStack>
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
