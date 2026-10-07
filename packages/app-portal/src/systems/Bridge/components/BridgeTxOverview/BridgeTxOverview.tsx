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
import { IconArrowRight } from '@fuels/ui';
import { Routes } from 'app-commons';
import type { BigNumberish } from 'ethers';
import type { ChecksumAddress, Asset as FuelsAsset } from 'fuels';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const classes = styles();

  function handleAddAssetToWallet(e: React.MouseEvent<HTMLButtonElement>) {
    // blocks the default link behavior from button variant="link"
    e.stopPropagation();
    e.preventDefault();

    // call actual onAddAssetToWallet method
    onAddAssetToWallet?.();
  }

  return (
    <VStack className={classes.stack()} gap="0">
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>
          {t('portal.overview.transaction_id')}
        </Text>
        <Link
          isExternal
          href={explorerLink}
          className={classes.linkText()}
          iconSize={16}
          target="_blank"
        >
          <Box aria-label={t('portal.overview.transaction_id')}>
            {transactionId.toString()}
          </Box>
        </Link>
      </Flex>
      {hasAddresses &&
        (isDeposit ? (
          <>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>
                {t('portal.overview.from')}
              </Text>
              <Link
                isExternal
                href={createETHExplorerLink('address', from)}
                className={classes.linkText()}
                target="_blank"
              >
                <Box>{shortAddress(from)}</Box>
              </Link>
            </Flex>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>
                {t('portal.overview.to')}
              </Text>
              <Link
                isExternal
                href={Routes.account(to, 'assets')}
                className={classes.infoText()}
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
              <Text className={classes.labelText()}>
                {t('portal.overview.from')}
              </Text>
              <Link
                isExternal
                href={Routes.account(from, 'assets')}
                className={classes.infoText()}
                externalIcon={null}
                target="_blank"
              >
                <Box>{shortAddress(from)}</Box>
              </Link>
            </Flex>
            <Flex className={classes.txItem()}>
              <Text className={classes.labelText()}>
                {t('portal.overview.to')}
              </Text>
              <Link
                isExternal
                href={createETHExplorerLink('address', to)}
                className={classes.linkText()}
                target="_blank"
              >
                <Box>{shortAddress(to)}</Box>
              </Link>
            </Flex>
          </>
        ))}
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>{t('portal.overview.age')}</Text>

        {isLoading ? (
          <InfoTextLoader />
        ) : (
          <Text className={classes.infoText()}>{calculateDateDiff(date)}</Text>
        )}
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>
          {t('portal.overview.direction')}{' '}
          <Text as="span" className={classes.subtleText()}>
            {isDeposit
              ? t('portal.overview.direction_deposit')
              : t('portal.overview.direction_withdraw')}
          </Text>
        </Text>
        {isDeposit ? (
          <Flex className={classes.directionInfo()}>
            {ethAsset && (
              <Asset asset={ethAsset} iconSize={16}>
                <Asset.Icon alt={t('portal.overview.alt_deposit')} />
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
              <Asset.Icon alt={t('portal.overview.alt_withdrawal')} />
            </Asset>
          </Flex>
        )}
      </Flex>
      <Flex className={classes.txItem()}>
        <Text className={classes.labelText()}>
          {t('portal.overview.asset')}
          {onAddAssetToWallet ? (
            <Text className={classes.subtleText()}>
              {' '}
              (
              <Button
                onClick={handleAddAssetToWallet}
                className={`${classes.linkText()} ${classes.addToWalletBtn()}`}
                variant="link"
              >
                {t('portal.overview.add_to_wallet')}
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
              <Asset.Icon
                alt={t('portal.overview.alt_asset', { symbol: asset?.symbol })}
              />
            </Asset>
            <Text
              aria-label={t('portal.overview.asset_amount')}
              className={classes.infoText()}
            >
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
    stack: 'mt-2 w-full border border-[var(--fuel-line)]',
    txItem:
      'flex-wrap items-center justify-between gap-2 px-3 py-2.5 [&_~_&]:border-t [&_~_&]:border-[var(--fuel-line)]',
    labelText: 'fuel-label',
    subtleText: 'fuel-label',
    infoText: 'font-mono text-xs text-heading',
    linkText: 'font-mono text-xs',
    directionInfo: 'items-center gap-1',
    addToWalletBtn: 'm-0 pt-0 pb-0',
  },
});
