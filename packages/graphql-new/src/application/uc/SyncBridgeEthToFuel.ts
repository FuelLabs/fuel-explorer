import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';

import { fallback } from 'viem';

import {
  FuelChainState,
  FuelMessagePortal,
} from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from '@fuel-explorer/contract-ids';

import { QueueData, type QueueInputs, QueueNames } from '~/infra/queue';
import { TxEthToFuelService } from '~/infra/services/TxEthToFuelService';

import { env } from '~/config';
import { BridgeContractLogRepository } from '~/domain/BridgeContractLog/BridgeContractLogRepository';

type Props = {
  service: TxEthToFuelService;
  repository: BridgeContractLogRepository;
};

type Input = QueueInputs[QueueNames.SYNC_BRIDGE_ETH_TO_FUEL];

// @TODO: This queue will be used only for block sync
export class SyncBridgeEthToFuel {
  private service: TxEthToFuelService;
  private repository: BridgeContractLogRepository;

  constructor({ service, repository }: Props) {
    this.service = service;
    this.repository = repository;
  }

  async execute({ fromBlock, toBlock }: Input) {
    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    const isEvent = ({ type }: { type: string }) => type === 'event';
    const portalABI = FuelMessagePortal.abi.filter(isEvent);
    const chainStateABI = FuelChainState.abi.filter(isEvent);

    const transactions = await this.service.getLogs({
      contracts: [contracts.FuelMessagePortal, contracts.FuelChainState],
      events: portalABI.concat(chainStateABI),
      fromBlock: BigInt(fromBlock),
      toBlock: BigInt(toBlock),
    });

    // @TODO: Pre-insert these block numbers if necessary
    const blockNumbers = transactions.map((tx) => tx.blockNumber);
    console.log('blockNumbers', blockNumbers);

    // await this.repository.insertMany(transactions);
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
    console.log(`Syncing block from ${data.fromBlock} to ${data.toBlock}`);

    const ethPublicClient = getPublicClient(config);

    const service = new TxEthToFuelService(ethPublicClient);
    const repository = new BridgeContractLogRepository();

    // const block = await ethPublicClient.getBlockNumber();
    // const latest = await repository.findLatestAdded();
    // const block = await ethPublicClient.getBlock({
    //   blockNumber: latest ? BigInt(latest.number + 1) : 0n,
    // });
    // const result = await repository.insertOne(block);
    const sync = new SyncBridgeEthToFuel({
      service,
      repository,
    });

    return sync.execute(data);
  } catch (error) {
    console.error(error);
    throw new Error(
      `Sync bridge transactions from block ${data.fromBlock} to block ${data.toBlock}`,
      {
        cause: error,
      },
    );
  }
};
