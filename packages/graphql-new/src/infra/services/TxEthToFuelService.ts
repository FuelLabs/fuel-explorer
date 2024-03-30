import type { GetPublicClientReturnType } from '@wagmi/core';

import { FuelMessagePortal } from '@fuel-bridge/solidity-contracts';
import { getBridgeSolidityContracts } from '@fuel-explorer/contract-ids';
import type { Address } from 'fuels';

import { decodeEventLog } from 'viem';
import { env } from '~/config';

type TxEthToFuelInputs = {
  fetchTransactions: {
    address: Address;
  };
  fetchLogs: {
    address: `0x${string}`;
    recipient: string;
    inputs?: (typeof FuelMessagePortal.abi)[number]['inputs'];
  };
};

type FuelMessagePortalArgs = {
  MessageSent: {
    amount: bigint;
    nonce: bigint;
    sender: `0x${string}`;
    recipient: `0x${string}`;
    data: `0x${string}`;
  };
};

const decodeMessageSentData = {
  erc20Deposit: (data: `0x${string}`) => {
    const pattern =
      /^0x([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})([A-f0-9]{64})$/;
    const match = data.match(pattern);
    const [, fuelTokenId, tokenAddress, , sender, to, amount] = match || [];
    const parsed = {
      fuelTokenId: `0x${fuelTokenId}`,
      tokenAddress: `0x${tokenAddress}`,
      sender: `0x${sender}`,
      to: `0x${to}`,
      amount,
    };

    return parsed;
  },
};

export class TxEthToFuelService {
  private ethPublicClient: GetPublicClientReturnType;

  constructor(ethPublicClient: GetPublicClientReturnType) {
    this.ethPublicClient = ethPublicClient;
  }

  async fetchTransactions({ address }: TxEthToFuelInputs['fetchTransactions']) {
    const abiMessageSent = FuelMessagePortal.abi.find(
      ({ name, type }) => name === 'MessageSent' && type === 'event',
    );

    const contracts = await getBridgeSolidityContracts(
      env.get('ETH_CHAIN_NAME'),
      env.get('FUEL_CHAIN_NAME'),
    );

    const [ethLogs, erc20AllLogs] = await Promise.all([
      this.fetchLogs({
        address: contracts.FuelMessagePortal,
        recipient: address.toHexString(),
        inputs: abiMessageSent?.inputs,
      }),
      this.fetchLogs({
        address: contracts.FuelMessagePortal,
        // @TODO: get predicate root contract address from FuelMessagePortal contract
        // CONTRACT_MESSAGE_PREDICATE (from @fuel-bridge/solidity-contracts)
        recipient:
          '0xb12658c759d8bae2cdc523ebd7aa8637912f32b1763d242ad3618448057b79cd',
        inputs: abiMessageSent?.inputs,
      }),
    ]);

    const erc20Logs = erc20AllLogs.filter((log) => {
      const messageSentEvent = decodeEventLog({
        abi: FuelMessagePortal.abi,
        data: log.data,
        topics: log.topics,
      }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

      const { to } = decodeMessageSentData.erc20Deposit(
        messageSentEvent.args.data,
      );

      return to === address.toHexString();
    });

    return [...ethLogs, ...erc20Logs];
  }

  private async fetchLogs({
    address,
    recipient,
    inputs = [],
  }: TxEthToFuelInputs['fetchLogs']) {
    const logs = await this.ethPublicClient!.getLogs({
      address,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs,
      },
      args: {
        recipient,
      },
      fromBlock: 'earliest',
    });

    return logs;
  }
}
