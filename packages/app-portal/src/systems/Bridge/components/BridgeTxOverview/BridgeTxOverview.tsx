import { cssObj } from '@fuel-ui/css';
import { Box, Text, FuelLogo, Image, Icon } from '@fuel-ui/react';
import type { BigNumberish } from 'fuels';
import { calculateDateDiff } from '~/systems/Core';

type BridgeTxOverviewProps = {
  transactionId: BigNumberish;
  date?: Date;
  isDeposit?: boolean;
  asset: {
    imageUrl?: string;
    assetSymbol?: string;
    assetAmount?: string;
  };
};

export const BridgeTxOverview = ({
  transactionId,
  date,
  isDeposit,
  asset,
}: BridgeTxOverviewProps) => {
  return (
    <Box.Stack css={styles.stack}>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>ID</Text>
        <Text css={styles.infoText}>{transactionId.toString()}</Text>
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Age</Text>
        <Text css={styles.infoText}>{calculateDateDiff(date)}</Text>
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Direction</Text>
        {isDeposit ? (
          <Box.Flex css={styles.directionInfo}>
            <Text css={styles.subtleText}>(Deposit)</Text>
            <Image
              width={18}
              height={18}
              src={asset.imageUrl}
              alt={'Deposit'}
            />
            <Icon icon="ArrowNarrowRight" />
            <FuelLogo size={17} />
          </Box.Flex>
        ) : (
          <Box.Flex css={styles.directionInfo}>
            <Text css={styles.subtleText}>(Withdrawal)</Text>
            <FuelLogo size={17} />
            <Icon icon="ArrowNarrowRight" />
            <Image
              width={18}
              height={18}
              src={asset.imageUrl}
              alt={'withdrawal'}
            />
          </Box.Flex>
        )}
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Asset</Text>
        <Box.Flex css={styles.directionInfo}>
          <Image
            width={18}
            height={18}
            src={asset.imageUrl}
            alt={asset.assetSymbol}
          />
          <Text aria-label="Asset amount" css={styles.infoText}>
            {asset.assetAmount}
          </Text>
          <Text css={styles.infoText}>{asset.assetSymbol}</Text>
        </Box.Flex>
      </Box.Flex>
    </Box.Stack>
  );
};

const styles = {
  stack: cssObj({
    width: '100%',
  }),
  txItem: cssObj({
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }),
  labelText: cssObj({
    fontSize: '$sm',
    color: '$intentsBase11',
  }),
  subtleText: cssObj({
    fontSize: '$xs',
    color: '$intentsBase10',
  }),
  infoText: cssObj({
    fontSize: '$sm',
    color: '$intentsBase12',
  }),
  directionInfo: cssObj({
    gap: '$1',
    alignItems: 'center',
  }),
};
