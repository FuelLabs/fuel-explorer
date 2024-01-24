import type { FuelWalletLocked } from '@fuel-wallet/sdk';
import type { BN, Provider as FuelProvider, MessageProof } from 'fuels';
import {
  bn,
  TransactionResponse,
  Address,
  ZeroBytes32,
  getReceiptsMessageOut,
} from 'fuels';
import type { WalletClient } from 'viem';
import type { PublicClient as EthPublicClient } from 'wagmi';
import { VITE_ETH_FUEL_MESSAGE_PORTAL } from '~/config';

import { FUEL_MESSAGE_PORTAL } from '../../eth/contracts/FuelMessagePortal';
import { TxEthToFuelService } from '../../eth/services';
import { createRelayMessageParams } from '../../eth/utils/relayMessage';
import { getBlock } from '../utils';

export type TxFuelToEthInputs = {
  create: {
    amount?: BN;
    fuelWallet?: FuelWalletLocked;
    ethAddress?: string;
  };
  waitTxResult: {
    fuelTxId: string;
    fuelProvider?: FuelProvider;
  };
  getMessageProof: {
    fuelTxId: string;
    messageId: string;
    fuelProvider?: FuelProvider;
    fuelBlockHashCommited?: string;
  };
  waitBlockCommit: {
    fuelWithdrawBlockId?: string;
    ethPublicClient: EthPublicClient;
    fuelProvider?: FuelProvider;
  };
  waitBlockFinalization: {
    messageProof?: MessageProof;
    ethPublicClient: EthPublicClient;
  };
  getMessageRelayed: {
    messageProof: MessageProof;
    ethPublicClient: EthPublicClient;
    messageId: string;
  };
  relayMessageFromFuelBlock: {
    messageProof: MessageProof;
    ethWalletClient: WalletClient;
  };
  waitTxMessageRelayed: {
    txHash: `0x${string}`;
    ethPublicClient: EthPublicClient;
  };
};

export class TxFuelToEthService {
  static async create(input: TxFuelToEthInputs['create']) {
    if (!input?.fuelWallet) {
      throw new Error('Need to connect Fuel Wallet');
    }
    if (!input?.amount || input?.amount?.isZero()) {
      throw new Error('Need amount to send');
    }
    if (!input?.ethAddress) {
      throw new Error('Need ETH address to send');
    }

    const { amount, fuelWallet, ethAddress } = input;
    const gasLimit = (await fuelWallet.provider.getChain()).consensusParameters
      .maxGasPerTx;
    const txFuel = await fuelWallet.withdrawToBaseLayer(
      Address.fromString(ethAddress),
      amount,
      // TODO: remove this once fuel-core is fixed (max_gas considering metered_bytes as well)
      {
        gasLimit: gasLimit.sub(10_000).toNumber(),
      }
    );

    return txFuel.id;
  }

  static async waitTxResult(input: TxFuelToEthInputs['waitTxResult']) {
    if (!input?.fuelProvider) {
      throw new Error('Need to connect Fuel Provider');
    }
    if (!input?.fuelTxId) {
      throw new Error('Need transaction Id');
    }

    const { fuelTxId, fuelProvider } = input;

    const response = new TransactionResponse(fuelTxId || '', fuelProvider);
    const txResult = await response.waitForResult();
    const message = getReceiptsMessageOut(txResult.receipts)[0];

    return {
      txResult,
      messageId: message?.messageId,
    };
  }

  static async waitBlockCommit(input: TxFuelToEthInputs['waitBlockCommit']) {
    if (!input?.fuelWithdrawBlockId) {
      throw new Error('Need withdraw block id');
    }
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.fuelProvider) {
      throw new Error('Need to connect Fuel Provider');
    }

    const { fuelWithdrawBlockId, ethPublicClient, fuelProvider } = input;

    const withdrawBlock = await getBlock({
      blockHash: fuelWithdrawBlockId,
      providerUrl: fuelProvider.url,
    });
    const withdrawBlockHeight = withdrawBlock.header.height;

    const fuelChainState = TxEthToFuelService.connectToFuelChainState({
      publicClient: ethPublicClient,
    });

    const blocksPerCommitInterval =
      (await fuelChainState.read.BLOCKS_PER_COMMIT_INTERVAL()) as bigint;

