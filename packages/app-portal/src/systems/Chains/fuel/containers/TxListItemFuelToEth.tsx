import { Image, FuelLogo, Text, Box, Spinner } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { BridgeTxItem } from '~/systems/Bridge';

import { ethLogoSrc } from '../../eth';
import { ActionRequiredBadge } from '../components';
import { useTxFuelToEth } from '../hooks';

type TxListItemFuelToEthProps = {
  asset: {
    assetImageSrc: ReactNode | string;
    assetAmount: string;
    assetSymbol: string;
  };
  txHash: string;
  date?: Date;
  isDone?: boolean;
};

export const TxListItemFuelToEth = ({
  asset,
  txHash,
  date,
  isDone,
}: TxListItemFuelToEthProps) => {
  const { steps, handlers, status } = useTxFuelToEth({
    txId: txHash,
    skipAnalyzeTx: isDone,
  });

  const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

  function getStatusComponent() {
    if (isDone || status.isReceiveDone)
      return (
        <Text fontSize="xs" color="intentsBase11">
          Settled
        </Text>
      );

    if (bridgeTxStatus?.isLoading) {
      return (
        <Box.Flex align="center" gap="$1">
          <Spinner size={14} />
          <Text fontSize="xs">Processing</Text>
        </Box.Flex>
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
      toLogo={
        <Image
          width={18}
          height={18}
          src={ethLogoSrc}
          alt={asset.assetSymbol}
        />
      }
      onClick={() => handlers.openTxFuelToEth({ txId: txHash })}
    />
  );
};
