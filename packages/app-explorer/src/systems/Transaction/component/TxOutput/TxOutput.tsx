import { GQLGroupedOutputType } from '@fuel-explorer/graphql-new';
import type {
  GQLGroupedOutput,
  GQLGroupedOutputChanged,
  GQLGroupedOutputCoin,
  GQLGroupedOutputContractCreated,
  GQLTransactionDetailsFragment,
} from '@fuel-explorer/graphql-new';
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

import { TxIcon } from '../TxIcon/TxIcon';

function getTooltipText(
  tx: GQLTransactionDetailsFragment,
  output: GQLGroupedOutput,
) {
  if (tx.isMint) {
    return 'This is the amount minted in the transaction';
  }
  if (output.__typename === 'GroupedOutputChanged') {
    return 'This is the amount remaining after transaction';
  }
  return 'This is the amount spent in the transaction';
}

export type TxOutputProps = CardProps & {
  tx: GQLTransactionDetailsFragment;
  output: GQLGroupedOutput;
};

export type TxOutputCoinProps = TxOutputProps & {
  tx: GQLTransactionDetailsFragment;
  output: GQLGroupedOutputCoin | GQLGroupedOutputChanged;
};

export type TxOutputOutputContractCreatedProps = TxOutputProps & {
  tx: GQLTransactionDetailsFragment;
  output: GQLGroupedOutputContractCreated;
};

const TxOutputCoin = createComponent<TxOutputCoinProps, typeof Card>({
  id: 'TxOutputCoin',
  render: (_, { tx, output, ...props }) => {
    const classes = styles();
    if (!output.assetId) return null;
    const assetId = output.assetId;
    const amount = output.totalAmount;
    const isReceiving =
      output.type === GQLGroupedOutputType.OutputContractCreated ||
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
            <HelperIcon message={getTooltipText(tx, output)} />
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputOutputContractCreated = createComponent<
  TxOutputOutputContractCreatedProps,
  typeof Card
>({
  id: 'TxOutputOutputContractCreated',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const contractId = output.contractId ?? '';
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

export function TxOutput({ output, ...props }: TxOutputProps) {
  if (
    output.type === GQLGroupedOutputType.OutputCoin ||
    output.type === GQLGroupedOutputType.OutputChanged
  ) {
    return (
      <TxOutputCoin
        output={output as GQLGroupedOutputChanged | GQLGroupedOutputCoin}
        {...props}
      />
    );
  }
  if (output.type === GQLGroupedOutputType.OutputContractCreated) {
    return (
      <TxOutputOutputContractCreated
        output={output as GQLGroupedOutputContractCreated}
        {...props}
      />
    );
  }
}

const styles = tv({
  slots: {
    header: 'group flex flex-row gap-4 justify-between items-center',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
