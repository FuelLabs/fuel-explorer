import { fuelsequencer } from '@fuel-infrastructure/fuelsequencerjs';
import { MsgWithdrawToEthereum } from '@fuel-infrastructure/fuelsequencerjs/dist/codegen/fuelsequencer/bridge/v1/tx';
import { getCurrentNetworkContracts } from 'app-commons/stakingAddresses';
import { ethers } from 'ethers';
import { arrayify, bn } from 'fuels';
import AbiFactory from '~/application/uc/IndexL1/abi/AbiFactory';
import { env } from '~/config';
import { logger } from '~/core/Logger';
import DataCache from '../cache/DataCache';

// 10 Hours to commit
const TIME_TO_COMMIT = 10 * 60 * 60;
// 30 minutes to sequencer indexer sync the info
const TIME_TO_SEQUENCER_INDEXER_SYNC = 1800;

const network = env.get('FUEL_CHAIN')!;
const currentNetworkContracts = getCurrentNetworkContracts(network);
const baseUrlIndexer =
  network === 'mainnet' ? 'indexer-fuel-seq' : 'testnet-indexer-fuel-seq';
const baseUrlRPC =
  network === 'mainnet' ? 'rest-fuel-seq' : 'testnet-rest-fuel-seq';

const COSMOS_URL_RPC = `https://${baseUrlRPC}.simplystaking.xyz`;
const COSMOS_URL_INDEXER = `https://${baseUrlIndexer}.simplystaking.xyz`;
const base = network === 'mainnet' ? 'mainnet' : 'sepolia';
const ETH_PROVIDER_URL = `https://eth-${base}.g.alchemy.com/v2/${env.get('ALCHEMY_API_KEY')}`;
const ETH_PROVIDER = new ethers.JsonRpcProvider(ETH_PROVIDER_URL);
const fuelStreamXAbi: any = AbiFactory.create(network, 'FuelStreamX');
const sequencerProxyAbi: any = AbiFactory.create(network, 'SequencerProxy');

function getValidAddress(address: string) {
  try {
    return ethers.getAddress(address);
  } catch (_error) {
    throw new Error(
      'Invalid address format, expected a valid Ethereum address',
    );
  }
}

interface StakingTransactionFactoryBase {
  event: Omit<MsgWithdrawToEthereum, 'amount'> & {
    timestamp: number;
    blockNumber: number;
    amount: string;
    txHash: string;
  };
}

interface StakingTransactionFactoryError extends StakingTransactionFactoryBase {
  error: true;
  timeToFinalizeFromStart?: never;
}

interface StakingTransactionFactory extends StakingTransactionFactoryBase {
  error?: never;
  timeToFinalizeFromStart: number;
}

function stakingTransactionFactory({
  event,
  error,
  timeToFinalizeFromStart = Number.NEGATIVE_INFINITY,
}: StakingTransactionFactoryError | StakingTransactionFactory) {
  return {
    amount: event.amount,
    from: event.from,
    totalTimeToFinalize: timeToFinalizeFromStart, // @TODO: + time to block finalization ETH
    status: {
      current: WithdrawStatus.SyncingWithSequencer,
      dateExpectedToFinalize: new Date(
        secondsToMs(event.timestamp + timeToFinalizeFromStart),
      ),
      error,
      all: {
        [WithdrawStatus.WithdrawSent]: {
          ethTx: {
            height: event.blockNumber.toString(),
            txHash: event.txHash,
            timestamp: event.timestamp,
          },
          dateExpectedToComplete: new Date(),
        },
        [WithdrawStatus.SyncingWithSequencer]: {
          dateExpectedToComplete: new Date(
            new Date(
              secondsToMs(event.timestamp + TIME_TO_SEQUENCER_INDEXER_SYNC),
            ),
          ),
        },
      },
    },
  };
}

interface BridgeCommitmentProof {
  total: number;
  index: number;
  leaf_hash: string;
  aunts: string[];
}

interface LastResultsProof {
  total: number;
  index: number;
  leaf_hash: string;
  aunts: string[];
}

interface BridgeCommitmentLeaf {
  height: number;
  last_results_hash: string;
}

interface GetSequencerCommitmentInclusionProofResponse {
  proof: {
    bridge_commitment_proof: BridgeCommitmentProof;
    last_results_proof: LastResultsProof;
    bridge_commitment_leaf: BridgeCommitmentLeaf;
    tx_result_marshalled: string;
  };
  bridge_commitment_proof_nonce: string;
}

