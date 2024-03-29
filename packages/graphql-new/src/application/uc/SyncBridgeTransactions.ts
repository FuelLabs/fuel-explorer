import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';

import { fallback } from 'viem';

import { Address, Provider } from 'fuels';

import { BridgeTransactionRepository } from '~/domain/BridgeTransaction/BridgeTransactionRepository';

import { QueueData, type QueueInputs, QueueNames } from '~/infra/queue';
import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';
import { TxFuelToEthService } from '~/infra/services/TxFuelToEthService';

import { env } from '~/config';

type Props = {
  fuelToEthService: TxFuelToEthService;
  ethToFuelService: TxEthToFuelService;
  repository: BridgeTransactionRepository;
};

type Input = QueueInputs[QueueNames.SYNC_BRIDGE_TRANSACTION];

export class SyncBridgeTransactions {
  private fuelToEthService: TxFuelToEthService;
  private ethToFuelService: TxEthToFuelService;
  private repository: BridgeTransactionRepository;

  constructor({ fuelToEthService, ethToFuelService, repository }: Props) {
    this.fuelToEthService = fuelToEthService;
    this.ethToFuelService = ethToFuelService;
    this.repository = repository;
  }

  async execute(input: Input) {
    const address = Address.fromString(input.address);
    console.log('Syncing bridge transactions', address.bech32Address);

    const [fuelToEthTxs, ethToFuelTxs] = await Promise.all([
      this.fuelToEthService.fetchTransactions({
        address,
      }),
      this.ethToFuelService.fetchTransactions({
        address,
      }),
    ]);

    // @TODO: Remove these logs and save correctly to the repository
    console.log('fuelToEthTxs = ', fuelToEthTxs.length);
    console.log('ethToFuelTxs = ', ethToFuelTxs.length, '\n\n');

    await this.repository.insertMany();
  }
}

export const syncBridgeTransactions = async ({ data }: QueueData<Input>) => {
  const FUEL_PROVIDER = env.get('FUEL_PROVIDER');
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
    console.log(`Syncing bridge transactions from ${data.address.toString()}`);

    const fuelProvider = await Provider.create(FUEL_PROVIDER);
    const ethPublicClient = getPublicClient(config);

    const fuelToEthService = new TxFuelToEthService(fuelProvider);
    const ethToFuelService = new TxEthToFuelService(ethPublicClient);
    const repository = new BridgeTransactionRepository();

    const syncTransactions = new SyncBridgeTransactions({
      fuelToEthService,
      ethToFuelService,
      repository,
    });

    return syncTransactions.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(`Sync bridge transactions ${data.address.toString()}`, {
      cause: error,
    });
  }
};
