import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';

import { fallback } from 'viem';

import { Address } from 'fuels';

import { BridgeTransactionRepository } from '~/domain/BridgeTransaction/BridgeTransactionRepository';

import { QueueData, type QueueInputs, QueueNames } from '~/infra/queue';
import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';

import { env } from '~/config';

type Props = {
  service: TxEthToFuelService;
  repository: BridgeTransactionRepository;
};

type Input = QueueInputs[QueueNames.SYNC_BRIDGE_ETH_TO_FUEL];

export class SyncBridgeEthToFuel {
  private service: TxEthToFuelService;
  private repository: BridgeTransactionRepository;

  constructor({ service, repository }: Props) {
    this.service = service;
    this.repository = repository;
  }

  async execute(input: Input) {
    const address = Address.fromString(input.address);
    console.log('Syncing bridge transactions', address.bech32Address);

    const transactions = await this.service.fetchTransactions({
      address,
    });

    // @TODO: Remove these logs and save correctly to the repository
    console.log('ethToFuelTxs = ', transactions.length, '\n\n');

    await this.repository.insertMany();
  }
}

export const syncBridgeEthToFuel = async ({ data }: QueueData<Input>) => {
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

    const ethPublicClient = getPublicClient(config);

    const service = new TxEthToFuelService(ethPublicClient);
    const repository = new BridgeTransactionRepository();

    const sync = new SyncBridgeEthToFuel({
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
