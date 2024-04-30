import type {
  AbiEvent,
  Address,
  Block,
  BlockTag,
  GetLogsReturnType,
  PublicClient,
  WatchEventParameters,
} from 'viem';

import {
  FuelChainState,
  FuelMessagePortal,
} from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from '@fuel-explorer/contract-ids';
import { uniq } from 'lodash';
import { env } from '~/config';

type FuelPortalABI = (typeof FuelMessagePortal.abi)[number];
type ChainStateABI = (typeof FuelChainState.abi)[number];
export type EventABI = FuelPortalABI | ChainStateABI;

type WatchEvent = WatchEventParameters<undefined, AbiEvent[], false>;

type TxEthToFuelInputs = {
  getLogs: {
    fromBlock: bigint;
    toBlock: bigint;
  };
  watchEvents: {
    onLogs: WatchEvent['onLogs'];
  };
  isEvent: { type: string };
};

export class TxEthToFuelService {
  private ethPublicClient: PublicClient;
  private events: EventABI[];

  constructor(ethPublicClient: PublicClient) {
    this.ethPublicClient = ethPublicClient;

    const portalABI = FuelMessagePortal.abi.filter(this.isEvent);
    const chainStateABI = FuelChainState.abi.filter(this.isEvent);

    this.events = portalABI.concat(chainStateABI);
  }

  private async setupContracts(): Promise<Address[]> {
    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    return [contracts.FuelMessagePortal, contracts.FuelChainState];
  }

  async getBlock(blockTag: BlockTag = 'finalized') {
    const block = await this.ethPublicClient.getBlock({
      blockTag,
    });

    return block;
  }

  async getBlocksFromLogs(
    logs: GetLogsReturnType<undefined, AbiEvent[], false, bigint, bigint>,
  ): Promise<Block[]> {
    const blockNumbers = uniq(logs.map((tx) => tx.blockNumber));
    const blocks = await Promise.all(
      blockNumbers.map((blockNumber) =>
        this.ethPublicClient.getBlock({ blockNumber }),
      ),
    );

    return blocks;
  }

  async getLogs({ fromBlock, toBlock }: TxEthToFuelInputs['getLogs']) {
    const logs = await this.ethPublicClient.getLogs<
      undefined,
      AbiEvent[],
      false,
      bigint,
      bigint
    >({
      address: await this.setupContracts(),
      events: this.events as AbiEvent[],
      fromBlock,
      toBlock,
    });

    return logs;
  }

  async watchEvents({ onLogs }: TxEthToFuelInputs['watchEvents']) {
    return this.ethPublicClient.watchEvent({
      address: await this.setupContracts(),
      events: this.events as AbiEvent[],
      onLogs,
    });
  }

  private isEvent({ type }: TxEthToFuelInputs['isEvent']) {
    return type === 'event';
  }
}
