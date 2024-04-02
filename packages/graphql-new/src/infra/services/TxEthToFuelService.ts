import type { AbiEvent, Address, Block, PublicClient } from 'viem';

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
  private ethPublicClient: PublicClient;

  constructor(ethPublicClient: PublicClient) {
    this.ethPublicClient = ethPublicClient;
  }

  async getBlockNumber() {
    const block = await this.ethPublicClient.getBlockNumber();
    return block;
  }

  async getBlocks(blockNumbers: bigint[]): Promise<Block[]> {
    const blocks = await Promise.all(
      blockNumbers.map((blockNumber) =>
        this.ethPublicClient.getBlock({ blockNumber }),
      ),
    );

    return blocks;
  }

  async getLogs({
    contracts,
    events,
    fromBlock,
    toBlock,
  }: TxEthToFuelInputs['getLogs']) {
    const logs = await this.ethPublicClient.getLogs<
      undefined,
      AbiEvent[],
      false,
      bigint,
      bigint
    >({
      address: contracts,
      events: events as AbiEvent[],
      fromBlock,
      toBlock,
    });

    return logs;
  }
}
