import type { Asset as FuelsAsset } from '@fuels/assets';
import { Asset, CardList, Flex, Text } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { calculateDateDiff, shortAddress } from '~/systems/Core';

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
        {isLoading ? (
          <ItemLoader />
        ) : (
          <Text className={classes.ageText()}>{calculateDateDiff(date)}</Text>
        )}
        <Flex
          className={classes.statusColumn()}
          aria-label={`Transaction Status: ${status?.toString()}`}
        >
          {status}
        </Flex>
      </Flex>
    </CardList.Item>
  );
};

const styles = tv({
  slots: {
    networks: 'gap-1',
    cardItem: 'flex flex-row min-h-[24px] gap-6 items-center',
    statusTime: [
      'flex-1 justify-between',
      'mobile:max-tablet:flex-col-reverse mobile:max-tablet:flex-wrap',
      'mobile:max-tablet:items-end mobile:max-tablet:gap-1',
    ],
    statusColumn: 'items-center, justify-end',
    line: 'flex-1',
    // TODO: to activate text-heading and theme colors, should fix first light/dark css variables not being set
    ageText: 'text-xs text-heading',
    assetAmountWrapper: 'items-center gap-2',
    assetAmountText: 'text-xs text-heading',
  },
});
