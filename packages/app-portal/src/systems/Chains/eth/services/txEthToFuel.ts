import type {
  BN,
  Message,
  WalletUnlocked as FuelWallet,
  TransactionResponse,
  Provider as FuelProvider,
} from 'fuels';
import { Address as FuelAddress, bn, ZeroBytes32 } from 'fuels';
import type { WalletClient } from 'viem';
import { decodeEventLog } from 'viem';
import type { PublicClient } from 'wagmi';
import type { FetchTokenResult } from 'wagmi/actions';
import { fetchToken } from 'wagmi/actions';
import {
  VITE_ETH_FUEL_ERC20_GATEWAY,
  VITE_ETH_FUEL_MESSAGE_PORTAL,
} from '~/config';
import type { Asset } from '~/systems/Assets/services/asset';

import { relayCommonMessage } from '../../fuel/utils/relayMessage';
import type { FuelERC20GatewayArgs } from '../contracts/FuelErc20Gateway';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import type { FuelMessagePortalArgs } from '../contracts/FuelMessagePortal';
import {
  FUEL_MESSAGE_PORTAL,
  decodeMessageSentData,
} from '../contracts/FuelMessagePortal';
import { isErc20Address, getBlockDate } from '../utils';

import { EthConnectorService } from './connectors';

export type TxEthToFuelInputs = {
  startEth: {
    amount: string;
    fuelAddress?: FuelAddress;
    ethWalletClient?: WalletClient;
    ethPublicClient?: PublicClient;
  };
  startErc20: {
    ethAssetAddress?: string;
    fuelContractId?: string;
  } & TxEthToFuelInputs['startEth'];
  createErc20Contract: {
    ethWalletClient?: WalletClient;
    ethPublicClient?: PublicClient;
    asset?: Asset;
  };
  getReceiptsInfo: {
    ethTxId?: `0x${string}`;
    ethPublicClient?: PublicClient;
  };
  getFuelMessage: {
    ethTxNonce?: BN;
    fuelRecipient?: FuelAddress;
    fuelProvider?: FuelProvider;
  };
  getFuelMessageStatus: {
    fuelProvider?: FuelProvider;
    ethTxNonce?: BN;
  };
  relayMessageOnFuel: {
    fuelWallet?: FuelWallet;
    fuelMessage?: Message;
  };
  fetchDepositLogs: {
    fuelAddress?: FuelAddress;
    ethPublicClient?: PublicClient;
  };
};

export type GetReceiptsInfoReturn = {
  erc20Token?: FetchTokenResult;
  amount?: BN;
  sender?: string;
  recipient?: FuelAddress;
  nonce?: BN;
  ethDepositBlockHeight?: string;
  blockDate?: Date;
};

export class TxEthToFuelService {
  static assertStartEth(input: TxEthToFuelInputs['startEth']) {
    if (!input?.ethWalletClient?.account || !input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.amount) {
      throw new Error('Need amount to send');
    }
    if (!input?.fuelAddress) {
      throw new Error('Need fuel address to send');
    }
  }

  static assertStartErc20(input: TxEthToFuelInputs['startErc20']) {
    TxEthToFuelService.assertStartEth(input);
    if (!input?.ethAssetAddress) {
      throw new Error('Need asset to send');
    }
    if (!input?.fuelContractId) {
      throw new Error('Need contract ID of Fuel asset');
    }

    if (
      !input?.ethAssetAddress.startsWith('0x') ||
      !isErc20Address(input.ethAssetAddress)
    ) {
      throw new Error('Not valid asset');
    }
    if (!input?.fuelContractId.startsWith('0x')) {
      throw new Error('Not valid Fuel contract id');
    }
  }

  static async start(input: TxEthToFuelInputs['startErc20']) {
    if (isErc20Address(input?.ethAssetAddress)) {
      return TxEthToFuelService.startErc20(input);
    }

    return TxEthToFuelService.startEth(input);
  }