type Withdraw = {
  TxHash: string;
  Nonce: string;
  FromAddress: string;
  Denom: string;
  Amount: string;
  IsProvable: boolean;
};

enum WithdrawStatus {
  WithdrawSent = 'Withdraw sent',
  SyncingWithSequencer = 'Synchronizing with Sequencer',
  SyncingWithL1 = 'Sequencer committing to L1',
  WaitingFinalization = 'Waiting for finalization',
  ReadyToProcessWithdraw = 'Ready for withdrawal',
  Finalized = 'Finalized',
}

type StakingTransaction = {
  from: string;
  amount: string;
  nonce?: string;
  proof?: GetSequencerCommitmentInclusionProofResponse;
  status: StatusWithETA;
  totalTimeToFinalize: number;
};

type StatusWithETA = {
  current: WithdrawStatus;
  dateExpectedToFinalize: Date;
  error?: boolean;
  all: Partial<Record<WithdrawStatus, StatusStep>>;
};

type StatusStep = {
  ethTx?: {
    height: string;
    txHash: string;
    timestamp: number;
  };
  sequencerTx?: {
    height: string;
    txHash: string;
    timestamp: number;
  };
  dateExpectedToComplete?: Date;
};

// 60 minutes
const CACHE_EXPIRATION = 1000 * 60 * 60;

function secondsToMs(seconds: number) {
  return seconds * 1000;
}

async function fetchSequencer<T = any>(pathname: string) {
  const url = new URL(pathname, COSMOS_URL_RPC);
  const result = await fetch(url.toString()).then((response) =>
    response.json(),
  );
  return result as T;
}

async function fetchPendingWithdrawals(address: string) {
  const url = new URL('/seq/withdrawals', COSMOS_URL_INDEXER);
  url.searchParams.append('address', address);
  const result: { Withdraws: null | Withdraw[] } = await fetch(
    url.toString(),
  ).then((response) => response.json());
  const withdraws = result?.Withdraws ?? [];
  return withdraws.sort((a, b) => {
    return Number(a.Nonce) > Number(b.Nonce) ? 1 : -1;
  });
}

async function fetchWithdrawProof(nonce: string) {
  const url = new URL('/seq/proof', COSMOS_URL_INDEXER);
  url.searchParams.append('nonce', nonce);
  const result: GetSequencerCommitmentInclusionProofResponse = await fetch(
    url.toString(),
  ).then((response) => response.json());
  return result;
}

async function getTransactionOnSequencer(txHash: string) {
  const data = await fetchSequencer<{
    tx_response: {
      height: string;
      timestamp: number;
    };
  }>(`/cosmos/tx/v1beta1/txs/${txHash}`);
  return data;
}

async function queryContractEvents(
  contractAddress: string,
  contractABI: readonly any[],
  eventName: string,
  options: any = {},
): Promise<Array<any>> {
  try {
    // Create contract interface
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      ETH_PROVIDER,
    );

    // Get the event fragment from the contract interface
    const eventFragment = contract.interface.getEvent(eventName)?.topicHash;

    // Query the events
    const events = await ETH_PROVIDER.getLogs({
      address: options.address || contractAddress,
      topics: [eventFragment ?? null].concat(options.topics || []),
      fromBlock: options.fromBlock || 0,
      toBlock: options.toBlock || 'finalized',
    });

    // Parse the events
    return events.map((log) => {
      const parsedLog = contract.interface.parseLog({
        topics: log.topics,
        data: log.data,
      });
      return {
        ...parsedLog?.args,
        blockNumber: log.blockNumber,
        transactionHash: log.transactionHash,
        logIndex: (log as any).logIndex,
      };
    });
  } catch (error) {
    console.error('Error querying events:', error);
    throw error;
  }
}

export async function getTimeToFinalize() {
  const cachedTimeToFinalizeWithdraw = DataCache.getInstance().get(
    'time-to-finalize-withdraw-minutes',
  );
  if (cachedTimeToFinalizeWithdraw) {
    return Number(cachedTimeToFinalizeWithdraw);
  }

  try {
    const contract = new ethers.Contract(
      currentNetworkContracts.FUEL_STREAM_X,
      fuelStreamXAbi,
      ETH_PROVIDER,
    );
    const value = await contract.timeToFinalize();
    const valueInMinutes = Number(value) / 60;
    DataCache.getInstance().save(
      'time-to-finalize-withdraw-minutes',
      CACHE_EXPIRATION,
      valueInMinutes.toString(),
    );
    return Number(valueInMinutes);
  } catch (error) {
    logger.error('Staking: getTimeToFinalize', error);
    return 2880; // current mainnet
  }
}

