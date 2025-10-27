import { calculateDateDiff } from '~portal/systems/Core';

import {
  Asset,
  Box,
  Button,
  Flex,
  FuelLogo,
  Link,
  Text,
  VStack,
  shortAddress,
} from '@fuels/ui';
import { IconArrowRight } from '@tabler/icons-react';
import { Routes } from 'app-commons';
import type { BigNumberish } from 'ethers';
import type { ChecksumAddress, Asset as FuelsAsset } from 'fuels';
import { tv } from 'tailwind-variants';
import { createETHExplorerLink } from '../../hooks/useExplorerLink';
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
  addresses?: { from: ChecksumAddress; to: ChecksumAddress };
  from?: string;
  to?: string;
  onAddAssetToWallet?: () => void;
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
  from,
  to,
  onAddAssetToWallet,
}: BridgeTxOverviewProps) => {
  const hasAddresses = from && to;
  const classes = styles();

  function handleAddAssetToWallet(e: React.MouseEvent<HTMLButtonElement>) {
    // blocks the default link behavior from button variant="link"
    e.stopPropagation();
    e.preventDefault();

    // call actual onAddAssetToWallet method
    onAddAssetToWallet?.();
  }

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
      {hasAddresses &&
        (isDeposit ? (
          <>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>From</Text>
              <Link
                isExternal
                href={createETHExplorerLink('address', from)}
                className={classes.linkText()}
                color="green"
                target="_blank"
              >
                <Box>{shortAddress(from)}</Box>
              </Link>
            </Flex>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>To</Text>
              <Link
                isExternal
                href={Routes.account(to, 'assets')}
                className={classes.infoText()}
                color="green"
                externalIcon={null}
                target="_blank"
              >
                <Box>{shortAddress(to)}</Box>
              </Link>
            </Flex>
          </>
        ) : (
          <>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>From</Text>
              <Link
                isExternal
                href={Routes.account(from, 'assets')}
                className={classes.infoText()}
                color="green"
                externalIcon={null}
                target="_blank"
              >
                <Box>{shortAddress(from)}</Box>
              </Link>
            </Flex>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>To</Text>
              <Link
                isExternal
                href={createETHExplorerLink('address', to)}
                className={classes.linkText()}
                color="green"
                target="_blank"
              >
                <Box>{shortAddress(to)}</Box>
              </Link>
            </Flex>
          </>
        ))}
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
        <Text className={classes.labelText()}>
          Asset
          {onAddAssetToWallet ? (
            <Text className={classes.subtleText()}>
              {' '}
              (
              <Button
                onClick={handleAddAssetToWallet}
                className={`${classes.linkText()} ${classes.addToWalletBtn()}`}
                color="green"
                variant="link"
              >
                Add to wallet
              </Button>
              )
            </Text>
          ) : null}
        </Text>
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
    addToWalletBtn: 'pt-0 pb-0 m-0',
  },
});
