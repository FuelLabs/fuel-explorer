import fungibleTokenABI from '@fuel-bridge/fungible-token/bridge-fungible-token/implementation/out/release/bridge_fungible_token-abi.json';
import dayjs from 'dayjs';
import type {
  Asset,
  BN,
  Account as FuelWallet,
  MessageProof,
  NetworkFuel,
  TransactionResult,
} from 'fuels';
import {
  Contract,
  DateTime,
  Address as FuelAddress,
  Provider as FuelProvider,
  OperationName,
  TransactionResponse,
  TransactionStatus,
  bn,
  getDecodedLogs,
  getReceiptsMessageOut,
} from 'fuels';
import type { WalletClient } from 'viem';
import type { PublicClient as EthPublicClient } from 'viem';

import {
  FUEL_INDEXER_API,
  type HexAddress,
  IS_FUEL_DEV_CHAIN,
  getBridgeSolidityContracts,
} from 'app-commons';
import { safeWriteContract } from 'app-commons/safeWriteContract';
import { toBigInt } from 'ethers';
import { getAssetEthCurrentChain } from '~portal/systems/Assets/utils';
import { FUEL_CHAIN_STATE } from '../../eth/contracts/FuelChainState';
import { FUEL_MESSAGE_PORTAL } from '../../eth/contracts/FuelMessagePortal';
import { EthConnectorService } from '../../eth/services';
import { parseEthAddressToFuel } from '../../eth/utils/address';
import { createRelayMessageParams } from '../../eth/utils/relayMessage';
import { getTransactionReceipt } from '../../eth/utils/transaction';
import { getAssetAmountWithdrawed } from '../utils/transaction';

export type TxFuelToEthInputs = {
  startBase: {
    amount?: BN;
    fuelWallet?: FuelWallet;
    fuelProvider?: FuelProvider;
    ethAddress?: HexAddress;
  };
  startFungibleToken: {
    fuelAsset?: NetworkFuel;
  } & TxFuelToEthInputs['startBase'];
  waitTxResult: {
    fuelTxId: string;
    fuelProvider?: FuelProvider;
  };
  getMessageProof: {
    fuelTxId: string;
    nonce: string;
    fuelProvider?: FuelProvider;
    fuelBlockHashCommited?: string;
  };
  waitBlockCommit: {
    fuelWithdrawBlockId?: string;
    ethPublicClient: EthPublicClient;
    fuelProvider?: FuelProvider;
  };
  calculateDelayBasedOnTimeRemaining: {
    txId?: string;
    timeRemaining?: string | null;
  };
  waitBlockFinalization: {
    messageProof?: MessageProof;
    ethPublicClient: EthPublicClient;
    fuelBlockHashCommited: string;
    fuelProvider: FuelProvider;
  };
  getMessageRelayed: {
    ethPublicClient: EthPublicClient;
    messageId: string;
  };
  relayMessageFromFuelBlock: {
    messageProof: MessageProof;
    ethWalletClient: WalletClient;
    ethPublicClient: EthPublicClient;
    fuelTxResult: TransactionResult;
    assets: Asset[];
  };
  waitTxMessageRelayed: {
    txHash: HexAddress;
    ethPublicClient: EthPublicClient;
  };
  fetchTxs: {
    fuelAddress: FuelAddress;
    fuelProvider: FuelProvider;
  };
};

export class TxFuelToEthService {
  static assertStartBase(input: TxFuelToEthInputs['startBase']) {
    if (!input?.fuelWallet) {
      throw new Error('Need to connect Fuel Wallet');
    }
    if (!input?.fuelProvider) {
      throw new Error('Need Fuel Provider');
    }
    if (!input?.amount || input?.amount?.isZero()) {
      throw new Error('Need amount to send');
    }
    if (!input?.ethAddress) {
      throw new Error('Need ETH address to send');
    }
  }

  static assertStartFungibleToken(
    input: TxFuelToEthInputs['startFungibleToken'],
  ) {
    TxFuelToEthService.assertStartBase(input);
    if (!input?.fuelAsset?.contractId) {
      throw new Error('Need Fuel asset');
    }
  }