  static async startEth(input: TxEthToFuelInputs['startEth']) {
    TxEthToFuelService.assertStartEth(input);

    try {
      const { ethWalletClient, fuelAddress, amount } = input;
      if (fuelAddress && ethWalletClient) {
        const fuelPortal = EthConnectorService.connectToFuelMessagePortal({
          walletClient: ethWalletClient,
        });

        const txHash = await fuelPortal.write.depositETH(
          [fuelAddress.toB256() as `0x${string}`],
          {
            value: BigInt(amount),
            account: ethWalletClient.account,
          }
        );

        return txHash;
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((e as any)?.code === 'ACTION_REJECTED') {
        throw new Error('Wallet owner rejected this transaction.');
      }

      throw e;
    }

    return undefined;
  }

  static async startErc20(input: TxEthToFuelInputs['startErc20']) {
    TxEthToFuelService.assertStartErc20(input);

    try {
      const {
        ethWalletClient,
        fuelAddress,
        amount,
        ethAssetAddress,
        ethPublicClient,
        fuelContractId,
      } = input;

      if (
        isErc20Address(ethAssetAddress) &&
        ethWalletClient &&
        fuelAddress &&
        ethPublicClient
      ) {
        const erc20Token = EthConnectorService.connectToErc20({
          address: ethAssetAddress as `0x${string}`,
          walletClient: ethWalletClient,
        });

        const approveTxHash = await erc20Token.write.approve([
          VITE_ETH_FUEL_ERC20_GATEWAY,
          amount,
        ]);

        let approveTxHashReceipt;
        try {
          approveTxHashReceipt = await ethPublicClient.getTransactionReceipt({
            hash: approveTxHash,
          });
        } catch (err: unknown) {
          // workaround in place because waitForTransactionReceipt stop working after first time using it
          approveTxHashReceipt =
            await ethPublicClient.waitForTransactionReceipt({
              hash: approveTxHash,
            });
        }

        if (approveTxHashReceipt.status !== 'success') {
          throw new Error('Failed to approve Token for transfer');
        }

        const fuelErc20Gateway = EthConnectorService.connectToFuelErc20Gateway({
          walletClient: ethWalletClient,
        });
        const depositTxHash = await fuelErc20Gateway.write.deposit([
          fuelAddress.toB256() as `0x${string}`,
          ethAssetAddress,
          fuelContractId,
          amount,
        ]);

        return depositTxHash;
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((e as any)?.code === 'ACTION_REJECTED') {
        throw new Error('Wallet owner rejected this transaction.');
      }

      throw e;
    }

    return undefined;
  }

  static async getReceiptsInfo(
    input: TxEthToFuelInputs['getReceiptsInfo']
  ): Promise<GetReceiptsInfoReturn> {
    if (!input?.ethTxId) {
      throw new Error('No eth Tx id');
    }
    if (!input?.ethPublicClient) {
      throw new Error('No eth Provider');
    }

    const { ethTxId, ethPublicClient } = input;

    let receipt;
    try {
      receipt = await ethPublicClient.getTransactionReceipt({
        hash: ethTxId,
      });
    } catch (err: unknown) {
      // workaround in place because waitForTransactionReceipt stop working after first time using it
      receipt = await ethPublicClient.waitForTransactionReceipt({
        hash: ethTxId,
      });
    }

    if (receipt.status !== 'success') {
      throw new Error('Failed to deposit Token');
    }

    const blockDate = await getBlockDate({
      blockHash: receipt.blockHash,
      publicClient: ethPublicClient,
    });

    let receiptsInfo: GetReceiptsInfoReturn = {
      blockDate,
      ethDepositBlockHeight: receipt.blockNumber.toString(),
    };

    // search for logs of MessageSent event

    for (let i = 0; i < receipt.logs.length; i++) {
      try {
        const messageSentEvent = decodeEventLog({
          abi: FUEL_MESSAGE_PORTAL.abi,
          data: receipt.logs[i].data,
          topics: receipt.logs[i].topics,
        }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

        const { amount, sender, nonce, recipient } = messageSentEvent.args;

        receiptsInfo = {
          ...receiptsInfo,
          nonce: bn(nonce.toString()),
          amount: bn(amount.toString()),
          sender,
          recipient: FuelAddress.fromB256(recipient),
        };
      } catch (_) {
        /* empty */
      }
    }

    // search for logs of Deposit event, for ERC-20 deposit operation

    for (let i = 0; i < receipt.logs.length; i++) {
      try {
        const depositEvent = decodeEventLog({
          abi: FUEL_ERC_20_GATEWAY.abi,
          data: receipt.logs[i].data,
          topics: receipt.logs[i].topics,
        }) as unknown as { args: FuelERC20GatewayArgs['Deposit'] };

        if (isErc20Address(depositEvent.args.tokenAddress)) {
          const { amount, tokenAddress } = depositEvent.args;
          const erc20Token = await fetchToken({
            address: tokenAddress,
          });

          receiptsInfo = {
            ...receiptsInfo,
            amount: bn(amount.toString()),
            erc20Token,
          };
        }
      } catch (_) {
        /* empty */
      }
    }

    return receiptsInfo;
  }

  static async getFuelMessageStatus(
    input: TxEthToFuelInputs['getFuelMessageStatus']
  ) {
    if (!input?.fuelProvider) {
      throw new Error('No Fuel provider found');
    }
    if (!input?.ethTxNonce) {
      throw new Error('No message nonce found');
    }

    const { fuelProvider, ethTxNonce } = input;
    const messageStatus = await fuelProvider.getMessageStatus(
      ethTxNonce.toHex(32).toString()
    );
    return messageStatus;
  }

  static async getFuelMessage(input: TxEthToFuelInputs['getFuelMessage']) {
    if (!input?.ethTxNonce) {
      throw new Error('No nonce found');
    }
    if (!input?.fuelProvider) {
      throw new Error('No Fuel provider found');
    }
    if (!input?.fuelRecipient) {
      throw new Error('No Fuel recipient');
    }

    const { ethTxNonce, fuelProvider, fuelRecipient } = input;

    const messages = await fuelProvider.getMessages(fuelRecipient, {
      first: 1000,
    });
    const fuelMessage = messages.find((message) => {
      return message.nonce.toString() === ethTxNonce.toHex(32).toString();
    });

    return fuelMessage;
  }

  static async relayMessageOnFuel(
    input: TxEthToFuelInputs['relayMessageOnFuel']
  ) {
    if (!input?.fuelWallet) {
      throw new Error('No fuel wallet found');
    }
    if (!input?.fuelMessage) {
      throw new Error('No fuel message found');
    }
    const { fuelWallet, fuelMessage } = input;

    const { maxGasPerTx } = await input.fuelWallet.provider.getGasConfig();
    let txMessageRelayed: TransactionResponse | undefined;
    try {
      txMessageRelayed = await relayCommonMessage({
        relayer: fuelWallet,
        message: fuelMessage,
        txParams: { gasLimit: maxGasPerTx },
      });
    } catch (err) {
      if (err instanceof Error) {
        const messageToParse = err.message.replace(
          'not enough coins to fit the target:',
          ''
        );

        const noEthError =
          'This transaction requires ETH on Fuel to pay for gas. Please faucet your wallet or bridge ETH.';

        try {
          const parsedMessage = JSON.parse(messageToParse);
          if (
            parsedMessage.response?.errors[0].message ===
              'not enough coins to fit the target' &&
            parsedMessage.request?.variables.queryPerAsset[0].assetId ===
              ZeroBytes32
          ) {
            throw new Error(noEthError);
          }
        } catch (parseError) {
          if (
            parseError instanceof Error &&
            parseError.message === noEthError
          ) {
            throw parseError;
          }

          throw err;
        }
      }
      throw err;
    }

    const txMessageRelayedResult = await txMessageRelayed?.waitForResult();

    if (txMessageRelayedResult?.status !== 'success') {
      throw new Error('Failed to relay message on Fuel');
    }
  }

  static async fetchDepositLogs(input: TxEthToFuelInputs['fetchDepositLogs']) {
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.fuelAddress) {
      throw new Error('Need fuel address');
    }

    const { ethPublicClient, fuelAddress } = input;

    const abiMessageSent = FUEL_MESSAGE_PORTAL.abi.find(
      ({ name, type }) => name === 'MessageSent' && type === 'event'
    );

    const ethLogs = await ethPublicClient!.getLogs({
      address: VITE_ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs: abiMessageSent?.inputs || [],
      },
      args: {
        recipient: fuelAddress?.toHexString() as `0x${string}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      fromBlock: 'earliest',
    });

    const erc20AllLogs = await ethPublicClient!.getLogs({
      address: VITE_ETH_FUEL_MESSAGE_PORTAL as `0x${string}`,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs: abiMessageSent?.inputs || [],
      },
      args: {
        recipient:
          // TODO: get predicate root contract address from FuelMessagePortal contract
          '0xb12658c759d8bae2cdc523ebd7aa8637912f32b1763d242ad3618448057b79cd',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      fromBlock: 'earliest',
    });
    console.log(`erc20AllLogs`, erc20AllLogs);

    const erc20Logs = erc20AllLogs.filter((log) => {
      const messageSentEvent = decodeEventLog({
        abi: FUEL_MESSAGE_PORTAL.abi,
        data: log.data,
        topics: log.topics,
      }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

      const { to } = decodeMessageSentData.erc20Deposit(
        messageSentEvent.args.data
      );

      return to === fuelAddress?.toHexString();
    });

    return [...ethLogs, ...erc20Logs];
  }
}
