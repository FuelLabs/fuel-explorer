import { FuelMessagePortal } from "@fuel-bridge/solidity-contracts";

export type FuelMessagePortalArgs = {
	MessageSent: {
		amount: bigint;
		nonce: bigint;
		sender: `0x${string}`;
		recipient: `0x${string}`;
		data: `0x${string}`;
	};
};

export const decodeMessageSentData = {
	erc20Deposit: (data: `0x${string}`) => {
		const pattern =
			/^0x([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})$/;
		const match = data.match(pattern);
		const [, fuelTokenId, tokenAddress, , sender, to, amount] = match || [];
		const parsed = {
			fuelTokenId: `0x${fuelTokenId}`,
			tokenAddress: `0x${tokenAddress}`,
			sender: `0x${sender}`,
			to: `0x${to}`,
			amount,
		};

		return parsed;
	},
};

export const FUEL_MESSAGE_PORTAL = {
	abi: FuelMessagePortal.abi,
};
