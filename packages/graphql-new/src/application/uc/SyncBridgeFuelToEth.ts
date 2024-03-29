import { Address, Provider } from 'fuels';

import { BridgeTransactionRepository } from '~/domain/BridgeTransaction/BridgeTransactionRepository';

import { QueueData, type QueueInputs, QueueNames } from '~/infra/queue';
import { TxFuelToEthService } from '~/infra/services/TxFuelToEthService';

import { env } from '~/config';

type Props = {
  service: TxFuelToEthService;
  repository: BridgeTransactionRepository;
};

type Input = QueueInputs[QueueNames.SYNC_BRIDGE_FUEL_TO_ETH];

export class SyncBridgeFuelToEth {
  private service: TxFuelToEthService;
  private repository: BridgeTransactionRepository;

  constructor({ service, repository }: Props) {
    this.service = service;
    this.repository = repository;
  }

  async execute(input: Input) {
    const address = Address.fromString(input.address);
    const transactions = await this.service.fetchTransactions({ address });

    // @TODO: Remove these logs and save correctly to the repository
    console.log('fuelToEthTxs = ', transactions.length);

    await this.repository.insertMany();
  }
}

export const syncBridgeFuelToEth = async ({ data }: QueueData<Input>) => {
  const FUEL_PROVIDER = env.get('FUEL_PROVIDER');

  try {
    console.log(`Syncing bridge transactions from ${data.address.toString()}`);

    const fuelProvider = await Provider.create(FUEL_PROVIDER);

    const service = new TxFuelToEthService(fuelProvider);
    const repository = new BridgeTransactionRepository();

    const sync = new SyncBridgeFuelToEth({
      service,
      repository,
    });

    return sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync bridge transactions ${data.address.toString()}`, {
      cause: error,
    });
  }
};