  static async start(input: TxFuelToEthInputs['startFungibleToken']) {
    if (input?.fuelAsset?.contractId) {
      return TxFuelToEthService.startFungibleToken(input);
    }

    return TxFuelToEthService.startBase(input);
  }

  static async startBase(input: TxFuelToEthInputs['startBase']) {
    TxFuelToEthService.assertStartBase(input);

    const { amount, fuelWallet, ethAddress, fuelProvider } = input;

    if (fuelWallet && ethAddress && amount && fuelProvider) {
      const baseAssetId = await fuelProvider.getBaseAssetId();
      const currentBalance = await fuelWallet.getBalance(baseAssetId);
      const MAX_FEE_RESERVE = bn(50_000);
      const remainingBalance = currentBalance.sub(amount);
      const needsAdjustment = remainingBalance.lt(MAX_FEE_RESERVE);
      let adjustedAmount = amount;

      if (needsAdjustment) {
        const shortfall = MAX_FEE_RESERVE.sub(remainingBalance);
        adjustedAmount = amount.sub(shortfall);
      }

      const txFuel = await fuelWallet.withdrawToBaseLayer(
        FuelAddress.fromString(parseEthAddressToFuel(ethAddress)),
        adjustedAmount,
      );

      return txFuel.id;
    }
  }

  static async startFungibleToken(
    input: TxFuelToEthInputs['startFungibleToken'],
  ) {
    TxFuelToEthService.assertStartFungibleToken(input);

    const { amount, fuelWallet, ethAddress, fuelAsset, fuelProvider } = input;

    if (fuelAsset?.contractId && fuelWallet && amount && fuelProvider) {
      const ethAddressInFuel = parseEthAddressToFuel(ethAddress);
      const fungibleToken = new Contract(
        fuelAsset.contractId,
        // TODO: Remove this cast when @fuel-bridge gets a version compatible with sdk 0.92.1
        fungibleTokenABI as any,
        fuelWallet,
      );

      const transactionRequest = await fungibleToken.functions
        .withdraw(ethAddressInFuel)
        .callParams({
          forward: {
            amount: bn.parseUnits(
              amount.format({
                precision: fuelAsset.decimals,
                units: fuelAsset.decimals,
              }),
              fuelAsset.decimals,
            ),
            assetId: fuelAsset.assetId,
          },
        })
        .fundWithRequiredCoins();

      const txCost = await fuelWallet.getTransactionCost(transactionRequest);
      transactionRequest.gasLimit = txCost.gasUsed;
      transactionRequest.maxFee = txCost.maxFee;
      const tx = await fuelWallet.sendTransaction(transactionRequest);
      const fWithdrawTxResult = await tx.waitForResult();
      if (fWithdrawTxResult.status !== TransactionStatus.success) {
        throw new Error('Failed to withdraw tokens to Ethereum');
      }

      return fWithdrawTxResult.id;
    }
  }

