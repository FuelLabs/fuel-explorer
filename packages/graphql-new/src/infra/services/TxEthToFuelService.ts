import type { GetPublicClientReturnType } from '@wagmi/core';

import { Address } from 'viem';

import {
  FuelChainState,
  FuelMessagePortal,
} from '@fuel-bridge/solidity-contracts';

type FuelPortalABI = (typeof FuelMessagePortal.abi)[number];
type ChainStateABI = (typeof FuelChainState.abi)[number];
type EventABI = FuelPortalABI | ChainStateABI;

type TxEthToFuelInputs = {
  getLogs: {
    contracts: Address[];
    events: EventABI[];
    fromBlock: bigint;
    toBlock: bigint;
  };
};

export class TxEthToFuelService {
  private ethPublicClient: GetPublicClientReturnType;

  constructor(ethPublicClient: GetPublicClientReturnType) {
    this.ethPublicClient = ethPublicClient;
  }

  async getLogs({
    contracts,
    events,
    fromBlock,
    toBlock,
  }: TxEthToFuelInputs['getLogs']) {
    const logs = await this.ethPublicClient!.getLogs({
      address: contracts,
      events,
      fromBlock,
      toBlock,
    });

    return logs;
  }
}
