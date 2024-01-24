import { Image, FuelLogo, Text, Box, Spinner } from '@fuel-ui/react';
import type { ReactNode } from 'react';
import { BridgeTxItem } from '~/systems/Bridge';

import { useTxEthToFuel } from '../hooks';
import { ethLogoSrc } from '../utils';

type TxListItemEthToFuelProps = {
  asset: {
    assetImageSrc: ReactNode | string;
    assetAmount: string;
    assetSymbol: string;
  };
  txHash: string;
  isDone?: boolean;
};

export const TxListItemEthToFuel = ({
  asset,
  txHash,
  isDone,
}: TxListItemEthToFuelProps) => {
  const { steps, ethBlockDate, handlers, status } = useTxEthToFuel({
    id: txHash,
    // TODO: can refact part of skipAnalyzeTx this could be done inside the machine and jump to done state
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
    if (bridgeTxStatus?.isLoading)
      return (
        <Box.Flex align="center" gap="$1">
          <Spinner size={14} />
          <Text fontSize="xs">Processing</Text>
        </Box.Flex>
      );

    return '';
  }

  return (
    <BridgeTxItem
      toLogo={<FuelLogo size={17} />}
      date={ethBlockDate}
      asset={asset}
      status={getStatusComponent()}
      fromLogo={
        <Image
          width={18}
          height={18}
          src={ethLogoSrc}
          alt={asset.assetSymbol}
        />
      }
      onClick={() => handlers.openTxEthToFuel({ txId: txHash })}
    />
  );
};