  static async waitTxResult(input: TxFuelToEthInputs['waitTxResult']) {
    if (!input?.fuelProvider) {
      throw new Error('Need to connect Fuel Provider');
    }
    if (!input?.fuelTxId) {
      throw new Error('Need transaction Id');
    }
    const chainId = await input.fuelProvider.getChainId();
    const { fuelTxId, fuelProvider } = input;

    const response = new TransactionResponse(
      fuelTxId || '',
      fuelProvider,
      chainId,
    );
    const txResult = await response.waitForResult();
    const message = getReceiptsMessageOut(txResult.receipts)[0];
    let recipient: string | undefined = undefined;
    try {
      // for ERC20 the recipient is in the "to" field of the log
      const messageSentLog = getDecodedLogs<{ to?: string }>(
        txResult.receipts,
        fungibleTokenABI,
      )[1];
      recipient = messageSentLog?.to || undefined;
    } catch (_) {}

    if (!recipient) {
      recipient = message?.recipient;
    }

    const sender =
      txResult.operations.find((o) => o.name === OperationName.withdrawFromFuel)
        ?.from?.address || message?.sender;

    return {
      txResult,
      messageId: message?.messageId,
      recipient,
      sender,
      nonce: message?.nonce,
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

    const withdrawBlock = await fuelProvider.getBlock(fuelWithdrawBlockId);

    if (!withdrawBlock) {
      throw new Error('Withdraw block not found');
    }
    const withdrawBlockHeight = withdrawBlock.height;

    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const fuelChainState = EthConnectorService.connectToFuelChainState({
      publicClient: ethPublicClient,
      bridgeSolidityContracts,
    });

    const [blocksPerCommitInterval, timeToFinalize] = await Promise.all([
      fuelChainState.read.BLOCKS_PER_COMMIT_INTERVAL(),
      fuelChainState.read.TIME_TO_FINALIZE(),
    ]);

    const lastFinalizedBlock = await FUEL_CHAIN_STATE.getLastBlockFinalized({
      ethPublicClient,
      timeToFinalize: timeToFinalize as bigint,
    });
    if (lastFinalizedBlock) {
      const lastFinalizedFuelBlock = await fuelProvider.getBlock(
        lastFinalizedBlock.fuelBlockHash,
      );

      // If the last finalized block is greater than the withdraw block, we can return the last finalized block as committed
      if (lastFinalizedFuelBlock?.height.gte(withdrawBlockHeight)) {
        return {
          blockHashCommited: lastFinalizedBlock.fuelBlockHash as HexAddress,
        };
      }
    }

    // Add + 1 to the block height to wait the next block
    // that enable to proof the message
    const nextBlockHeight = bn(withdrawBlockHeight).add(1);
    // To get the block slot where the block is going to be commited
    // We need to divide the desired block by the BLOCKS_PER_COMMIT_INTERVAL
    // and round up. Ex.: 225/100 sould be on the slot 3
    const { mod, div } = bn(nextBlockHeight).divmod(
      (blocksPerCommitInterval as bigint).toString(),
    );
    const commitHeight = mod.isZero() ? div : div.add(1);

    const commitHashAtL1 = await fuelChainState.read.blockHashAtCommit([
      commitHeight.toString(),
    ]);

    const block = await fuelProvider.getBlock(commitHashAtL1 as string);
    const isCommited = bn(block?.height).gte(nextBlockHeight);

    if (isCommited) {
      return {
        blockHashCommited: commitHashAtL1 as HexAddress,
      };
    }

    const { lastEthBlockCommitted } =
      await FUEL_CHAIN_STATE.getLastBlockCommited({
        ethPublicClient,
        fuelProvider,
      });

    const dateLastCommit = new Date(
      Number(lastEthBlockCommitted.timestamp) * 1000,
    );
    // It's safe to convert bigint to number in this case as the values of
    // blockPerCommitInterval and timeToFinalize are not too big.
    const nextCommitTime = Number(blocksPerCommitInterval);
    const estimatedNextCommitDate = dayjs(dateLastCommit)
      .add(nextCommitTime, 'seconds')
      .toDate();

    const totalTimeInSeconds = nextCommitTime + Number(timeToFinalize);
    const estimatedFinishDate = dayjs(dateLastCommit)
      .add(totalTimeInSeconds, 'seconds')
      .toDate();

    return {
      estimatedNextCommitDate,
      estimatedFinishDate,
    };
  }

  static calculateDelayBasedOnTimeRemaining(
    input: TxFuelToEthInputs['calculateDelayBasedOnTimeRemaining'],
  ) {
    const DEFAULT_DELAY_TIME_10_SECONDS = 10000;
    if (!input.txId || !input.timeRemaining) {
      return DEFAULT_DELAY_TIME_10_SECONDS;
    }
    const CURRENT_TIMESTAMP = new Date().getTime();
    const TIME_24_HOURS = 86400000;
    const TIME_1_HOUR = 3600000;
    const TIME_10_MINUTES = 600000;
    const TIME_1_MINUTE = 60000;
    const remainingTime =
      Number.parseInt(input.timeRemaining) - CURRENT_TIMESTAMP;
    if (remainingTime > TIME_24_HOURS) return TIME_24_HOURS;
    if (remainingTime > TIME_1_HOUR) return TIME_1_HOUR;
    if (remainingTime > TIME_10_MINUTES) return TIME_10_MINUTES;
    if (remainingTime > TIME_1_MINUTE) return TIME_1_MINUTE;
    return DEFAULT_DELAY_TIME_10_SECONDS;
  }

  static async getMessageProof(input: TxFuelToEthInputs['getMessageProof']) {
    if (!input?.fuelProvider) {
      throw new Error('Need to connect Fuel Provider');
    }
    if (!input?.fuelTxId) {
      throw new Error('Need transaction Id');
    }
    if (!input?.nonce) {
      throw new Error('Need nonce');
    }
    if (!input?.fuelBlockHashCommited) {
      throw new Error('Need last block ID');
    }

    const { fuelTxId, fuelProvider, nonce, fuelBlockHashCommited } = input;
    const provider = new FuelProvider(fuelProvider.url);
    const withdrawMessageProof = await provider.getMessageProof(
      fuelTxId,
      nonce,
      fuelBlockHashCommited,
    );

    return withdrawMessageProof || undefined;
  }

  static async waitBlockFinalization(
    input: TxFuelToEthInputs['waitBlockFinalization'],
  ) {
    if (!input?.messageProof) {
      throw new Error('Need message proof ');
    }
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }

    const { ethPublicClient, messageProof, fuelBlockHashCommited } = input;

    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const fuelChainState = EthConnectorService.connectToFuelChainState({
      publicClient: ethPublicClient,
      bridgeSolidityContracts,
    });

    const isFinalized = await fuelChainState.read.finalized([
      messageProof.commitBlockHeader.id,
      messageProof.commitBlockHeader.height.toString(),
    ]);

    if (isFinalized) {
      return {
        isFinalized: true,
      };
    }

    const timeToFinalize = await fuelChainState.read.TIME_TO_FINALIZE();

    const lastBlock = await FUEL_CHAIN_STATE.getBlockCommited({
      ethPublicClient,
      fuelBlockHashCommited,
    });
    const dateLastCommit = new Date(Number(lastBlock.timestamp) * 1000);
    const estimatedFinishDate = dayjs(dateLastCommit)
      .add(Number(timeToFinalize), 'seconds')
      .toDate();

    return {
      estimatedFinishDate,
    };
  }

