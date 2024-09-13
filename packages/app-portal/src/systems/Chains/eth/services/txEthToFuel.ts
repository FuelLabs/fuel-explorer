import type { Asset } from '@fuel-ts/account';
import type {
  BN,
  Message,
  Provider as FuelProvider,
  TransactionResponse,
  WalletUnlocked as FuelWallet,
} from 'fuels';
import { Address as FuelAddress, ErrorCode, FuelError, bn } from 'fuels';
import type {
  PublicClient,
  ReadContractReturnType,
  TransactionReceipt,
  WalletClient,
} from 'viem';
import { decodeEventLog } from 'viem';
import { erc20Abi } from 'viem';

import { relayCommonMessage } from '../../fuel/utils/relayMessage';
import type { FuelERC20GatewayArgs } from '../contracts/FuelErc20Gateway';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import type { FuelMessagePortalArgs } from '../contracts/FuelMessagePortal';
import {
  FUEL_MESSAGE_PORTAL,
  decodeMessageSentData,
} from '../contracts/FuelMessagePortal';
import { getBlockDate, isErc20Address } from '../utils';

import {
  type HexAddress,
  getBridgeSolidityContracts,
  getBridgeTokenContracts,
} from 'app-commons';
import { getTokenContractImplementation } from '../utils/bridgeContract';
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
  } & TxEthToFuelInputs['startEth'];
  createErc20Contract: {
    ethWalletClient?: WalletClient;
    ethPublicClient?: PublicClient;
    asset?: Asset;
  };
  getReceiptsInfo: {
    ethTxId?: HexAddress;
    ethPublicClient?: PublicClient;
  };
  getFuelMessage: {
    ethTxNonce?: BN;
    fuelProvider?: FuelProvider;
  };
  getFuelMessageStatus: {
    fuelProvider?: FuelProvider;
    ethTxNonce?: BN;
  };
  relayMessageOnFuel: {
    ethPublicClient?: PublicClient;
    fuelWallet?: FuelWallet;
    fuelMessage?: Message;
  };
  fetchDepositLogs: {
    fuelAddress?: FuelAddress;
    ethPublicClient?: PublicClient;
  };
};

