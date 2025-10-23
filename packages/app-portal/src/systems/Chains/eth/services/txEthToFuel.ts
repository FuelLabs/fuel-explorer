import type {
  Asset,
  Provider as FuelProvider,
  WalletUnlocked as FuelWallet,
  Message,
  TransactionResponse,
} from 'fuels';
import { BN, ErrorCode, Address as FuelAddress, FuelError, bn } from 'fuels';
import type {
  PublicClient,
  ReadContractReturnType,
  TransactionReceipt,
  WalletClient,
} from 'viem';
import { decodeEventLog, isAddressEqual } from 'viem';
import { erc20Abi } from 'viem';

import { relayCommonMessage } from '../../fuel/utils/relayMessage';
import type { FuelERC20GatewayArgs } from '../contracts/FuelErc20Gateway';
import { FUEL_ERC_20_GATEWAY } from '../contracts/FuelErc20Gateway';
import type { FuelMessagePortalArgs } from '../contracts/FuelMessagePortal';
import {
  FUEL_MESSAGE_PORTAL,
  decodeMessageSentData,
} from '../contracts/FuelMessagePortal';
import { getBlockDate, getTransactionReceipt, isErc20Address } from '../utils';

import {
  FUEL_INDEXER_API,
  type HexAddress,
  IS_FUEL_DEV_CHAIN,
  getBridgeSolidityContracts,
  getBridgeTokenContracts,
} from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import { forceRetryWithTimeout } from '~portal/systems/Core/utils/forceRetryWithTimeout';
import type { EthLog } from '../types';
import { getTokenContractImplementation } from '../utils/bridgeContract';
import { parseQueriedDataToEthDepositLogs } from '../utils/ethLogs';
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
  checkRequiresApproval: {
    ethAssetAddress: HexAddress;
    ethWalletClient: WalletClient;
    ethPublicClient: PublicClient;
    amount: BN;
  };
  approveERC20Amount: {
    ethAssetAddress: HexAddress;
    ethWalletClient: WalletClient;
    amount: BN;
    ethPublicClient: PublicClient;
  };
  createErc20Contract: {
    ethWalletClient?: WalletClient;
    ethPublicClient?: PublicClient;
    asset?: Asset;
  };
  getReceiptsInfo: {
    ethTxId?: HexAddress;
    inputEthTxNonce?: BigInt;
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
  receiptErc20Address?: HexAddress;
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
      const { ethWalletClient, fuelAddress, amount, ethPublicClient } = input;
      if (fuelAddress && ethWalletClient && ethPublicClient) {
        const bridgeSolidityContracts = await getBridgeSolidityContracts();

        const txHash = await safeWriteContract({
          client: {
            public: ethPublicClient,
            wallet: ethWalletClient,
          },
          write: {
            address: bridgeSolidityContracts.FuelMessagePortal,
            abi: FUEL_MESSAGE_PORTAL.abi,
            functionName: 'depositETH',
            value: BigInt(amount),
            args: [fuelAddress.toString() as HexAddress],
          },
        });

        const receipt = await getTransactionReceipt({
          ethPublicClient,
          txHash,
        });

        if (receipt.status !== 'success') {
          throw new Error('Failed to deposit ETH');
        }

        const nonce = receipt.logs.map((log) => {
          try {
            const messageSentEvent = decodeEventLog({
              abi: FUEL_MESSAGE_PORTAL.abi,
              data: log.data,
              topics: log.topics,
            }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

            return messageSentEvent?.args?.nonce;
          } catch (_) {
            /* empty */
          }
        })[0];

        if (nonce == null) {
          throw new Error('Failed to get nonce of ETH deposit');
        }

        return { txHash, nonce };
      }
    } catch (e) {
      if ((e as any)?.code === 'ACTION_REJECTED') {
        throw new Error('Wallet owner rejected this transaction.');
      }

      throw e;
    }

    return undefined;
  }

  static async approveERC20Amount(
    input: TxEthToFuelInputs['approveERC20Amount'],
  ) {
    const { ethAssetAddress, ethWalletClient, amount, ethPublicClient } = input;

    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const approveTxHash = await safeWriteContract({
      client: {
        public: ethPublicClient,
        wallet: ethWalletClient,
      },
      conditions: {
        pauser: [
          bridgeSolidityContracts.FuelMessagePortal,
          bridgeSolidityContracts.FuelERC20GatewayV4,
        ],
      },
      write: {
        address: ethAssetAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [
          bridgeSolidityContracts.FuelERC20GatewayV4,
          BigInt(amount.toHex()),
        ],
      },
    });
    const approveTxHashReceipt = await getTransactionReceipt({
      ethPublicClient,
      txHash: approveTxHash,
      waitOptions: { confirmations: 2 },
    });
    if (approveTxHashReceipt.status !== 'success') {
      throw new Error('Failed to approve Token for transfer');
    }
  }
  static async ERC20RequiresAllowance(
    input: TxEthToFuelInputs['checkRequiresApproval'],
  ) {
    const { ethAssetAddress, ethWalletClient, amount, ethPublicClient } = input;

    const erc20Token = EthConnectorService.connectToErc20({
      address: ethAssetAddress as HexAddress,
      walletClient: ethWalletClient,
      publicClient: ethPublicClient,
    });
    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const allowance = (await erc20Token.read.allowance([
      ethWalletClient.account?.address,
      bridgeSolidityContracts.FuelERC20GatewayV4,
    ])) as bigint;

    if (allowance == null) {
      throw new Error('Failed to get allowance of Token');
    }

    return new BN(allowance.toString()).lt(amount);
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
        const bridgeSolidityContracts = await getBridgeSolidityContracts();

        const depositTxHash = await safeWriteContract({
          client: {
            public: ethPublicClient,
            wallet: ethWalletClient,
          },
          conditions: {
            pauser: [bridgeSolidityContracts.FuelMessagePortal],
          },
          write: {
            address: bridgeSolidityContracts.FuelERC20GatewayV4,
            abi: FUEL_ERC_20_GATEWAY.abi,
            functionName: 'deposit',
            args: [
              fuelAddress.toString() as HexAddress,
              ethAssetAddress,
              amount,
            ],
          },
        });

        const receipt = await getTransactionReceipt({
          ethPublicClient,
          txHash: depositTxHash,
        });

        if (receipt.status !== 'success') {
          throw new Error('Failed to deposit ETH');
        }

        const nonce = receipt.logs.map((log) => {
          try {
            const messageSentEvent = decodeEventLog({
              abi: FUEL_MESSAGE_PORTAL.abi,
              data: log.data,
              topics: log.topics,
            }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

            return messageSentEvent?.args?.nonce;
          } catch (_) {
            /* empty */
          }
        })[0];

        if (nonce == null) {
          throw new Error('Failed to get nonce of ETH deposit');
        }

        return { txHash: depositTxHash, nonce };
      }
    } catch (e) {
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

    const { ethTxId, ethPublicClient, inputEthTxNonce } = input;

    let receipt: TransactionReceipt;
    try {
      receipt = await forceRetryWithTimeout(() =>
        ethPublicClient.getTransactionReceipt({
          hash: ethTxId,
        }),
      );
    } catch (_err: unknown) {
      throw new Error(
        `Failed to get transaction receipt: ${
          (_err as Error)?.message ?? _err
        }`,
      );
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

        const { amount, sender, nonce, recipient, data } =
          messageSentEvent.args;

        if (inputEthTxNonce === nonce) {
          const {
            tokenAddress,
            to,
            sender: senderERC20,
          } = decodeMessageSentData.erc20Deposit(data);
          const tokenSender = senderERC20 || sender;
          const tokenRecipient = to || recipient;

          receiptsInfo = {
            ...receiptsInfo,
            nonce: bn(nonce.toString()),
            amount: bn(amount.toString()),
            sender: tokenSender,
            recipient: FuelAddress.fromString(tokenRecipient),
            receiptErc20Address: tokenAddress as HexAddress,
          };
        }
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

        // search for a deposit log that matches the ERC-20 token address of the messageSent event
        if (
          isErc20Address(depositEvent.args.tokenAddress) &&
          isAddressEqual(
            depositEvent.args.tokenAddress,
            // we can convert "as HexAddress" safely because we validated if it's not undefined before
            receiptsInfo.receiptErc20Address as HexAddress,
          )
        ) {
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
      if (
        err instanceof FuelError &&
        (err.code === ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS ||
          err.code === ErrorCode.INSUFFICIENT_FUNDS ||
          err.message.includes('not enough coins to fit the target'))
      ) {
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

    const { fuelAddress, ethPublicClient } = input;
    // @TODO: get predicate root contract address from FuelMessagePortal contract
    const PREDICATE_ADDRESS =
      '0xe821b978bcce9abbf40c3e50ea30143e68c65fa95b9da8907fef59c02d954cec';

    if (!IS_FUEL_DEV_CHAIN && FUEL_INDEXER_API) {
      const bridgeSolidityContracts = await getBridgeSolidityContracts();

      const url = new URL(`${FUEL_INDEXER_API}/bridge/deposit/logs`);
      url.searchParams.set(
        'address',
        bridgeSolidityContracts.FuelMessagePortal,
      );
      url.searchParams.set('recipient', fuelAddress?.toHexString());
      url.searchParams.set('predicate', PREDICATE_ADDRESS);

      const response = await fetch(url.toString());
      const allLogs = parseQueriedDataToEthDepositLogs(await response.json());

      const ethAndErc20Logs = allLogs.reduce((acc, log) => {
        if (log.recipient === fuelAddress?.toHexString()) {
          acc.push(log);
        } else {
          const messageSentEvent = decodeEventLog({
            abi: FUEL_MESSAGE_PORTAL.abi,
            data: log.data,
            topics: log.topics,
          }) as unknown as { args: FuelMessagePortalArgs['MessageSent'] };

          const { to } = decodeMessageSentData.erc20Deposit(
            messageSentEvent.args.data,
          );

          if (to === fuelAddress?.toHexString()) {
            acc.push(log);
          }
        }

        return acc;
      }, [] as EthLog[]);

      return ethAndErc20Logs;
    }

    const bridgeSolidityContracts = await getBridgeSolidityContracts();

    const abiMessageSent = FUEL_MESSAGE_PORTAL.abi.find(
      ({ name, type }) => name === 'MessageSent' && type === 'event',
    );

    const ethLogs = await ethPublicClient?.getLogs({
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

    const erc20AllLogs = await ethPublicClient?.getLogs({
      address: bridgeSolidityContracts.FuelMessagePortal,
      event: {
        type: 'event',
        name: 'MessageSent',
        inputs: abiMessageSent?.inputs || [],
      },
      args: {
        recipient: PREDICATE_ADDRESS,
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