  static async getMessageRelayed(
    input: TxFuelToEthInputs['getMessageRelayed'],
  ) {
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.messageId) {
      throw new Error('Need message ID');
    }

    const { messageId, ethPublicClient } = input;

    const bridgeSolidityContracts = await getBridgeSolidityContracts();

    if (!IS_FUEL_DEV_CHAIN && FUEL_INDEXER_API) {
      const url = new URL(`${FUEL_INDEXER_API}/bridge/message/relayed/hash`);
      url.searchParams.set(
        'address',
        bridgeSolidityContracts.FuelMessagePortal,
      );
      url.searchParams.set('message_id', messageId);

      const response = await fetch(url.toString());
      const data = await response.json();

      return data?.[0]?.transactionHash || undefined;
    }

    const abiMessageRelayed = FUEL_MESSAGE_PORTAL.abi.find(
      ({ name, type }) => name === 'MessageRelayed' && type === 'event',
    );
    const logs = await ethPublicClient.getLogs({
      address: bridgeSolidityContracts.FuelMessagePortal,
      event: {
        type: 'event',
        name: 'MessageRelayed',
        inputs: abiMessageRelayed?.inputs || [],
      },
      args: {
        messageId: input.messageId as HexAddress,
      },
      fromBlock: 'earliest',
    });

