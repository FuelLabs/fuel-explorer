import { GroupedOutputType } from '@fuel-explorer/graphql';
import type {
  ChangeOutput,
  CoinOutput,
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
import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';

import React, { useMemo } from 'react';
import { TxIcon } from '../TxIcon/TxIcon';
import {
  getTooltipText,
  hasCoins,
  isChangeOutput,
  isChangeOutputs,
  isCoinOutputs,
} from './TxOutput.utils';

export type TxOutputProps = CardProps & {
  tx: TransactionItemFragment;
  output: GroupedOutput;
};

type TxOutputCoinsProps = {
  tx: TransactionItemFragment;
  outputs: CoinOutput[];
};

type TxOutputCoinProps = CardProps & {
  tx: TransactionItemFragment;
  output: CoinOutput | ChangeOutput;
};

const TxOutputCoin = createComponent<TxOutputCoinProps, typeof Card>({
  id: 'TxOutputCoin',
  render: (_, { tx, output, ...props }) => {
    const classes = styles();
    if (!output.assetId) return null;
    const assetId = output.assetId;
    const amount = output.amount;

    const isReceiving = useMemo<boolean>(() => {
      const changes = tx.groupedOutputs?.filter((output) => {
        return output?.type === GroupedOutputType.ChangeOutput;
      });
      const change = changes?.find((change) => {
        return change && 'assetId' in change && change.assetId === assetId;
      });
      return change?.to === output.to;
    }, []);

    const isChange = isChangeOutput(output);

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <AssetItem assetId={assetId}>
            <Address
              prefix="To:"
              value={output.to || ''}
              linkProps={{
                as: NextLink,
                href: Routes.accountAssets(output.to!),
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
            <HelperIcon
              message={getTooltipText(tx, isChange || !isReceiving)}
            />
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputCoins = createComponent<
  TxOutputCoinsProps,
  typeof React.Fragment
>({
  id: 'TxOutputCoins',
  render: (_, { outputs, tx }) => {
    return (
      <React.Fragment>
        {outputs.map((output) => {
          return <TxOutputCoin key={output.to} tx={tx} output={output} />;
        })}
      </React.Fragment>
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
    const contractId = output.contractId as string;

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
                  href: Routes.contractAssets(contractId),
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
                  href: Routes.accountAssets(recipient!),
                }}
              />
              <Address
                prefix="To: "
                value={output.to || ''}
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(output.to!),
                }}
              />
            </VStack>
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

export function TxOutput({ tx, output, ...props }: TxOutputProps) {
  tx.outputs;
  if (isCoinOutputs(output.outputs)) {
    return <TxOutputCoins tx={tx} outputs={output.outputs} />;
  }
  if (isChangeOutputs(output.outputs) && !hasCoins(tx)) {
    return <TxOutputCoin tx={tx} output={output.outputs[0]} {...props} />;
  }
  if (output.type === GroupedOutputType.ContractOutput) {
    return <TxOutputContract tx={tx} output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.ContractCreated) {
    return <TxOutputContractCreated tx={tx} output={output} {...props} />;
  }
  if (output.type === GroupedOutputType.MessageOutput) {
    return <TxOutputMessage tx={tx} output={output} {...props} />;
  }
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
