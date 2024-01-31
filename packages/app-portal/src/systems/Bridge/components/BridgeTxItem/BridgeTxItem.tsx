import { cssObj } from '@fuel-ui/css';
import { Box, Text, Icon, CardList } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { AssetLogo } from '~/systems/Assets/components/AssetLogo';
import type { Asset } from '~/systems/Assets/services/asset';
import { calculateDateDiff, shortAddress } from '~/systems/Core';

import { ItemLoader } from './ItemLoader';

type BridgeTxItemProps = {
  date?: Date;
  fromLogo: ReactNode;
  toLogo: ReactNode;
  asset?: Asset;
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
  return (
    <CardList.Item
      css={styles.cardItem}
      aria-label={`Transaction ID: ${shortAddress(txId)}`}
      onClick={onClick}
    >
      <Box.Flex gap={'$1'}>
        {fromLogo}
        <Icon icon="ArrowNarrowRight" />
        {toLogo}
      </Box.Flex>
      <Box.Flex align="center" gap="$1">
        {isLoading ? (
          <ItemLoader />
        ) : (
          <>
            <AssetLogo asset={asset} alt={asset?.symbol} />
            <Text fontSize="sm" css={styles.assetAmountText}>
              {amount} {asset?.symbol}
            </Text>
          </>
        )}
      </Box.Flex>
      <Box.Flex css={styles.statusTime} justify={'space-between'}>
        {isLoading ? (
          <ItemLoader />
        ) : (
          <Text css={styles.ageText}>{calculateDateDiff(date)}</Text>
        )}
        <Box.Flex
          css={styles.statusColumn}
          align="center"
          justify="flex-end"
          aria-label={`Transaction Status: ${status?.toString()}`}
        >
          {status}
        </Box.Flex>
      </Box.Flex>
    </CardList.Item>
  );
};

const styles = cssObj({
  cardItem: cssObj({
    // This minHeight ensures component size equals loader size
    minHeight: 24,
    gap: '$6',
    alignItems: 'center',
  }),
  statusTime: cssObj({
    flex: 1,
    '@media (max-width: 400px)': {
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      gap: '$1',
    },
  }),
  line: cssObj({
    flex: 1,
  }),
  ageText: cssObj({
    fontSize: '$xs',
    color: '$intentsBase12',
  }),
  assetAmountText: cssObj({
    color: '$intentsBase12',
  }),
});
