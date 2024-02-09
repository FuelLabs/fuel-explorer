import { FuelLogo } from '@fuel-ui/react';
import type { Asset } from '@fuels/assets';
import type { BigNumberish } from 'fuels';
import { AssetLogo } from '~/systems/Assets/components/AssetLogo';
import { calculateDateDiff } from '~/systems/Core';

import { Box, Flex, Link, Text, VStack } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import { tv } from 'tailwind-variants';
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
  const classes = styles();

  return (
    <VStack className={classes.stack()} gap="2">
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>ID</Text>
        <Link isExternal href={explorerLink} className={classes.linkText()}>
          <Box aria-label="Transaction ID">{transactionId.toString()}</Box>
        </Link>
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>Age</Text>
        <Text className={classes.infoText()}>
          {isLoading ? <InfoTextLoader /> : calculateDateDiff(date)}
        </Text>
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>Direction</Text>
        {isDeposit ? (
          <Flex className={classes.directionInfo()}>
            <Text className={classes.subtleText()}>(Deposit)</Text>
            {ethAsset && <AssetLogo asset={ethAsset} alt={'Deposit'} />}
            <IconArrowRight size={16} />
            <FuelLogo size={17} />
          </Flex>
        ) : (
          <Flex className={classes.directionInfo()}>
            <Text className={classes.subtleText()}>(Withdrawal)</Text>
            <FuelLogo size={17} />
            <IconArrowRight size={16} />
            <AssetLogo asset={ethAsset} alt={'withdrawal'} />
          </Flex>
        )}
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>Asset</Text>
        <Flex className={classes.directionInfo()}>
          {isLoading ? (
            <InfoTextLoader />
          ) : (
            <>
              <AssetLogo asset={asset} alt={`Asset ${asset?.symbol}`} />
              <Text aria-label="Asset amount" className={classes.infoText()}>
                {amount}
              </Text>
              <Text className={classes.infoText()}>{asset?.symbol}</Text>
            </>
          )}
        </Flex>
      </Flex>
    </VStack>
  );
};

const styles = tv({
  slots: {
    stack: 'w-full',
    txItem: 'flex-wrap justify-between',
    labelText: 'text-xs text-intentsBase11',
    subtleText: 'text-[10px] leading-tight text-muted',
    infoText: 'text-xs text-heading',
    linkText: 'text-xs',
    directionInfo: 'gap-1 items-center',
  },
});