async function getEventsToSequencer(sender: string) {
  // Contract details
  const contractAddress = currentNetworkContracts.SEQUENCER_PROXY;
  // Query events with options
  const events = await queryContractEvents(
    contractAddress,
    sequencerProxyAbi,
    'Authorize',
    {
      fromBlock: 1,
      toBlock: 'latest',
      topics: [ethers.zeroPadValue(sender, 32)],
    },
  );

  for (const event of events) {
    const block = await ETH_PROVIDER.getBlock(event.blockNumber);
    (event as any).timestamp = block?.timestamp;
  }

  return events.sort((a, b) => {
    return (a as any)[0].timestamp > (b as any).timestamp ? -1 : 1;
  });
}

async function getCommitsFromSequencer(contractTimeToFinalize: number) {
  // add 8 day buffer to get more blocks and sure finalization is correct
  const buffer = 8 * 24 * 60 * 60;
  // consider 10 blocks per second
  const amountOfBlocksToCheckCommits = (contractTimeToFinalize + buffer) / 10;
  const latestBlockHeight = await ETH_PROVIDER.getBlockNumber();
  const contractAddress = currentNetworkContracts.FUEL_STREAM_X;
  // Query events with options
  const events = await queryContractEvents(
    contractAddress,
    fuelStreamXAbi,
    'HeadUpdate',
    {
      fromBlock: latestBlockHeight - amountOfBlocksToCheckCommits,
      toBlock: 'finalized',
      topics: [],
    },
  );

  for (const event of events) {
    const block = await ETH_PROVIDER.getBlock(event.blockNumber);
    (event as any).timestamp = block?.timestamp;
  }

  // sort ASC by block number (oldest first)
  return events.sort((a, b) => {
    return (a as any)[0] > (b as any)[0] ? 1 : -1;
  });
}

function getWithdrawToEthereumEvents(
  event: Awaited<ReturnType<typeof getEventsToSequencer>>[0],
) {
  const bytes = arrayify((event as any)[1]);
  const txDecoded = fuelsequencer.bridge.AuthorizeTx.decode(bytes);
  const messages: Array<MsgWithdrawToEthereum> = [];

  for (const message of txDecoded.messages) {
    switch (message.typeUrl) {
      case '/fuelsequencer.bridge.v1.MsgWithdrawToEthereum':
        messages.push(MsgWithdrawToEthereum.decode(message.value));
        break;
      default:
        null;
    }
  }

  return messages;
}

