import { cssObj } from "@fuel-ui/css";
import { Box, FuelLogo, Image, Text } from "@fuel-ui/react";
import assetList from "@fuels/assets";

import { BridgeTxItem } from "./BridgeTxItem";

export default {
	component: BridgeTxItem,
	title: "BridgeTxItem",
	parameters: {
		layout: "fullscreen",
	},
};

export const Usage = () => {
	return (
		<Box.Flex align="center" justify="center" css={styles.storybook}>
			<BridgeTxItem
				toLogo={<FuelLogo size={17} />}
				date={new Date()}
				amount="0.050"
				asset={assetList[0]}
				fromLogo={
					<Image
						width={18}
						height={18}
						src={assetList[0].icon}
						alt={"ETH logo"}
					/>
				}
				status={
					<Text fontSize="xs" color="intentsBase11">
						Settled
					</Text>
				}
				onClick={() => {}}
			/>
		</Box.Flex>
	);
};

export const Loading = () => {
	return (
		<Box.Flex align="center" justify="center" css={styles.storybook}>
			<BridgeTxItem
				isLoading
				toLogo={<FuelLogo size={17} />}
				date={new Date()}
				amount="0.050"
				asset={assetList[0]}
				fromLogo={
					<Image
						width={18}
						height={18}
						src={assetList[0].icon}
						alt={"ETH logo"}
					/>
				}
				status={
					<Text fontSize="xs" color="intentsBase11">
						Settled
					</Text>
				}
				onClick={() => {}}
			/>
		</Box.Flex>
	);
};

const styles = {
	storybook: cssObj({
		margin: "20px",
		width: "328px",

		article: {
			flex: 1,
		},

		"@md": {
			width: "$sm",
		},
	}),
};
