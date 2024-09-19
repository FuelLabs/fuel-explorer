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
  createComponent,
  cx,
} from '@fuels/ui';
import { IconArrowUp } from '@tabler/icons-react';
import { bn } from 'fuels';
import NextLink from 'next/link';
import { Routes } from '~/routes';
import { AssetItem } from '~/systems/Asset/components/AssetItem/AssetItem';
import { Amount } from '~/systems/Core/components/Amount/Amount';
import { txIconTypeMap, typeNameMap } from './constants';
import { styles } from './styles';
import type { TxOutputProps } from './types';

export const TxOutputCoin = createComponent<
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
    const txIconType = txIconTypeMap?.[output?.__typename] ?? 'Mint';

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
