import { http, createConfig, getPublicClient } from '@wagmi/core';
import { sepolia } from '@wagmi/core/chains';
import { fallback } from 'viem';

import { uniq } from 'lodash';

import {
  FuelChainState,
  FuelMessagePortal,
} from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from '@fuel-explorer/contract-ids';

import { QueueData, type QueueInputs, QueueNames } from '~/infra/queue';
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

export class SyncBridgeContractLogs {
  private service: TxEthToFuelService;
  private logsRepository: BridgeContractLogRepository;
  private blocksRepository: BridgeBlockRepository;

  constructor({ service, logsRepository, blocksRepository }: Props) {
    this.service = service;
    this.logsRepository = logsRepository;
    this.blocksRepository = blocksRepository;
  }

  async execute({ fromBlock, toBlock }: Input) {
    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    const isEvent = ({ type }: { type: string }) => type === 'event';
    const portalABI = FuelMessagePortal.abi.filter(isEvent);
    const chainStateABI = FuelChainState.abi.filter(isEvent);

    const logs = await this.service.getLogs({
      contracts: [contracts.FuelMessagePortal, contracts.FuelChainState],
      events: portalABI.concat(chainStateABI),
      fromBlock: BigInt(fromBlock),
      toBlock: BigInt(toBlock),
    });

    const blockNumbers = uniq(logs.map((tx) => tx.blockNumber));
    const blocks = await this.service.getBlocks(blockNumbers);

    try {
      await this.blocksRepository.insertMany(blocks);
      await this.logsRepository.insertMany(logs);
      console.log('✅ Bridge block and logs inserted');
      console.log(blocks.length, ' blocks');
      console.log(logs.length, ' logs');
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
    console.log(`Syncing block from ${data.fromBlock} to ${data.toBlock}`);

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
      `Sync bridge transactions from block ${data.fromBlock} to block ${data.toBlock}`,
      {
        cause: error,
      },
    );
  }
};
