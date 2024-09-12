import FuelMessagePortal from '@fuel-bridge/solidity-contracts/artifacts/contracts/fuelchain/FuelMessagePortal/v3/FuelMessagePortalV3.sol/FuelMessagePortalV3.json';
import type { HexAddress } from 'app-commons';

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
