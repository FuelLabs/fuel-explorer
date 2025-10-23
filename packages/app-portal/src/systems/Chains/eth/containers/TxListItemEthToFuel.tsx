import { useAsset } from '~portal/systems/Assets';
import { BridgeTxItem } from '~portal/systems/Bridge/components';

import { Asset, Flex, FuelLogo, Spinner, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ActionRequiredBadge } from '../../fuel';
import { useTxEthToFuel } from '../hooks';

type TxListItemEthToFuelProps = {
  txHash: string;
  messageSentEventNonce: BigInt;
};

export const TxListItemEthToFuel = ({
  txHash,
  messageSentEventNonce,
}: TxListItemEthToFuelProps) => {
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
      return <Text className={classes.settledText()}>Settled</Text>;
    if (bridgeTxStatus?.isLoading)
      return (
        <Flex align="center" gap="1">
          <Spinner size={14} />
          <Text className={classes.loadingText()}>Processing</Text>
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
    settledText: 'text-xs text-muted text-right',
    loadingText: 'text-xs',
  },
});
