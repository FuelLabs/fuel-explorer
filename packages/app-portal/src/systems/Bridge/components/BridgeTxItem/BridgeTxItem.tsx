import { cssObj } from '@fuel-ui/css';
import { Box, Text, Image, Icon, CardList } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { calculateDateDiff } from '~/systems/Core';

type BridgeTxItemProps = {
  date?: Date;
  fromLogo: ReactNode;
  toLogo: ReactNode;
  asset: {
    assetImageSrc: ReactNode | string;
    assetAmount: string;
    assetSymbol: string;
  };
  onClick: () => void;
  status: ReactNode;
};

export const BridgeTxItem = ({
  date,
  asset,
  onClick,
  fromLogo,
  toLogo,
  status,
}: BridgeTxItemProps) => {
  return (
    <CardList.Item css={styles.root} variant="outlined" onClick={onClick}>
      <Box.Flex css={styles.wrapper}>
        <Box css={styles.ageColumn}>
          <Text css={styles.ageText}>{calculateDateDiff(date)}</Text>
        </Box>
        <Box.Flex css={styles.txColumn}>
          <Box.Flex>
            {fromLogo}
            <Icon icon="ArrowNarrowRight" />
            {toLogo}
          </Box.Flex>
          <Box.Flex align="center" gap="$1">
            {typeof asset.assetImageSrc === 'string' ? (
              <Image
                width={18}
                height={18}
                src={asset.assetImageSrc}
                alt={asset.assetSymbol}
              />
            ) : (
              asset.assetImageSrc
            )}
            <Text
              aria-label="Asset amount"
              fontSize="sm"
              css={styles.assetAmountText}
            >
              {asset.assetAmount} {asset.assetSymbol}
            </Text>
          </Box.Flex>
          <Box.Flex css={styles.statusColumn} align="center" justify="flex-end">
            {status}
          </Box.Flex>
        </Box.Flex>
      </Box.Flex>
    </CardList.Item>
  );
};

const styles = cssObj({
  root: cssObj({
    display: 'flex',

    '@md': {
      alignItems: 'center',
      p: '$4 !important',
    },
  }),
  wrapper: cssObj({
    gap: '$0',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    '@md': {
      flexWrap: 'nowrap',
    },
  }),
  ageColumn: {
    flex: '1 0 100%',

    '@md': {
      flex: '0 0 108px',
      pr: '$1',
    },
  },
  ageText: cssObj({
    fontSize: '$xs',
    color: '$intentsBase12',
  }),
  txColumn: cssObj({
    gap: '$2',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  }),
  directionInfo: cssObj({
    gap: '$1',
  }),
  statusColumn: {
    flex: '0 0 90px',
  },
  assetAmountText: cssObj({
    color: '$intentsBase12',
  }),
});
