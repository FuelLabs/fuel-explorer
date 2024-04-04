import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { AbiEvent, WatchEventOnLogsParameter, fallback } from 'viem';

import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';

import { env } from '~/config';
import { BridgeBlockRepository } from '~/domain/BridgeBlock/BridgeBlockRepository';
import { BridgeContractLogRepository } from '~/domain/BridgeContractLog/BridgeContractLogRepository';

type Props = {
  service: TxEthToFuelService;
  logsRepository: BridgeContractLogRepository;
  blocksRepository: BridgeBlockRepository;
};

export class WatchBridgeContractLogs {
  private service: TxEthToFuelService;
  private logsRepository: BridgeContractLogRepository;
  private blocksRepository: BridgeBlockRepository;

  constructor({ service, logsRepository, blocksRepository }: Props) {
    this.service = service;
    this.logsRepository = logsRepository;
    this.blocksRepository = blocksRepository;
  }

  async execute() {
    const blockNumber = await this.service.getBlock('latest');

    console.log(`\n👀 Watching logs from #${blockNumber.number} block`);

    // Sync the logs
    try {
      await this.watchLogs();
    } catch (e) {
      console.error(e);
      throw new Error('Failed to watch logs');
    }
  }

  private async watchLogs() {
    const onLogs = async (
      logs: WatchEventOnLogsParameter<undefined, AbiEvent[], false, undefined>,
    ) => {
      const blocks = await this.service.getBlocksFromLogs(logs);
      await this.blocksRepository.insertMany(blocks);
      await this.logsRepository.insertMany(logs);
      console.log(
        `📥 ${logs.length} logs have been indexed in ${blocks
          .map((b) => b.number)
          .join(', ')}`,
      );
    };

    // @TODO: Add a way to stop the watcher
    await this.service.watchEvents({
      onLogs,
    });
  }
}

export const watchBridgeContractLogs = async () => {
  // @TODO: Share it between the two queues
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

    const watch = new WatchBridgeContractLogs({
      service,
      logsRepository,
      blocksRepository,
    });

    return watch.execute();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to watch bridge transactions', {
      cause: error,
    });
  }
};
