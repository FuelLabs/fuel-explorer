import { useAsset } from '~portal/systems/Assets';
import { BridgeTxItem } from '~portal/systems/Bridge/components';

import { Asset, Flex, FuelLogo, Spinner, Text } from '@fuels/ui';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { ActionRequiredBadge } from '../components';
import { useTxFuelToEth } from '../hooks';

type TxListItemFuelToEthProps = {
  txHash: string;
  className?: string;
  style?: CSSProperties;
};

export const TxListItemFuelToEth = ({
  txHash,
  className,
  style,
}: TxListItemFuelToEthProps) => {
  const { t } = useTranslation();
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { steps, handlers, asset, date, status, amount, isLoadingTxResult } =
    useTxFuelToEth({
      txId: txHash,
    });

  const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

  function getStatusComponent() {
    if (status?.isReceiveDone) {
      return (
        <Text className={classes.settledText()}>
          {t('portal.history.settled')}
        </Text>
      );
    }

    if (bridgeTxStatus?.isLoading) {
      return (
        <Flex align="center" gap="1">
          <Spinner size={14} />
          <Text className={classes.loadingText()}>
            {t('portal.history.processing')}
          </Text>
        </Flex>
      );
    }

    if (bridgeTxStatus?.name === 'Confirm transaction') {
      return <ActionRequiredBadge />;
    }

    return null;
  }

  return (
    <BridgeTxItem
      fromLogo={<FuelLogo size={17} />}
      date={date}
      asset={asset}
      status={getStatusComponent()}
      txId={txHash}
      amount={amount}
      isLoading={isLoadingTxResult}
      className={className}
      style={style}
      toLogo={
        <Asset asset={ethAsset} iconSize={18}>
          <Asset.Icon />
        </Asset>
      }
      onClick={() => handlers.openTxFuelToEth({ txId: txHash })}
    />
  );
};

const styles = tv({
  slots: {
    settledText: 'fuel-label text-right',
    loadingText: 'fuel-label',
  },
});
