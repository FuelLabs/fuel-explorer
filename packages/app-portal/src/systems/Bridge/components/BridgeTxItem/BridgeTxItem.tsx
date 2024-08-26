import type { Asset as FuelsAsset } from '@fuel-ts/account';
import { Asset, Box, CardList, Flex, Text } from '@fuels/ui';
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
        <Asset asset={asset} iconSize="xs">
          <Asset.Icon />
        </Asset>

        {isLoading ? (
          <ItemLoader />
        ) : (
          <Text className={classes.assetAmountText()}>
            {amount} {asset?.symbol}
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
    cardItem: 'flex flex-row px-4 py-0 min-h-[56px] gap-1 items-center',
    statusTime: 'flex-col gap-y-1 items-end',
    line: 'flex-1',
    timeLoader: 'flex items-center h-[16.8px]',
    ageText: 'text-xs text-heading text-right',
    assetAmountWrapper: 'grow shrink-0 items-center gap-2',
    assetAmountText: 'text-xs text-heading',
  },
});
