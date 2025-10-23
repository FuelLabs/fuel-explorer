import FuelMessagePortal from '@fuel-bridge/solidity-contracts/artifacts/contracts/fuelchain/FuelMessagePortal/v3/FuelMessagePortalV3.sol/FuelMessagePortalV3.json';
import type { HexAddress } from 'app-commons';
import { bn } from 'fuels';

export type FuelMessagePortalArgs = {
  MessageSent: {
    amount: bigint;
    nonce: bigint;
    sender: HexAddress;
    recipient: HexAddress;
    data: HexAddress;
  };
};

export const decodeMessageSentData = {
  erc20Deposit: (data: HexAddress) => {
    const pattern =
      /^0x([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})$/;
    const match = data.match(pattern);
    const [, fuelTokenId, , tokenAddress, , sender, to, amount] = match || [];

    const decodedTokenAddress = tokenAddress
      ? bn(tokenAddress, 'hex').toHex(20)
      : undefined;

    const parsed = {
      fuelTokenId: fuelTokenId ? `0x${fuelTokenId}` : undefined,
      tokenAddress: decodedTokenAddress,
      sender: sender ? `0x${sender}` : undefined,
      to: to ? `0x${to}` : undefined,
      amount: amount,
    };

    return parsed;
  },
};

export const FUEL_MESSAGE_PORTAL = {
  abi: FuelMessagePortal.abi,
};
