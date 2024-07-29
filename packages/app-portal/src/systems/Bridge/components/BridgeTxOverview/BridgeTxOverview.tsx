import { calculateDateDiff } from '~portal/systems/Core';

import type { Asset as FuelsAsset } from '@fuel-ts/account';
import { Asset, Box, Flex, FuelLogo, Link, Text, VStack } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import type { BigNumberish } from 'ethers';
import { tv } from 'tailwind-variants';
import { InfoTextLoader } from './InfoTextLoader';

type BridgeTxOverviewProps = {
  transactionId: BigNumberish;
  date?: Date;
  isDeposit?: boolean;
  asset?: FuelsAsset;
  ethAsset?: FuelsAsset;
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
        <Text className={classes.labelText()}>Transaction ID</Text>
        <Link
          isExternal
          href={explorerLink}
          className={classes.linkText()}
          color="green"
          iconSize={16}
          target="_blank"
        >
          <Box aria-label="Transaction ID">{transactionId.toString()}</Box>
        </Link>
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>Age</Text>

        {isLoading ? (
          <InfoTextLoader />
        ) : (
          <Text className={classes.infoText()}>{calculateDateDiff(date)}</Text>
        )}
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>
          Direction{' '}
          <Text as="span" className={classes.subtleText()}>
            {isDeposit ? '(Deposit)' : '(Withdraw)'}
          </Text>
        </Text>
        {isDeposit ? (
          <Flex className={classes.directionInfo()}>
            {ethAsset && (
              <Asset asset={ethAsset} iconSize={16}>
                <Asset.Icon alt="Deposit" />
              </Asset>
            )}
            <IconArrowRight size={16} />
            <FuelLogo size={16} />
          </Flex>
        ) : (
          <Flex className={classes.directionInfo()}>
            <FuelLogo size={16} />
            <IconArrowRight size={16} />
            <Asset asset={ethAsset} iconSize={16}>
              <Asset.Icon alt="withdrawal" />
            </Asset>
          </Flex>
        )}
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>Asset</Text>
        {isLoading ? (
          <InfoTextLoader />
        ) : (
          <Flex className={classes.directionInfo()}>
            <Asset asset={asset} iconSize={17}>
              <Asset.Icon alt={`Asset ${asset?.symbol}`} />
            </Asset>
            <Text aria-label="Asset amount" className={classes.infoText()}>
              {amount}
            </Text>
            <Text className={classes.infoText()}>{asset?.symbol}</Text>
          </Flex>
        )}
      </Flex>
    </VStack>
  );
};

const styles = tv({
  slots: {
    stack: 'w-full mt-2',
    txItem: 'flex-wrap justify-between',
    labelText: 'text-xs text-intentsBase11',
    subtleText: 'text-xs leading-tight text-muted',
    infoText: 'text-xs text-heading',
    linkText: 'text-xs',
    directionInfo: 'gap-1 items-center',
  },
});