    return logs?.[0]?.transactionHash || undefined;
  }

  static async relayMessageFromFuelBlock(
    input: TxFuelToEthInputs['relayMessageFromFuelBlock'],
  ) {
    if (!input?.ethWalletClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.ethPublicClient) {
      throw new Error('Need a ETH public client');
    }
    if (!input?.messageProof) {
      throw new Error('Need message proof to relay on ETH side');
    }
    if (!input?.fuelTxResult) {
      throw new Error('Need fuel tx result');
    }
    if (!input?.assets) {
      throw new Error('Need assets');
    }

    const {
      messageProof,
      ethWalletClient,
      ethPublicClient,
      fuelTxResult,
      assets,
    } = input;

    const relayMessageParams = await createRelayMessageParams(messageProof);

    const bridgeSolidityContracts = await getBridgeSolidityContracts();
    const fuelPortal = EthConnectorService.connectToFuelMessagePortal({
      walletClient: ethWalletClient,
      publicClient: ethPublicClient,
      bridgeSolidityContracts,
    });

    if (!IS_FUEL_DEV_CHAIN) {
      const assetAmount = getAssetAmountWithdrawed({
        txResult: fuelTxResult,
        assets,
      });
      if (!assetAmount?.asset) {
        throw new Error('Need asset');
      }
      const ethNetworkAsset = getAssetEthCurrentChain(assetAmount?.asset);
      const tokenAddress = ethNetworkAsset?.address;
      const bigIntAmount = toBigInt(
        bn
          .parseUnits(assetAmount?.amount || '', ethNetworkAsset?.decimals)
          .toHex(),
      );

      let limitAmount = 0n;
      let currentPeriodAmount = 0n;
      let currentPeriodEnd = 0n;
      if (!tokenAddress) {
        // validate limit for ETH withdraw
        const isRateLimitEnabled = await fuelPortal.read.rateLimitEnabled();

        if (isRateLimitEnabled) {
          limitAmount = (await fuelPortal.read.limitAmount()) as bigint;
          currentPeriodAmount =
            (await fuelPortal.read.currentPeriodAmount()) as bigint;
          currentPeriodEnd =
            (await fuelPortal.read.currentPeriodEnd()) as bigint;

          if (currentPeriodAmount + bigIntAmount >= limitAmount) {
            const formattedLimitAmount = bn
              .parseUnits(limitAmount.toString(), 0)
              .format({
                precision: ethNetworkAsset?.decimals || 18,
                units: ethNetworkAsset?.decimals || 18,
              });
            throw new Error(
              `Your withdrawal will exceed the contract's withdrawal limit of ${formattedLimitAmount} ${assetAmount.asset.symbol} for each period.
              The current period ends on ${dayjs(Number(currentPeriodEnd) * 1000).format('DD/MM/YYYY [at] HH:mm:ss')}, after which the limit will be reset.

              Please try again after that time if your withdrawal amount is within the limit. If your withdrawal exceeds the total limit, please contact support via the Fuel Forum or Discord.`,
            );
          }
        }
      } else if (assetAmount?.asset) {
        // validate limit for erc20 withdraw
        const fuelErc20Gateway = EthConnectorService.connectToFuelErc20Gateway({
          walletClient: ethWalletClient,
          publicClient: ethPublicClient,
          bridgeSolidityContracts,
        });

        // First check if rate limiting is enabled for this token
        const isRateLimitEnabled = await fuelErc20Gateway.read.rateLimitStatus([
          tokenAddress,
        ]);

        if (isRateLimitEnabled) {
          limitAmount = (await fuelErc20Gateway.read.limitAmount([
            tokenAddress,
          ])) as bigint;
          currentPeriodAmount =
            (await fuelErc20Gateway.read.currentPeriodAmount([
              tokenAddress,
            ])) as bigint;
          currentPeriodEnd = (await fuelErc20Gateway.read.currentPeriodEnd([
            tokenAddress,
          ])) as bigint;

          // Only check limits if rate limiting is enabled and limits are set
          const formattedLimitAmount = bn
            .parseUnits(limitAmount.toString(), 0)
            .format({
              precision: ethNetworkAsset?.decimals || 18,
              units: ethNetworkAsset?.decimals || 18,
            });

          if (currentPeriodAmount + bigIntAmount >= limitAmount) {
            throw new Error(
              `Your withdrawal will exceed the contract's withdrawal limit of ${formattedLimitAmount} ${assetAmount.asset.symbol} for each period. 
                The current period ends on ${dayjs(Number(currentPeriodEnd) * 1000).format('YYYY-MM-DD [at] HH:mm:ss')}, after which the limit will be reset.
                
                Please try again after that time if your withdrawal amount is within the limit. If your withdrawal exceeds the total limit, please contact support via the Fuel Forum or Discord.`,
            );
          }
        }
      }
    }

    const txHash = await safeWriteContract({
      client: {
        public: ethPublicClient,
        wallet: ethWalletClient,
      },
      write: {
        address: bridgeSolidityContracts.FuelMessagePortal,
        abi: FUEL_MESSAGE_PORTAL.abi,
        functionName: 'relayMessage',
        args: [
          relayMessageParams.message,
          relayMessageParams.rootBlockHeader,
          relayMessageParams.blockHeader,
          relayMessageParams.blockInHistoryProof,
          relayMessageParams.messageInBlockProof,
        ],
      },
    });

    return txHash;
  }

  static async waitTxMessageRelayed(
    input: TxFuelToEthInputs['waitTxMessageRelayed'],
  ) {
    if (!input?.ethPublicClient) {
      throw new Error('Need to connect ETH Wallet');
    }
    if (!input?.txHash) {
      throw new Error('Need transaction hash');
    }

    const { ethPublicClient, txHash } = input;

    const txReceipt = await getTransactionReceipt({
      ethPublicClient,
      txHash,
    });

    if (txReceipt.status !== 'success') {
      throw new Error('Failed to relay message (transaction reverted)');
    }

    return !!txReceipt;
  }

  static async fetchTxs(input: TxFuelToEthInputs['fetchTxs']) {
    if (!input?.fuelAddress) {
      throw new Error('No Fuel address found');
    }
    if (!input?.fuelProvider) {
      throw new Error('No Fuel provider found');
    }

    const { fuelAddress, fuelProvider } = input;

    const bridgeTxs: { id: string; time: Date }[] = [];

    let hasNextPage = true;
    let endCursor = undefined;
    // go until last page
    while (hasNextPage) {
      const query = `
        query {
          transactionsByOwner(first: 500, owner: "${fuelAddress}"${endCursor ? `, after: "${endCursor}"` : ''}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              status {
                __typename
                ... on SuccessStatus {
                  time
                  receipts {
                    receiptType
                  }
                }
              }
            }
          }
        }
      `;

      const response: Response = await fetch(fuelProvider.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const responseJson = await response.json();
      const { data, errors } = responseJson;

      if (errors && errors.length > 0) {
        console.error('GraphQL errors in transactionsByOwner query:', {
          errors,
          hasData: !!data,
          providerUrl: fuelProvider.url,
          owner: fuelAddress.toString(),
        });
        if (data?.transactionsByOwner) {
          // Continue processing if data exists despite errors
        } else {
          break;
        }
      }

      if (!data) {
        console.error('Received null data from transactionsByOwner query', {
          responseJson,
          providerUrl: fuelProvider.url,
          owner: fuelAddress.toString(),
        });
        break;
      }

      const { transactionsByOwner } = data;

      if (!transactionsByOwner) {
        break;
      }

      const { nodes, pageInfo } = transactionsByOwner;

      if (!nodes || !pageInfo) {
        break;
      }

      for (const node of nodes) {
        const receipts = node.status?.receipts || [];
        const messageOutReceipt = receipts.find(
          (receipt: any) => receipt?.receiptType === 'MESSAGE_OUT',
        );
        if (messageOutReceipt && node.status?.time) {
          bridgeTxs.push({
            id: node.id,
            time: new Date(
              DateTime.fromTai64(node.status.time).toUnixMilliseconds(),
            ),
          });
        }
      }

      hasNextPage = pageInfo.hasNextPage ?? false;
      endCursor = pageInfo.endCursor;
    }

    return bridgeTxs;
  }
}
