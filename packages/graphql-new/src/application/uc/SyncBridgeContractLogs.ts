import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { fallback } from 'viem';

import { uniq } from 'lodash';

import {
  FuelChainState,
  FuelMessagePortal,
} from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from '@fuel-explorer/contract-ids';

import { QueueData, type QueueInputs, QueueNames, queue } from '~/infra/queue';
import {
  type EventABI,
  TxEthToFuelService,
} from '~/infra/services/TxEthToFuelService';

import { env } from '~/config';
import { BridgeBlockRepository } from '~/domain/BridgeBlock/BridgeBlockRepository';
import { BridgeContractLogRepository } from '~/domain/BridgeContractLog/BridgeContractLogRepository';

type Props = {
  service: TxEthToFuelService;
  logsRepository: BridgeContractLogRepository;
  blocksRepository: BridgeBlockRepository;
};

type Input = QueueInputs[QueueNames.SYNC_BRIDGE_CONTRACT_LOGS];

// in seconds, how much seconds we're going to wait before check the next finalized block again
const DEBOUNCE_TIME = 2;

// We need to be careful with Alchemy/Infura API limits here
const BLOCKS_PER_SYNC = 30;

export class SyncBridgeContractLogs {
  private service: TxEthToFuelService;
  private logsRepository: BridgeContractLogRepository;
  private blocksRepository: BridgeBlockRepository;
  private events: EventABI[];

  constructor({ service, logsRepository, blocksRepository }: Props) {
    this.service = service;
    this.logsRepository = logsRepository;
    this.blocksRepository = blocksRepository;

    const portalABI = FuelMessagePortal.abi.filter(this.isEvent);
    const chainStateABI = FuelChainState.abi.filter(this.isEvent);

    this.events = portalABI.concat(chainStateABI);
  }

  private async getLatestBlock(latestBlock?: number) {
    if (latestBlock) {
      console.log('📦 Using cached latest block', latestBlock);
      return latestBlock;
    }

    const block = await this.service.getBlock('latest');
    const blockNumber = Number(block?.number);
    console.log('📦 Set latest block to', blockNumber);

    return blockNumber;
  }

  async execute({ fromBlock, latestBlock = undefined }: Input) {
    // Identify current finalized and latest block
    const latestBlockNumber = await this.getLatestBlock(latestBlock);

    // Identify if it has finished syncing
    if (fromBlock > latestBlockNumber) {
      console.log(
        '📦 No new blocks to sync – from now on, we will only sync new logs',
      );
      return;
    }

    // Set the range to sync
    const toBlock = Math.min(fromBlock + BLOCKS_PER_SYNC, latestBlockNumber);
    console.log('📦 Syncing logs from block', fromBlock, toBlock);

    // Sync the logs
    try {
      await this.syncLogs(fromBlock, toBlock);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to sync logs');
    }

    // Requesting next iteration
    await this.syncNext(toBlock + 1, latestBlockNumber, DEBOUNCE_TIME);
  }

  private async syncLogs(fromBlock: number, toBlock: number) {
    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    const logs = await this.service.getLogs({
      contracts: [contracts.FuelMessagePortal, contracts.FuelChainState],
      events: this.events,
      fromBlock: BigInt(fromBlock),
      toBlock: BigInt(toBlock),
    });

    const blockNumbers = uniq(logs.map((tx) => tx.blockNumber));
    const blocks = await this.service.getBlocks(blockNumbers);

    await this.blocksRepository.insertMany(blocks);
    await this.logsRepository.insertMany(logs);

    console.log(`📥 Range synced from [${fromBlock}] to [${toBlock}]`);
    console.log(blocks.length, 'new blocks');
    console.log(logs.length, 'new logs\n');
  }

  private async syncNext(
    fromBlock: number,
    latestBlock: number,
    startAfter?: number,
  ) {
    await queue.push(
      QueueNames.SYNC_BRIDGE_CONTRACT_LOGS,
      {
        fromBlock,
        latestBlock,
      },
      {
        startAfter,
      },
    );
  }

  private isEvent = ({ type }: { type: string }) => type === 'event';
}

export const syncBridgeContractLogs = async ({ data }: QueueData<Input>) => {
  const ETH_CHAIN_NAME = env.get('ETH_CHAIN_NAME');
  const ALCHEMY_ID = env.get('ETH_ALCHEMY_ID');
  const INFURA_ID = env.get('ETH_INFURA_ID');

  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: fallback(
        [
          http(`https://eth-${ETH_CHAIN_NAME}.g.alchemy.com/v2/${ALCHEMY_ID}`),
          http(`https://${ETH_CHAIN_NAME}.infura.io/v3/${INFURA_ID}`),
          http(),
        ],
        { rank: false },
      ),
    },
  });

  try {
    console.log(`\n🔎 Syncing contract logs from [${data.fromBlock}]`);

    const ethPublicClient = getPublicClient(config);

    const service = new TxEthToFuelService(ethPublicClient);
    const logsRepository = new BridgeContractLogRepository();
    const blocksRepository = new BridgeBlockRepository();

    const sync = new SyncBridgeContractLogs({
      service,
      logsRepository,
      blocksRepository,
    });

    return sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to sync bridge transactions from block ${data.fromBlock}`,
      {
        cause: error,
      },
    );
  }
};
