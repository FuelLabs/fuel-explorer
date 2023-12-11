import { GroupedOutputType } from '@fuel-explorer/graphql';
import type {
  GroupedOutput,
  TransactionItemFragment,
} from '@fuel-explorer/graphql';
import {
  Address,
  Card,
  HStack,
  HelperIcon,
  Icon,
  Text,
  VStack,
  createComponent,
  cx,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';

import { TxIcon } from '../TxIcon/TxIcon';

function getTooltipText(tx: TransactionItemFragment, output: GroupedOutput) {
  if (tx.isMint) {
    return 'This is the amount minted in the transaction';
  }
  if (output.type === GroupedOutputType.ChangeOutput) {
    return 'This is the amount remaining after transaction';
  }
  return 'This is the amount spent in the transaction';
}

export type TxOutputProps = CardProps & {
  tx: TransactionItemFragment;
  output: GroupedOutput;
};

const TxOutputCoin = createComponent<TxOutputProps, typeof Card>({
  id: 'TxOutputCoin',
  render: (_, { tx, output, ...props }) => {
    const classes = styles();
    if (!output.assetId) return null;
    const assetId = output.assetId;
    const amount = output.totalAmount;
    const isReceiving =
      output.type === GroupedOutputType.ChangeOutput ||
      (output.outputs?.length === 1 &&
        output.outputs[0]?.__typename === 'CoinOutput');

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <AssetItem assetId={assetId}>
            <Address
              prefix="To:"
              value={output.to || ''}
              linkProps={{
                as: NextLink,
                href: `/account/${output.to}/assets`,
              }}
            />
          </AssetItem>
          {/*
            I'm just hidding this until we get the output/input design merged 
            https://linear.app/fuel-network/issue/FE-18/change-inputs-and-outputs-component-for-better-relevance
          */}
          <HStack className="hidden tablet:flex items-center gap-2">
            <Icon
              icon={isReceiving ? IconArrowUp : IconArrowDown}
              className={isReceiving ? 'text-success' : 'text-error'}
            />
            {amount && (
              <Amount
                hideSymbol
                hideIcon
                assetId={assetId}
                value={bn(amount)}
              />
            )}
            <HelperIcon message={getTooltipText(tx, output)} />
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
              <Address
                prefix="Id:"
                value={contractId}
                linkProps={{
                  as: NextLink,
                  href: `/contract/${contractId}/assets`,
                }}
              />
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
              <Address
                prefix="From: "
                value={recipient || ''}
                linkProps={{
                  as: NextLink,
                  href: `/account/${recipient}/assets`,
                }}
              />
              <Address
                prefix="To: "
                value={output.to || ''}
                linkProps={{
                  as: NextLink,
                  href: `/account/${output.to}/assets`,
                }}
              />
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

export function TxOutput({ output, ...props }: TxOutputProps) {
  if (
    output.type === GroupedOutputType.CoinOutput ||
    output.type === GroupedOutputType.ChangeOutput
  ) {
    return <TxOutputCoin output={output} {...props} />;
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
