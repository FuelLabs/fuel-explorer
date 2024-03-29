import { Address } from 'fuels';
import { BridgeTransactionRepository } from '~/domain/BridgeTransaction/BridgeTransactionRepository';

import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';
import { TxFuelToEthService } from '~/infra/services/TxFuelToEthService';

type ExecuteProps = {
  address: Address;
};

export class SyncBridgeTransactions {
  private fuelToEthService: TxFuelToEthService;
  private ethToFuelService: TxEthToFuelService;
  private repository: BridgeTransactionRepository;

  constructor(
    fuelToEthService: TxFuelToEthService,
    ethToFuelService: TxEthToFuelService,
    repository: BridgeTransactionRepository,
  ) {
    this.fuelToEthService = fuelToEthService;
    this.ethToFuelService = ethToFuelService;
    this.repository = repository;
  }

  async execute({ address }: ExecuteProps) {
    const [fuelToEthTxs, ethToFuelTxs] = await Promise.all([
      this.fuelToEthService.fetchTransactions({
        address,
      }),
      this.ethToFuelService.fetchTransactions({
        address,
      }),
    ]);

    // @TODO: Remove these logs
    console.log('fuelToEthTxs = ', fuelToEthTxs.length);
    console.log('ethToFuelTxs = ', ethToFuelTxs.length, '\n\n');

    await this.repository.insertMany();
  }
}
