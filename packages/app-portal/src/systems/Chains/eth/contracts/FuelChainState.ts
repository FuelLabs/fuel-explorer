import { FuelChainState } from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from 'app-commons';
import type { PublicClient } from 'viem';

export const FUEL_CHAIN_STATE = {
  abi: FuelChainState.abi,
  getCommitSubmitted: async ({
    ethPublicClient,
  }: {
    ethPublicClient: PublicClient;
  }) => {
    const bridgeSolidityContracts = await getBridgeSolidityContracts();
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
      fromBlock: 'earliest',
    });

    return logs;
  },
  getLastBlockCommited: async ({
    ethPublicClient,
  }: {
    ethPublicClient: PublicClient;
  }) => {
    const logs = await FUEL_CHAIN_STATE.getCommitSubmitted({ ethPublicClient });
    const lastCommitBlockHash = logs[logs.length - 1]?.blockHash;
    const lastBlockCommited = await ethPublicClient.getBlock({
      blockHash: lastCommitBlockHash as `0x${string}`,
    });

    return lastBlockCommited;
  },
  getBlockCommited: async ({
    ethPublicClient,
    fuelBlockHashCommited,
  }: {
    ethPublicClient: PublicClient;
    fuelBlockHashCommited: string;
  }) => {
    const logs = await FUEL_CHAIN_STATE.getCommitSubmitted({ ethPublicClient });
    let ethBlockHash: `0x${string}` | undefined = undefined;
    for (let i = logs.length - 1; i >= 0; i--) {
      const log = logs[i];
      const args = log.args as unknown as { blockHash: string };
      if (args.blockHash === fuelBlockHashCommited) {
        ethBlockHash = log.blockHash as `0x${string}`;
        break;
      }
    }

    const block = await ethPublicClient.getBlock({
      blockHash: ethBlockHash,
    });

    return block;
  },
};
