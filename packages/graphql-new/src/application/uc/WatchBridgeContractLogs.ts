import { AbiEvent, WatchEventOnLogsParameter } from 'viem';

import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';

import { BridgeBlockRepository } from '~/domain/BridgeBlock/BridgeBlockRepository';
import { BridgeContractLogRepository } from '~/domain/BridgeContractLog/BridgeContractLogRepository';
import { WagmiConfig } from '~/infra/config/WagmiConfig';

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

    await this.service.watchEvents({
      onLogs,
    });
  }
}

export const watchBridgeContractLogs = async () => {
  try {
    const ethPublicClient = new WagmiConfig().getPublicClient();

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
