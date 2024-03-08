import { calculateDateDiff } from '~portal/systems/Core';

import { Asset as FuelsAsset } from '@fuels/assets';
import { Asset, Box, Flex, FuelLogo, Link, Text, VStack } from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import { BigNumberish } from 'ethers';
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
        <Text className={classes.labelText()}>ID</Text>
        <Link
          isExternal
          href={explorerLink}
          className={classes.linkText()}
          color="green"
          iconSize={16}
        >
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
                <Asset.Icon alt={'Deposit'} />
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
              <Asset.Icon alt={'withdrawal'} />
            </Asset>
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
              <Asset asset={asset} iconSize={'xs'}>
                <Asset.Icon alt={`Asset ${asset?.symbol}`} />
              </Asset>
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
