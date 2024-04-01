import type { GetPublicClientReturnType } from '@wagmi/core';

import { FuelMessagePortal } from '@fuel-bridge/solidity-contracts';

import { AbiEvent } from 'viem';

type ABI = (typeof FuelMessagePortal.abi)[number];

type TxEthToFuelInputs = {
  getDepositLogs: {
    contract: `0x${string}`;
    fromBlock: bigint;
    toBlock: bigint;
  };
};

export class TxEthToFuelService {
  private ethPublicClient: GetPublicClientReturnType;
  private abi: ABI | undefined;
  private event: Pick<AbiEvent, 'name' | 'type'>;

  constructor(ethPublicClient: GetPublicClientReturnType) {
    this.ethPublicClient = ethPublicClient;
    this.event = {
      type: 'event',
      name: 'MessageSent',
    };
    this.abi = FuelMessagePortal.abi.find(
      ({ name, type }) => name === this.event.name && type === this.event.type,
    );
  }

  async getDepositLogs({
    contract,
    fromBlock,
    toBlock,
  }: TxEthToFuelInputs['getDepositLogs']) {
    const events = await this.ethPublicClient!.getLogs({
      address: contract,
      event: {
        type: this.event.type,
        name: this.event.name,
        inputs: this.abi?.inputs ?? [],
      },
      fromBlock,
      toBlock,
    });

    return events;
  }
}
