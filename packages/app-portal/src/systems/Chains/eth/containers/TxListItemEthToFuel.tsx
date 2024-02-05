import { Box, FuelLogo, Image, Spinner, Text } from "@fuel-ui/react";
import { useAsset } from "~/systems/Assets";
import { BridgeTxItem } from "~/systems/Bridge";

import { ActionRequiredBadge } from "../../fuel";
import { useTxEthToFuel } from "../hooks";

type TxListItemEthToFuelProps = {
	txHash: string;
};

export const TxListItemEthToFuel = ({ txHash }: TxListItemEthToFuelProps) => {
	const { asset: ethAsset } = useAsset();
	const { steps, date, handlers, asset, status, amount, isLoadingReceipts } =
		useTxEthToFuel({
			id: txHash,
		});

	const bridgeTxStatus = steps?.find(({ isSelected }) => !!isSelected);

	function getStatusComponent() {
		if (status?.isReceiveDone)
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

		if (bridgeTxStatus?.name === "Confirm transaction") {
			return <ActionRequiredBadge />;
		}
		return "";
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
				<Image
					width={18}
					height={18}
					src={ethAsset?.icon || undefined}
					alt={ethAsset?.symbol}
				/>
			}
			onClick={() => handlers.openTxEthToFuel({ txId: txHash })}
		/>
	);
};
