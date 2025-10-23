import type {
  GQLChangeOutput,
  GQLCoinOutput,
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
  createComponent,
  cx,
} from '@fuels/ui';
import { IconArrowUp, IconX } from '@tabler/icons-react';
import { bn } from 'fuels';

import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { txIconTypeMap, typeNameMap } from './constants';
import { styles } from './styles';
import type { TxOutputProps } from './types';

export const TxOutputCoin = createComponent<
  Omit<
    TxOutputProps<GQLChangeOutput | GQLCoinOutput | GQLVariableOutput>,
    'getContractByIndex'
  >,
  typeof Card
>({
  id: 'TxOutputCoin',
  render: (_, { output, txStatus, ...props }) => {
    const classes = styles();
    if (!output.assetId) return null;
    const assetId = output.assetId;
    const amount = output.amount;
    const badgeLabel = typeNameMap?.[output?.__typename] ?? 'UNKNOWN';
    const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Mint';
    const isFailure = txStatus === 'Failure';

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
              txIconTypeFallback={txIconType}
              prefix="Asset:"
              asset={output}
            >
              <Address
                prefix="To:"
                value={output.to || ''}
                linkProps={{
                  href: Routes.accountAssets(output.to!),
                }}
                isAccount
              />
            </AssetItem>
          </Flex>
          <HStack className={classes.amount()}>
            <Icon
              icon={isFailure ? IconX : IconArrowUp}
              data-failure={isFailure}
              className="text-success [&[data-failure=true]]:text-error"
            />
            {!!amount && (
              <HStack align="center">
                <Amount
                  className="text-primary text-base"
                  hideSymbol
                  hideIcon
                  assetId={assetId}
                  value={bn(amount)}
                  decimals={output.decimals || undefined}
                />
                {output.amountInUsd && (
                  <Text className="text-secondary" as="div" size="2">
                    ({output.amountInUsd})
                  </Text>
                )}
              </HStack>
            )}
          </HStack>
        </Card.Header>
      </Card>
    );
  },
});
