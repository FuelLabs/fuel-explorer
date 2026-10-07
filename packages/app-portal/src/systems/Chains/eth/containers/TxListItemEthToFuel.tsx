import { useAsset } from '~portal/systems/Assets';
import { BridgeTxItem } from '~portal/systems/Bridge/components';

import { Asset, Flex, FuelLogo, Spinner, Text } from '@fuels/ui';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { tv } from 'tailwind-variants';
import { ActionRequiredBadge } from '../../fuel';
import { useTxEthToFuel } from '../hooks';

type TxListItemEthToFuelProps = {
  txHash: string;
  messageSentEventNonce: BigInt;
  className?: string;
  style?: CSSProperties;
};

export const TxListItemEthToFuel = ({
  txHash,
  messageSentEventNonce,
  className,
  style,
}: TxListItemEthToFuelProps) => {
  const { t } = useTranslation();
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { steps, date, handlers, asset, status, amount, isLoadingReceipts } =
    useTxEthToFuel({
      id: txHash,
      messageSentEventNonce,
    });

  const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

  function getStatusComponent() {
    if (status?.isReceiveDone)
      return (
        <Text className={classes.settledText()}>
          {t('portal.history.settled')}
        </Text>
      );
    if (bridgeTxStatus?.isLoading)
      return (
        <Flex align="center" gap="1">
          <Spinner size={14} />
          <Text className={classes.loadingText()}>
            {t('portal.history.processing')}
          </Text>
        </Flex>
      );

    if (bridgeTxStatus?.name === 'Confirm transaction') {
      return <ActionRequiredBadge />;
    }
    return '';
  }

  return (
    <BridgeTxItem
      toLogo={<FuelLogo size={17} />}
      date={date}
      asset={asset}
      status={getStatusComponent()}
      txId={txHash}
      amount={amount}
      isLoading={isLoadingReceipts}
      className={className}
      style={style}
      fromLogo={
        <Asset asset={ethAsset} iconSize={18}>
          <Asset.Icon />
        </Asset>
      }
      onClick={() =>
        handlers.openTxEthToFuel({ txId: txHash, messageSentEventNonce })
      }
    />
  );
};

const styles = tv({
  slots: {
    settledText: 'fuel-label text-right',
    loadingText: 'fuel-label',
  },
});
