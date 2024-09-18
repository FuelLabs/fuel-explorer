import type {
  GQLChangeOutput,
  GQLCoinOutput,
  GQLContractCreated,
  GQLTransactionOutputFragment,
  GQLVariableOutput,
} from '@fuel-explorer/graphql';
import {
  Address,
  Badge,
  Card,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  createComponent,
  cx,
} from '@fuels/ui';
import type { CardProps } from '@fuels/ui';
import { IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { tv } from 'tailwind-variants';
import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { TxIconType } from '~/systems/Transaction/types';
import { TxIcon } from '../TxIcon/TxIcon';
import { isOutput } from './TxOutput.utils';

const typeNameMap: Record<GQLTransactionOutputFragment['__typename'], string> =
  {
    ContractOutput: 'OUTPUT',
    ContractCreated: 'CREATED',
    VariableOutput: 'VARIABLE',
    ChangeOutput: 'CHANGE',
    CoinOutput: 'COIN',
  };

const txIconTypeMap: Record<
  GQLTransactionOutputFragment['__typename'],
  TxIconType
> = {
  ContractOutput: 'Contract',
  ContractCreated: 'Contract Created',
  VariableOutput: 'Mint',
  ChangeOutput: 'Wallet',
  CoinOutput: 'Wallet',
};

type TxOutputProps<T = GQLTransactionOutputFragment> = CardProps & {
  output: T;
};

const TxOutputCoin = createComponent<
  TxOutputProps<GQLChangeOutput | GQLCoinOutput | GQLVariableOutput>,
  typeof Card
>({
  id: 'TxOutputCoin',
  render: (_, { output, ...props }) => {
    const classes = styles();
    if (!output.assetId) return null;
    const assetId = output.assetId;
    const amount = output.amount;
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';
    const txIconTypeFallback = txIconTypeMap?.[output?.__typename] ?? 'Mint';

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <Badge
            color="gray"
            className="font-mono justify-center ml-14 tablet:ml-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
            size="1"
          >
            {badgeLabel}
          </Badge>
          <Flex className={classes.content()}>
            <AssetItem
              assetId={assetId}
              txIconTypeFallback={txIconTypeFallback}
            >
              <Address
                prefix="To:"
                value={output.to || ''}
                linkProps={{
                  as: NextLink,
                  href: Routes.accountAssets(output.to!),
                }}
              />
            </AssetItem>
          </Flex>
          <HStack className={classes.amount()}>
            <Icon icon={IconArrowUp} className="text-success" />
            {!!amount && (
              <Amount
                hideSymbol
                hideIcon
                assetId={assetId}
                value={bn(amount)}
              />
            )}
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});

const TxOutputContractCreated = createComponent<
  TxOutputProps<GQLContractCreated>,
  typeof Card
>({
  id: 'TxOutputContractCreated',
  render: (_, { output, ...props }) => {
    const classes = styles();
    const contractId = output.contract;
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';

    return (
      <Card {...props} className={cx('py-3', props.className)}>
        <Card.Header className={classes.header()}>
          <Flex className={classes.content()}>
            <Badge
              color="gray"
              className="font-mono justify-center ml-14 tablet:ml-0 tablet:flex min-w-[70px] w-[70px] max-w-[70px] items-center"
              size="1"
            >
              {badgeLabel}
            </Badge>
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
          </Flex>
        </Card.Header>
      </Card>
    );
  },
});

export function TxOutput({ output, ...props }: TxOutputProps) {
  if (
    isOutput<GQLVariableOutput>(output, 'VariableOutput') ||
    isOutput<GQLChangeOutput>(output, 'ChangeOutput') ||
    isOutput<GQLCoinOutput>(output, 'CoinOutput')
  ) {
    return <TxOutputCoin output={output} {...props} />;
  }
  if (isOutput<GQLContractCreated>(output, 'ContractCreated')) {
    return <TxOutputContractCreated output={output} {...props} />;
  }

  return null;
}

const styles = tv({
  slots: {
    header:
      'group gap-2 flex flex-col tablet:flex-row items-start tablet:items-center',
    amount: 'flex items-center gap-2 ml-14 tablet:ml-0',
    content: 'gap-4 justify-between items-center flex-1',
    icon: 'transition-transform group-data-[state=closed]:hover:rotate-180 group-data-[state=open]:rotate-180',
    utxos: 'bg-gray-2 mx-4 py-3 px-4 rounded',
  },
});
