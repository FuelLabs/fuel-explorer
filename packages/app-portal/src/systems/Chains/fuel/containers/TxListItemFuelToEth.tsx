import { Box, FuelLogo, Image, Spinner, Text } from "@fuel-ui/react";
import { useAsset } from "~/systems/Assets";
import { BridgeTxItem } from "~/systems/Bridge";

import { ActionRequiredBadge } from "../components";
import { useTxFuelToEth } from "../hooks";

type TxListItemFuelToEthProps = {
  txHash: string;
};

export const TxListItemFuelToEth = ({ txHash }: TxListItemFuelToEthProps) => {
  const { asset: ethAsset } = useAsset();
  const { steps, handlers, asset, date, status, amount, isLoadingTxResult } =
    useTxFuelToEth({
      txId: txHash,
    });

  const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

  function getStatusComponent() {
    if (status?.isReceiveDone)
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

    if (bridgeTxStatus?.name === "Confirm transaction") {
      return <ActionRequiredBadge />;
    }

    return "";
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
        <Image
          width={18}
          height={18}
          src={ethAsset?.icon || undefined}
          alt={asset?.symbol}
        />
      }
      onClick={() => handlers.openTxFuelToEth({ txId: txHash })}
    />
  );
};