export type GetReceiptsInfoReturn = {
  erc20Token?: {
    address: HexAddress;
    decimals: number;
  };
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

    if (
      !input?.ethAssetAddress.startsWith('0x') ||
      !isErc20Address(input.ethAssetAddress)
    ) {
      throw new Error('Not valid asset');
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
        const bridgeSolidityContracts = await getBridgeSolidityContracts();
        const fuelPortal = EthConnectorService.connectToFuelMessagePortal({
          walletClient: ethWalletClient,
          bridgeSolidityContracts,
        });

        const txHash = await fuelPortal.write.depositETH(
          [fuelAddress.toB256() as HexAddress],
          {
            value: BigInt(amount),
            account: ethWalletClient.account,
          },
        );

        return txHash;
      }
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
      } = input;

      if (
        isErc20Address(ethAssetAddress) &&
        ethWalletClient &&
        fuelAddress &&
        ethPublicClient
      ) {
        const erc20Token = EthConnectorService.connectToErc20({
          address: ethAssetAddress as HexAddress,
          walletClient: ethWalletClient,
        });

        const bridgeSolidityContracts = await getBridgeSolidityContracts();
        const approveTxHash = await erc20Token.write.approve([
          bridgeSolidityContracts.FuelERC20GatewayV4,
          amount,
        ]);

        let approveTxHashReceipt: TransactionReceipt;
        try {
          approveTxHashReceipt = await ethPublicClient.getTransactionReceipt({
            hash: approveTxHash,
          });
        } catch (_err: unknown) {
          // workaround in place because waitForTransactionReceipt stop working after first time using it
          approveTxHashReceipt =
            await ethPublicClient.waitForTransactionReceipt({
              hash: approveTxHash,
              confirmations: 2,
            });
        }

        if (approveTxHashReceipt.status !== 'success') {
          throw new Error('Failed to approve Token for transfer');
        }

        const fuelErc20Gateway = EthConnectorService.connectToFuelErc20Gateway({
          walletClient: ethWalletClient,
          bridgeSolidityContracts,
        });
        const depositTxHash = await fuelErc20Gateway.write.deposit([
          fuelAddress.toB256() as HexAddress,
          ethAssetAddress,
          amount,
        ]);

        return depositTxHash;
      }
    } catch (e) {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      if ((e as any)?.code === 'ACTION_REJECTED') {
        throw new Error('Wallet owner rejected this transaction.');
      }

      throw e;
    }

    return undefined;
  }

  static async getReceiptsInfo(
    input: TxEthToFuelInputs['getReceiptsInfo'],
  ): Promise<GetReceiptsInfoReturn> {
    if (!input?.ethTxId) {
      throw new Error('No eth Tx id');
    }
    if (!input?.ethPublicClient) {
      throw new Error('No eth Provider');
    }

    const { ethTxId, ethPublicClient } = input;

    let receipt: TransactionReceipt;
    try {
      receipt = await ethPublicClient.getTransactionReceipt({
        hash: ethTxId,
      });
    } catch (_err: unknown) {
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
          const decimals = (await input.ethPublicClient.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: 'decimals',
          })) as ReadContractReturnType<typeof erc20Abi, 'decimals'>;

          receiptsInfo = {
            ...receiptsInfo,
            amount: bn(amount.toString()),
            erc20Token: {
              address: tokenAddress,
              decimals,
            },
          };
        }
      } catch (_) {
        /* empty */
      }
    }

    return receiptsInfo;
  }

  static async getFuelMessageStatus(
    input: TxEthToFuelInputs['getFuelMessageStatus'],
  ) {
    if (!input?.fuelProvider) {
      throw new Error('No Fuel provider found');
    }
    if (!input?.ethTxNonce) {
      throw new Error('No message nonce found');
    }

    const { fuelProvider, ethTxNonce } = input;
    const messageStatus = await fuelProvider.getMessageStatus(
      ethTxNonce.toHex(32).toString(),
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

    const { ethTxNonce, fuelProvider } = input;
    const fuelMessage = await fuelProvider.getMessageByNonce(
      ethTxNonce.toHex(32),
    );

    if (!fuelMessage) {
      throw new Error('Message not found');
    }

    return fuelMessage || undefined;
  }

  static async relayMessageOnFuel(
    input: TxEthToFuelInputs['relayMessageOnFuel'],
  ) {
    if (!input?.fuelWallet) {
      throw new Error('No fuel wallet found');
    }
    if (!input?.fuelMessage) {
      throw new Error('No fuel message found');
    }
    const { fuelWallet, fuelMessage } = input;

    let txMessageRelayed: TransactionResponse | undefined;
    try {
      const bridgeSolidityContracts = await getBridgeSolidityContracts();
      const bridgeTokenContracts = await getBridgeTokenContracts();

      // if the contractImplementation is not provided, we get from erc20 contract
      const implementationContract =
        bridgeTokenContracts?.FUEL_TokenContractImplementation ||
        (await getTokenContractImplementation({
          bridgeSolidityContracts,
          ethPublicClient: input.ethPublicClient,
          fuelWallet,
        }));

      txMessageRelayed = await relayCommonMessage({
        relayer: fuelWallet,
        message: fuelMessage,
        txParams: {
          maturity: undefined,
          contractIds: implementationContract
            ? [implementationContract]
            : undefined,
        },
      });
    } catch (err) {
      if (err instanceof FuelError && err.code === ErrorCode.NOT_ENOUGH_FUNDS) {
        throw new Error(
          'This transaction requires ETH on Fuel side to pay for gas. Please faucet your wallet or bridge ETH.',
        );
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
      ({ name, type }) => name === 'MessageSent' && type === 'event',
    );

    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const ethLogs = await ethPublicClient!.getLogs({
      address: bridgeSolidityContracts.FuelMessagePortal,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs: abiMessageSent?.inputs || [],
      },
      args: {
        recipient: fuelAddress?.toHexString() as HexAddress,
      },
      fromBlock: 'earliest' as const,
    });

    const erc20AllLogs = await ethPublicClient!.getLogs({
      address: bridgeSolidityContracts.FuelMessagePortal,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs: abiMessageSent?.inputs || [],
      },
      args: {
        recipient:
          // TODO: get predicate root contract address from FuelMessagePortal contract
          '0xe821b978bcce9abbf40c3e50ea30143e68c65fa95b9da8907fef59c02d954cec',
      },
      fromBlock: 'earliest' as const,
    });

    const erc20Logs = erc20AllLogs.filter((log) => {
      const messageSentEvent = decodeEventLog({
        abi: FUEL_MESSAGE_PORTAL.abi,
        data: log.data,
        topics: log.topics,
      }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

      const { to } = decodeMessageSentData.erc20Deposit(
        messageSentEvent.args.data,
      );

      return to === fuelAddress?.toHexString();
    });

    return [...ethLogs, ...erc20Logs];
  }
}
