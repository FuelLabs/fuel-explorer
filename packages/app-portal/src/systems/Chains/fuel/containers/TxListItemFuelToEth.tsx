import { FuelLogo } from '@fuel-ui/react';
import { useAsset } from '~/systems/Assets';
import { BridgeTxItem } from '~/systems/Bridge';

import { Asset, Flex, Spinner, Text } from '@fuels/ui';
import { tv } from 'tailwind-variants';
import { ActionRequiredBadge } from '../components';
import { useTxFuelToEth } from '../hooks';

type TxListItemFuelToEthProps = {
  txHash: string;
};

export const TxListItemFuelToEth = ({ txHash }: TxListItemFuelToEthProps) => {
  const classes = styles();
  const { asset: ethAsset } = useAsset();
  const { steps, handlers, asset, date, status, amount, isLoadingTxResult } =
    useTxFuelToEth({
      txId: txHash,
    });

  const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

  function getStatusComponent() {
    if (status?.isReceiveDone)
      return <Text className={classes.settledText()}>Settled</Text>;

    if (bridgeTxStatus?.isLoading) {
      return (
        <Flex align="center" gap="1">
          <Spinner size={14} />
          <Text className={classes.loadingText()}>Processing</Text>
        </Flex>
      );
    }

    if (bridgeTxStatus?.name === 'Confirm transaction') {
      return <ActionRequiredBadge />;
    }

    return '';
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
    settledText: 'text-xs text-muted',
    loadingText: 'text-xs',
  },
});