export async function getStakingTransactions(_address: string) {
  const address = getValidAddress(_address);
  const now = new Date();
  const [authorizedEvents, withdrawalsOnSequencer, _contractTimeToFinalize] =
    await Promise.all([
      getEventsToSequencer(address),
      fetchPendingWithdrawals(address),
      getTimeToFinalize(),
    ]);

  // add 10 minutes to ensure finalization is correct
  const contractTimeToFinalize = _contractTimeToFinalize + 10 * 60;
  const commitsFromSequencer = await getCommitsFromSequencer(
    contractTimeToFinalize,
  );
  const lastCommit = commitsFromSequencer.slice(-1)[0];

  const withdrawEventsEth: Array<
    Omit<MsgWithdrawToEthereum, 'amount'> & {
      timestamp: number;
      blockNumber: number;
      amount: string;
      txHash: string;
    }
  > = [];
  for (const event of authorizedEvents) {
    const messages = await getWithdrawToEthereumEvents(event);
    messages.map((message) => {
      withdrawEventsEth.push({
        ...message,
        amount: message.amount.amount.toString(),
        timestamp: (event as any).timestamp,
        blockNumber: event.blockNumber,
        txHash: event.transactionHash,
      });
    });
  }

  const stakingTransactions: Array<StakingTransaction> = [];

  // Retry Pattern, if the withdraw is not found on sequencer, we will retry with the next event
  let withdrawSeqEventBuffer = 0;

  for (const [index, event] of withdrawEventsEth.entries()) {
    try {
      const timePassedFromLastCommit =
        (new Date().getTime() - secondsToMs((lastCommit as any)?.timestamp)) /
        1000;
      const estimatedTimeToNextCommit =
        TIME_TO_COMMIT - timePassedFromLastCommit;
      const timeToFinalizeFromStart =
        contractTimeToFinalize + estimatedTimeToNextCommit;

      const stakingTransaction: any = stakingTransactionFactory({
        event,
        timeToFinalizeFromStart,
      });

      const withdrawOnSequencer =
        withdrawalsOnSequencer[withdrawSeqEventBuffer];
      if (withdrawOnSequencer) {
        if (withdrawOnSequencer.Amount !== event.amount) {
          stakingTransactions.push({
            ...stakingTransaction,
            status: {
              ...stakingTransaction.status,
              error: true,
            },
          });
          throw new Error(`--Amounts on EthIndex ${index} SeqIndex: ${withdrawSeqEventBuffer} do not match!--
            Sequencer: ${withdrawOnSequencer.TxHash} ${withdrawOnSequencer.Amount}
            Ethereum: ${event.txHash} ${event.amount}
          `);
        }
        stakingTransaction.status.current = WithdrawStatus.SyncingWithL1;
        stakingTransaction.nonce = withdrawOnSequencer.Nonce;

        const [proof, txSequencer] = await Promise.all([
          stakingTransaction.nonce
            ? fetchWithdrawProof(stakingTransaction.nonce)
            : null,
          getTransactionOnSequencer(withdrawOnSequencer.TxHash),
        ]);

        if (proof) {
          stakingTransaction.proof = proof;
        }
        const sequencerTx = {
          height: txSequencer.tx_response.height,
          txHash: withdrawOnSequencer.TxHash,
          timestamp:
            new Date(txSequencer.tx_response.timestamp).getTime() / 1000,
        };

        stakingTransaction.status.all[WithdrawStatus.SyncingWithSequencer] = {
          ...stakingTransaction.status.all[WithdrawStatus.SyncingWithSequencer],
          dateExpectedToComplete: new Date(),
          sequencerTx,
        };

        const timeToSequencerCommitOnL1 =
          new Date().getTime() + secondsToMs(estimatedTimeToNextCommit);
        stakingTransaction.status.all[WithdrawStatus.SyncingWithL1] = {
          dateExpectedToComplete: new Date(
            secondsToMs(event.timestamp) +
              secondsToMs(estimatedTimeToNextCommit),
          ),
        };

        // Time to finalize from sequencer tx to end
        const timeToFinishFromSequencerTx =
          timeToSequencerCommitOnL1 + secondsToMs(contractTimeToFinalize);

        stakingTransaction.status.dateExpectedToFinalize = new Date(
          timeToFinishFromSequencerTx,
        );

        const commit = commitsFromSequencer.find(
          (commit) =>
            (commit as any)['0'] >= Number(txSequencer.tx_response.height),
        );
        if (commit) {
          stakingTransaction.status.dateExpectedToFinalize = new Date(
            secondsToMs((commit as any)?.timestamp) +
              secondsToMs(contractTimeToFinalize),
          );

          stakingTransaction.status.all[WithdrawStatus.SyncingWithL1] = {
            ...stakingTransaction.status.all[WithdrawStatus.SyncingWithL1],
            ethTx: {
              height: commit.blockNumber.toString(),
              txHash: commit.transactionHash,
              timestamp: (commit as any).timestamp,
            },
            dateExpectedToComplete: new Date(),
          };
          stakingTransaction.status.current =
            WithdrawStatus.WaitingFinalization;
          stakingTransaction.status.all[WithdrawStatus.WaitingFinalization] = {
            dateExpectedToComplete:
              stakingTransaction.status.dateExpectedToFinalize,
          };
          const diffUntilFinalize = Math.max(
            stakingTransaction.status.dateExpectedToFinalize.getTime() -
              now.getTime(),
            0,
          );
          if (diffUntilFinalize === 0) {
            stakingTransaction.status.current =
              WithdrawStatus.ReadyToProcessWithdraw;

            const ethHexNonce = bn(stakingTransaction.nonce, 10).toHex(32);
            const events = await queryContractEvents(
              currentNetworkContracts.FUEL_STREAM_X,
              fuelStreamXAbi,
              'WithdrawalProcessed',
              {
                fromBlock: 1,
                toBlock: 'latest',
                topics: [ethHexNonce],
              },
            );

            if (events.length > 0) {
              stakingTransaction.status.current = WithdrawStatus.Finalized;
              stakingTransaction.status.all[
                WithdrawStatus.ReadyToProcessWithdraw
              ] = {
                ethTx: {
                  height: events[0].blockNumber.toString(),
                  txHash: events[0].transactionHash,
                  timestamp: (events[0] as any).timestamp,
                },
              };
            }
          }
        }
      }

      stakingTransactions.push(stakingTransaction);
      withdrawSeqEventBuffer++;
    } catch (error) {
      console.error(error);
    }
  }
  return {
    data: stakingTransactions,
  };
}
