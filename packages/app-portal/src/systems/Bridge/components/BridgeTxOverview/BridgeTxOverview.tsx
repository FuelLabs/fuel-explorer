import { cssObj } from '@fuel-ui/css';
import { Box, FuelLogo, Icon, Link, Text } from '@fuel-ui/react';
import type { BigNumberish } from 'fuels';
import { AssetLogo } from '~portal/systems/Assets/components/AssetLogo';
import type { Asset } from '~portal/systems/Assets/services/asset';
import { calculateDateDiff } from '~portal/systems/Core';

import { InfoTextLoader } from './InfoTextLoader';

type BridgeTxOverviewProps = {
  transactionId: BigNumberish;
  date?: Date;
  isDeposit?: boolean;
  asset?: Asset;
  ethAsset?: Asset;
  isLoading?: boolean;
  amount?: string;
  explorerLink?: string;
};

export const BridgeTxOverview = ({
  transactionId,
  date,
  isDeposit,
  asset,
  ethAsset,
  isLoading,
  amount,
  explorerLink,
}: BridgeTxOverviewProps) => {
  return (
    <Box.Stack css={styles.stack}>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>ID</Text>
        <Link isExternal href={explorerLink} css={styles.linkText}>
          <Box aria-label="Transaction ID">{transactionId.toString()}</Box>
        </Link>
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Age</Text>
        <Text css={styles.infoText}>
          {isLoading ? <InfoTextLoader /> : calculateDateDiff(date)}
        </Text>
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Direction</Text>
        {isDeposit ? (
          <Box.Flex css={styles.directionInfo}>
            <Text css={styles.subtleText}>(Deposit)</Text>
            {ethAsset && <AssetLogo asset={ethAsset} alt={'Deposit'} />}
            <Icon icon="ArrowNarrowRight" />
            <FuelLogo size={17} />
          </Box.Flex>
        ) : (
          <Box.Flex css={styles.directionInfo}>
            <Text css={styles.subtleText}>(Withdrawal)</Text>
            <FuelLogo size={17} />
            <Icon icon="ArrowNarrowRight" />
            <AssetLogo asset={ethAsset} alt={'withdrawal'} />
          </Box.Flex>
        )}
      </Box.Flex>
      <Box.Flex css={styles.txItem}>
        <Text css={styles.labelText}>Asset</Text>
        <Box.Flex css={styles.directionInfo}>
          {isLoading ? (
            <InfoTextLoader />
          ) : (
            <>
              <AssetLogo asset={asset} alt={`Asset ${asset?.symbol}`} />
              <Text aria-label="Asset amount" css={styles.infoText}>
                {amount}
              </Text>
              <Text css={styles.infoText}>{asset?.symbol}</Text>
            </>
          )}
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
  linkText: cssObj({
    fontSize: '$sm',
    color: '$intentsPrimary9',
  }),
  directionInfo: cssObj({
    gap: '$1',
    alignItems: 'center',
  }),
};
