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

const DEBOUNCE_TIME = 30000;
export class SyncBridgeContractLogs {
  private service: TxEthToFuelService;
  private logsRepository: BridgeContractLogRepository;
  private blocksRepository: BridgeBlockRepository;

  constructor({ service, logsRepository, blocksRepository }: Props) {
    this.service = service;
    this.logsRepository = logsRepository;
    this.blocksRepository = blocksRepository;
  }

  async execute({ initialBlock }: Input) {
    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    const isEvent = ({ type }: { type: string }) => type === 'event';
    const portalABI = FuelMessagePortal.abi.filter(isEvent);
    const chainStateABI = FuelChainState.abi.filter(isEvent);

    const indexedBlock = await this.blocksRepository.findLatestAdded();
    const finalizedBlock = await this.service.getBlock('finalized');
    const finalizedBlockNumber = finalizedBlock?.number as bigint;

    // If queue is requesting an outdated block, we can jump to the next target block
    if (indexedBlock && indexedBlock.number > initialBlock) {
      console.log(
        '📥 Jumping to the latest indexed block [',
        indexedBlock.number + 1,
        ']\n',
      );

      await queue.push(QueueNames.SYNC_BRIDGE_CONTRACT_LOGS, {
        initialBlock: indexedBlock.number + 1,
      });
      return;
    }

    const range = 30n;
    const fromBlock = BigInt(initialBlock);
    const target = fromBlock + range;
    const toBlock =
      target > finalizedBlockNumber ? finalizedBlockNumber : target;

    // We're up to date, keep waiting for at least 1 finalized blocks
    if (fromBlock >= toBlock) {
      console.log('👀 Waiting for new finalized blocks');
      console.log(
        'Latest indexed block number was [',
        indexedBlock?.number,
        ']',
      );
      console.log(
        'Latest finalized block number was [',
        finalizedBlockNumber,
        ']\n',
      );

      // Wait 30 seconds
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
      await queue.push(QueueNames.SYNC_BRIDGE_CONTRACT_LOGS, {
        initialBlock: Number(fromBlock),
      });
      return;
    }

    console.log('🔄 Fetching range from [', fromBlock, '] to [', toBlock, ']');

    const logs = await this.service.getLogs({
      contracts: [contracts.FuelMessagePortal, contracts.FuelChainState],
      events: portalABI.concat(chainStateABI),
      fromBlock,
      toBlock,
    });

    const blockNumbers = uniq(logs.map((tx) => tx.blockNumber));
    const blocks = await this.service.getBlocks(blockNumbers);

    try {
      await this.blocksRepository.insertMany(blocks);
      await this.logsRepository.insertMany(logs);

      console.log('📥 Range synced');
      console.log(blocks.length, 'new blocks');
      console.log(logs.length, 'new logs\n');

      // Wait 30 seconds
      await new Promise((resolve) => setTimeout(resolve, DEBOUNCE_TIME));
      await queue.push(QueueNames.SYNC_BRIDGE_CONTRACT_LOGS, {
        initialBlock: Number(toBlock) + 1,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Sync bridge transactions from block and logs');
    }
  }
}

export const syncBridgeContractLogs = async ({ data }: QueueData<Input>) => {
  const ETH_CHAIN_NAME = env.get('ETH_CHAIN_NAME');
  const ALCHEMY_ID = env.get('ETH_ALCHEMY_ID');
  const INFURA_ID = env.get('ETH_INFURA_ID');

  // @TODO: Prepare it to use foundry as well (with "http" transport only)
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
    console.log(`\n🔎 Syncing contract logs from [${data.initialBlock}] block`);

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
      `Failed to sync bridge transactions from block ${data.initialBlock}`,
      {
        cause: error,
      },
    );
  }
};
