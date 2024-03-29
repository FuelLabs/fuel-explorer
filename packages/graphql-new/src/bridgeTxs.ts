import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';

import { fallback } from 'viem';

import { Address as FuelAddress, Provider as FuelProvider } from 'fuels';

import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';
import { TxFuelToEthService } from '~/infra/services/TxFuelToEthService';

import { env } from '~/config';
import { SyncBridgeTransactions } from './application/uc/SyncBridgeTransactions';
import { BridgeTransactionRepository } from './domain/BridgeTransaction/BridgeTransactionRepository';

// @TODO: This file should be deleted after the integration with the inngest and graphql
const main = async () => {
  const chainName = env.get('ETH_CHAIN_NAME');
  const ALCHEMY_ID = env.get('ETH_ALCHEMY_ID');
  const INFURA_ID = env.get('ETH_INFURA_ID');

  // @TODO: Prepare it to use foundry as well (with "http" transport only)
  const config = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: fallback(
        [
          http(`https://eth-${chainName}.g.alchemy.com/v2/${ALCHEMY_ID}`),
          http(`https://${chainName}.infura.io/v3/${INFURA_ID}`),
          http(),
        ],
        { rank: false },
      ),
    },
  });

  const mockAddress = new FuelAddress(
    'fuel1r8c6r80lqd270amxum777vcl72qgprhsf53gt2u5nv4z8ktc8ffs40j74p',
  );

  const fuelProvider = await FuelProvider.create(env.get('FUEL_PROVIDER'));
  const ethPublicClient = getPublicClient(config);

  const fuelToEthService = new TxFuelToEthService(fuelProvider);
  const ethToFuelService = new TxEthToFuelService(ethPublicClient);

  const repository = new BridgeTransactionRepository();

  const uc = new SyncBridgeTransactions(
    fuelToEthService,
    ethToFuelService,
    repository,
  );
  await uc.execute({ address: mockAddress });
};

main();
