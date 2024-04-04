import { FuelMessagePortal } from '@fuel-bridge/solidity-contracts';

export type FuelMessagePortalArgs = {
  MessageSent: {
    amount: bigint;
    nonce: bigint;
    sender: `0x${string}`;
    recipient: `0x${string}`;
    data: `0x${string}`;
  };
};

export const FUEL_MESSAGE_PORTAL = {
  abi: FuelMessagePortal.abi,
};
