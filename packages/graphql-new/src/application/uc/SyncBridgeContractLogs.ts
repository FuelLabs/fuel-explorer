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
const DEBOUNCE_TIME = 10;

// We need to be careful with Alchemy/Infura API limits here
const BLOCKS_PER_SYNC = 10;

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

  async execute({ fromBlock, toBlock }: Input) {
    // Identifiy current finalized and latest block
    const safeBlock = await this.service.getBlock('safe');
    const latestBlock = await this.service.getBlock('latest');

    if (
      !safeBlock ||
      !latestBlock ||
      typeof safeBlock.number !== 'bigint' ||
      typeof latestBlock.number !== 'bigint'
    ) {
      console.log('📦 No blocks found. Try again.');
      return;
    }

    // Sync the logs
    try {
      await this.syncLogs(fromBlock, toBlock);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to sync logs');
    }

    // Requesting next iteration
    const safeBlockNumber = Number(safeBlock.number);
    const latestBlockNumber = Number(latestBlock.number);
    const nextFromBlock = Math.min(toBlock + 1, safeBlockNumber);
    const nextToBlock =
      nextFromBlock >= safeBlockNumber
        ? latestBlockNumber
        : Math.min(nextFromBlock + BLOCKS_PER_SYNC, latestBlockNumber);
    console.log(
      '🔁 Preparing to fetch the next range',
      nextFromBlock,
      nextToBlock,
    );
    console.log('Current safe block = ', safeBlockNumber);
    console.log('Current latest block = ', latestBlockNumber, '\n');

    await this.syncNext(nextFromBlock, nextToBlock, DEBOUNCE_TIME);
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
    toBlock: number,
    startAfter?: number,
  ) {
    await queue.push(
      QueueNames.SYNC_BRIDGE_CONTRACT_LOGS,
      {
        fromBlock,
        toBlock,
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
    console.log(
      `\n🔎 Syncing contract logs from [${data.fromBlock}] to [${data.toBlock}]`,
    );

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
      `Failed to sync bridge transactions from block ${data.fromBlock} to ${data.toBlock}`,
      {
        cause: error,
      },
    );
  }
};
