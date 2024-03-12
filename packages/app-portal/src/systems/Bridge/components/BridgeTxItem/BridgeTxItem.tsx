import type { Asset as FuelsAsset } from '@fuels/assets';
import { Asset, CardList, Flex, Text } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { calculateDateDiff, shortAddress } from '~portal/systems/Core';

import { tv } from 'tailwind-variants';
import { ItemLoader } from './ItemLoader';

type BridgeTxItemProps = {
  date?: Date;
  fromLogo: ReactNode;
  toLogo: ReactNode;
  asset?: FuelsAsset;
  onClick: () => void;
  status: ReactNode;
  txId?: string;
  amount?: string;
  isLoading?: boolean;
};

export const BridgeTxItem = ({
  date,
  asset,
  onClick,
  fromLogo,
  toLogo,
  status,
  txId,
  amount,
  isLoading,
}: BridgeTxItemProps) => {
  const classes = styles();

  return (
    <CardList.Item
      aria-label={`Transaction ID: ${shortAddress(txId)}`}
      onClick={onClick}
      className={classes.cardItem()}
    >
      <Flex className={classes.networks()}>
        {fromLogo}
        <IconArrowRight size={16} />
        {toLogo}
      </Flex>
      <Flex className={classes.assetAmountWrapper()}>
        {isLoading ? (
          <ItemLoader />
        ) : (
          <>
            <Asset asset={asset} iconSize="xs">
              <Asset.Icon />
            </Asset>
            <Text className={classes.assetAmountText()}>
              {amount} {asset?.symbol}
            </Text>
          </>
        )}
      </Flex>
      <Flex className={classes.statusTime()}>
        <Flex
          className={classes.statusColumn()}
          aria-label={`Transaction Status: ${status?.toString()}`}
        >
          {status}
        </Flex>
        {isLoading ? (
          <ItemLoader />
        ) : (
          <Text className={classes.ageText()}>{calculateDateDiff(date)}</Text>
        )}
      </Flex>
    </CardList.Item>
  );
};

const styles = tv({
  slots: {
    networks: 'shrink-0 gap-1 items-center',
    cardItem: 'flex flex-row min-h-[58px] px-5 gap-1 items-center',
    statusTime: [
      'grow',
      'shrink flex-wrap gap-x-3 gap-y-1',
      'flex-col tablet:flex-row-reverse',
      'items-end tablet:items-center',
    ],
    statusColumn: 'items-center, justify-end',
    line: 'flex-1',
    // TODO: to activate text-heading and theme colors, should fix first light/dark css variables not being set
    ageText: 'text-xs text-heading text-nowrap',
    assetAmountWrapper: 'grow shrink-0 items-center gap-2',
    assetAmountText: 'text-xs text-heading text-nowrap',
  },
});
