import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { fallback } from 'viem';

import { QueueData, type QueueInputs, QueueNames, queue } from '~/infra/queue';
import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';

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
const DEBOUNCE_TIME = 1;

// We need to be careful with Alchemy/Infura API limits here
const BLOCKS_PER_SYNC = 30;

export class SyncBridgeContractLogs {
  private service: TxEthToFuelService;
  private logsRepository: BridgeContractLogRepository;
  private blocksRepository: BridgeBlockRepository;

  constructor({ service, logsRepository, blocksRepository }: Props) {
    this.service = service;
    this.logsRepository = logsRepository;
    this.blocksRepository = blocksRepository;
  }

  private async getLatestBlock(latestBlock?: number) {
    if (latestBlock) {
      console.log('\n📦 Latest block: ', latestBlock);
      return latestBlock;
    }

    const block = await this.service.getBlock('latest');
    const blockNumber = Number(block?.number);
    console.log('\n📦 Set latest block to', blockNumber);

    return blockNumber;
  }

  async execute({ fromBlock, latestBlock = undefined }: Input) {
    // Identify current finalized and latest block
    const latestBlockNumber = await this.getLatestBlock(latestBlock);

    // Identify if it has finished syncing
    if (fromBlock > latestBlockNumber) {
      console.log(
        '📦 No new blocks to sync – from now on, we will only sync new logs\n',
      );
      return;
    }

    // Set the range to sync
    const toBlock = Math.min(fromBlock + BLOCKS_PER_SYNC, latestBlockNumber);
    console.log('📦 Syncing logs from block ', fromBlock, ' to ', toBlock);

    // Sync the logs
    try {
      await this.syncLogs(fromBlock, toBlock, latestBlockNumber);
    } catch (e) {
      console.error(e);
      throw new Error('Failed to sync logs');
    }

    // Requesting next iteration
    await this.syncNext(toBlock + 1, latestBlockNumber, DEBOUNCE_TIME);
  }

  private async syncLogs(
    fromBlock: number,
    toBlock: number,
    latestBlockNumber: number,
  ) {
    const logs = await this.service.getLogs({
      fromBlock: BigInt(fromBlock),
      toBlock: BigInt(toBlock),
    });

    if (logs.length === 0) {
      console.log('⏭️ No logs found. Skipping...\n');
      return;
    }

    const blocks = await this.service.getBlocksFromLogs(logs);
    await this.blocksRepository.insertMany(blocks);
    await this.logsRepository.insertMany(logs);

    console.log(
      `📥 Range synced from [${fromBlock}] to [${toBlock}]: ${blocks.length} blocks and ${logs.length} logs`,
    );
    console.log(
      `🔄 Blocks left to sync: ${Math.max(
        latestBlockNumber - toBlock,
        0,
      )} blocks\n`,
    );
  }

  private async syncNext(
    fromBlock: number,
    latestBlock: number,
    startAfter: number,
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
