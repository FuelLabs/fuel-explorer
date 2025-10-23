import { FuelChainState } from '@fuel-bridge/solidity-contracts';
import {
  FUEL_INDEXER_API,
  type HexAddress,
  IS_FUEL_DEV_CHAIN,
  getBridgeSolidityContracts,
} from 'app-commons';
import type { PublicClient } from 'viem';

export const FUEL_CHAIN_STATE = {
  abi: FuelChainState.abi,
  getCommitSubmitted: async ({
    ethPublicClient,
  }: {
    ethPublicClient: PublicClient;
  }): Promise<{ ethBlockHash: string; fuelBlockHash: string }[]> => {
    // AVG block time in Ethereum is 13 seconds, so we use 10 seconds for safety
    // THIS CALCULATION CAN CHANGE, IF ETH STARTS TO PRODUCE BLOCKS FASTER
    // Get only the last ~8 days worth of logs
    // Seconds in a day = 86400
    // Number of blocks in a 7 days = (86400 * 7) / 13
    const blockHeight = (86400 * 7) / 10;
    const currentBlockHeight = await ethPublicClient.getBlockNumber();
    const fromBlock = currentBlockHeight - BigInt(blockHeight);
    const bridgeSolidityContracts = await getBridgeSolidityContracts();

    if (!IS_FUEL_DEV_CHAIN && FUEL_INDEXER_API) {
      const url = new URL(`${FUEL_INDEXER_API}/bridge/block/hashes`);
      url.searchParams.set('address', bridgeSolidityContracts.FuelChainState);
      url.searchParams.set('from_block', fromBlock.toString());

      const response = await fetch(url.toString());
      const data = await response.json();
      const committedBlockHashes = data.map((item: any) => ({
        ethBlockHash: item.ethBlockHash,
        fuelBlockHash: item.fuelBlockHash,
      }));
      return committedBlockHashes;
    }

    const abiCommitSubmitted = FUEL_CHAIN_STATE.abi.find(
      ({ name, type }) => name === 'CommitSubmitted' && type === 'event',
    );
    const logs = await ethPublicClient.getLogs({
      address: bridgeSolidityContracts.FuelChainState,
      event: {
        type: 'event',
        name: 'CommitSubmitted',
        inputs: abiCommitSubmitted?.inputs || [],
      },
      fromBlock: fromBlock > 0n ? fromBlock : 0n,
      toBlock: 'latest',
    });

    const committedBlockHashes = logs.map(({ blockHash, args }) => ({
      ethBlockHash: blockHash,
      fuelBlockHash: (args as { blockHash: string }).blockHash,
    }));

    return committedBlockHashes;
  },
  getLastBlockCommited: async ({
    ethPublicClient,
  }: {
    ethPublicClient: PublicClient;
  }) => {
    const committedBlockHashes = await FUEL_CHAIN_STATE.getCommitSubmitted({
      ethPublicClient,
    });
    const lastCommitBlockHash =
      committedBlockHashes[committedBlockHashes.length - 1];
    const lastBlockCommitted = await ethPublicClient.getBlock({
      blockHash: lastCommitBlockHash.ethBlockHash as HexAddress,
    });

    return lastBlockCommitted;
  },
  getLastBlockFinalized: async ({
    ethPublicClient,
  }: {
    ethPublicClient: PublicClient;
  }) => {
    const [latestFinalizedBlockHash] =
      await FUEL_CHAIN_STATE.getCommitSubmitted({
        ethPublicClient,
      });
    return latestFinalizedBlockHash;
  },
  getBlockCommited: async ({
    ethPublicClient,
    fuelBlockHashCommited,
  }: {
    ethPublicClient: PublicClient;
    fuelBlockHashCommited: string;
  }) => {
    const committedBlockHashes = await FUEL_CHAIN_STATE.getCommitSubmitted({
      ethPublicClient,
    });
    let ethBlockHash: HexAddress | undefined = undefined;
    for (let i = committedBlockHashes.length - 1; i >= 0; i--) {
      const blockHash = committedBlockHashes[i];
      if (blockHash.fuelBlockHash === fuelBlockHashCommited) {
        ethBlockHash = blockHash.ethBlockHash as HexAddress;
        break;
      }
    }

    const block = await ethPublicClient.getBlock({
      blockHash: ethBlockHash,
    });

    return block;
  },
};