    // Add + 1 to the block height to wait the next block
    // that enable to proof the message
    const nextBlockHeight = bn(withdrawBlockHeight).add(1);
    // To get the block slot where the block is going to be commited
    // We need to divide the desired block by the BLOCKS_PER_COMMIT_INTERVAL
    // and round up. Ex.: 225/100 sould be on the slot 3
    const { mod, div } = bn(nextBlockHeight).divmod(
      blocksPerCommitInterval.toString()
    );
    const commitHeight = mod.isZero() ? div : div.add(1);

    const commitHashAtL1 = await fuelChainState.read.blockHashAtCommit([
      commitHeight.toString(),
    ]);
    const isBlock = commitHashAtL1 !== ZeroBytes32;
    if (!isBlock) return undefined;

    const block = await getBlock({
      providerUrl: fuelProvider.url,
      blockHash: commitHashAtL1 as string,
    });
    const isCommited = bn(block?.header.height).gte(nextBlockHeight);

    return isCommited ? (commitHashAtL1 as string) : undefined;
  }

  static async getMessageProof(input: TxFuelToEthInputs['getMessageProof']) {
    if (!input?.fuelProvider) {
      throw new Error('Need to connect Fuel Provider');
    }
    if (!input?.fuelTxId) {
      throw new Error('Need transaction Id');
    }
    if (!input?.messageId) {
      throw new Error('Need message ID');
    }
    if (!input?.fuelBlockHashCommited) {
      throw new Error('Need last block ID');
    }

    const { fuelTxId, fuelProvider, messageId, fuelBlockHashCommited } = input;

    const withdrawMessageProof = await fuelProvider.getMessageProof(
      fuelTxId,
      messageId,
      fuelBlockHashCommited
    );

    return withdrawMessageProof || undefined;
  }

  static async waitBlockFinalization(
    input: TxFuelToEthInputs['waitBlockFinalization']
  ) {
    if (!input?.messageProof) {
      throw new Error('Need message proof ');
    }
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }

    const { ethPublicClient, messageProof } = input;

    const fuelChainState = TxEthToFuelService.connectToFuelChainState({
      publicClient: ethPublicClient,
    });

    const isFinalized = await fuelChainState.read.finalized([
      messageProof.commitBlockHeader.id,
      messageProof.commitBlockHeader.height.toString(),
    ]);

    return !!isFinalized;
  }

  static async getMessageRelayed(
    input: TxFuelToEthInputs['getMessageRelayed']
  ) {
    if (!input?.messageProof) {
      throw new Error('Need message proof to relay on ETH side');
    }
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.messageId) {
      throw new Error('Need message ID');
    }

    const { ethPublicClient } = input;

    const abiMessageRelayed = FUEL_MESSAGE_PORTAL.abi.find(
      ({ name, type }) => name === 'MessageRelayed' && type === 'event'
    );

    const logs = await ethPublicClient.getLogs({
      address: VITE_ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
      event: {
        type: 'event',
        name: 'MessageRelayed',
        inputs: abiMessageRelayed?.inputs || [],
      },
      args: {
        messageId: input.messageId as `0x${string}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      fromBlock: 'earliest',
    });

    return logs?.[0]?.transactionHash || undefined;
  }

  static async relayMessageFromFuelBlock(
    input: TxFuelToEthInputs['relayMessageFromFuelBlock']
  ) {
    if (!input?.ethWalletClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.messageProof) {
      throw new Error('Need message proof to relay on ETH side');
    }

    const { messageProof, ethWalletClient } = input;

    const relayMessageParams = await createRelayMessageParams({
      withdrawMessageProof: messageProof,
    });

    const fuelPortal = TxEthToFuelService.connectToFuelMessagePortal({
      walletClient: ethWalletClient,
    });

    const txHash = await fuelPortal.write.relayMessage([
      relayMessageParams.message,
      relayMessageParams.rootBlockHeader,
      relayMessageParams.blockHeader,
      relayMessageParams.blockInHistoryProof,
      relayMessageParams.messageInBlockProof,
    ]);

    return txHash;
  }

  static async waitTxMessageRelayed(
    input: TxFuelToEthInputs['waitTxMessageRelayed']
  ) {
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }

    const { ethPublicClient, txHash } = input;

    const txReceipts = await ethPublicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    if (txReceipts.status !== 'success') {
      throw new Error('Failed to relay message (transaction reverted)');
    }

    return !!txReceipts;
  }
}
