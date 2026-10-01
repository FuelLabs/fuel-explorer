import { Asset, Box, CardList, Flex, Text } from '@fuels/ui';
import { IconArrowRight } from '@fuels/ui';
import type { Asset as FuelsAsset } from 'fuels';
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
        <IconArrowRight size={16} className={classes.arrow()} />
        {toLogo}
      </Flex>
      <Flex className={classes.assetAmountWrapper()}>
        <Asset asset={asset} iconSize="xs">
          <Asset.Icon />
        </Asset>

        {isLoading ? (
          <ItemLoader />
        ) : (
          <Text className={classes.assetAmountText()}>
            <span className="fuel-stat-sm">{amount}</span>
            <span className="fuel-label ml-2">{asset?.symbol}</span>
          </Text>
        )}
      </Flex>
      <Flex className={classes.statusTime()}>
        {status}

        {isLoading ? (
          <Box className={classes.timeLoader()}>
            <ItemLoader />
          </Box>
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
    arrow:
      'transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none',
    // A flat row in a framed list: the card ring and rounding are removed so
    // rows share hairlines instead of stacking as separate cards.
    cardItem: [
      'group flex flex-row px-4 py-0 min-h-[64px] gap-3 items-center',
      'rounded-none border-0 border-t border-[var(--fuel-border)] first:border-t-0',
      'bg-transparent after:!shadow-none hover:bg-[var(--fuel-muted)] hover:border-[var(--fuel-border)]',
    ],
    statusTime: 'flex-col gap-y-1 items-end',
    line: 'flex-1',
    timeLoader: 'flex items-center h-[16.8px]',
    ageText: 'fuel-label text-right',
    assetAmountWrapper: 'grow shrink-0 items-center gap-2',
    assetAmountText: 'text-heading',
  },
});
