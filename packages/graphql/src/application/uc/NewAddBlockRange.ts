import { logger } from '~/core/Logger';
import { client } from '~/graphql/GraphQLSDK';
import type {
  GQLBlock,
  GQLContractCreated,
  GQLInput,
  GQLInputCoin,
  GQLInputMessage,
  GQLOutput,
  GQLTransaction,
} from '~/graphql/generated/sdk';
import Block from '~/infra/dao/Block';
import Transaction from '~/infra/dao/Transaction';
import { DatabaseConnection } from '~/infra/database/DatabaseConnection';
import IndexAsset from './IndexAsset/IndexAsset';
import IndexReceipts from './IndexReceipt';

export default class NewAddBlockRange {
  async execute(input: Input) {
    const indexAsset = new IndexAsset();
    const indexReceipts = new IndexReceipts();
    const { from, to } = input;
    logger.debug('Consumer', `Syncing blocks: #${from} - #${to}`);
    const blocksData = await this.getBlocks(from, to);
    if (blocksData.length === 0) {
      logger.debug('Consumer', `No blocks to sync: #${from} - #${to}`);
      return;
    }
    const start = performance.now();
    const connection = DatabaseConnection.getInstance();
    for (const blockData of blocksData) {
      const queries: { statement: string; params: any }[] = [];
      const block = new Block({ data: blockData });
      queries.push({
        statement:
          'insert into indexer.blocks (_id, id, timestamp, data, gas_used, total_fee, producer, transactions_count, da_height) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) on conflict do nothing',
        params: [
          block.id,
          block.blockHash,
          block.timestamp,
          block.data,
          block.totalGasUsed,
          block.totalFee,
          block.producer,
          block.transactions.length,
          block.data.header.daHeight,
        ],
      });
      for (const [index, transactionData] of blockData.transactions.entries()) {
        const transaction = new Transaction(
          transactionData,
          index,
          block.id,
          block.timestamp,
        );
        queries.push({
          statement:
            'insert into indexer.transactions (_id, tx_hash, timestamp, data, block_id) values ($1, $2, $3, $4, $5) on conflict do nothing',
          params: [
            transaction.id,
            transaction.transactionHash,
            transaction.timestamp,
            transaction.data,
            transaction.blockId,
          ],
        });
        try {
          await indexReceipts.execute(transaction);
        } catch (e: any) {
          logger.error('Consumer', 'Error indexing receipts', e);
        }
        const accounts = this.getAccounts(transactionData);
        for (const accountHash of accounts) {
          queries.push({
            statement:
              'insert into indexer.transactions_accounts (_id, block_id, tx_hash, account_hash) values ($1, $2, $3, $4) on conflict do nothing',
            params: [
              transaction.id,
              transaction.blockId,
              transaction.transactionHash,
              accountHash,
            ],
          });
        }
        if (transaction.data?.status?.receipts) {
          try {
            await indexAsset.execute(transaction);
          } catch (e: any) {
            logger.error('Consumer', 'Error fetching assets', e);
          }
        }
        if (transactionData.inputs) {
          for (const inputData of transactionData.inputs) {
            queries.push({
              statement:
                'insert into indexer.inputs (transaction_id, data) values ($1, $2) on conflict do nothing',
              params: [transaction.id, inputData],
            });
            const predicate = this.getPredicate(inputData);
            if (predicate) {
              queries.push({
                statement:
                  'insert into indexer.predicates (address, bytecode) values ($1, $2) on conflict do nothing',
                params: [predicate.address, predicate.bytecode],
              });
            }
          }
        }
        if (transactionData.outputs) {
          for (const outputData of transactionData.outputs) {
            queries.push({
              statement:
                'insert into indexer.outputs (transaction_id, data) values ($1, $2) on conflict do nothing',
              params: [transaction.id, outputData],
            });
            if (
              (outputData.__typename === 'CoinOutput' ||
                outputData.__typename === 'ChangeOutput' ||
                outputData.__typename === 'VariableOutput') &&
              outputData.assetId &&
              outputData.to &&
              outputData.amount === '1'
            ) {
              queries.push({
                statement: `update indexer.assets_contracts set owner = $1 where asset_id = $2 and decimals = 0 and total_supply = '1'`,
                params: [outputData.to, outputData.assetId],
              });
            }
          }
          const contractIds = this.getContractIds(transactionData.outputs);
          for (const contractId of contractIds) {
            try {
              logger.debug('Consumer', `Fetching contract: ${contractId}`);
              const contract = (await client.sdk.contract({ id: contractId }))
                .data.contract;
              if (contract) {
                logger.debug(
                  'Consumer',
                  `Contract fetched successfully: ${contractId}`,
                );
                queries.push({
                  statement:
                    'insert into indexer.contracts (contract_hash, data) values ($1, $2) on conflict (contract_hash) do update set data = excluded.data',
                  params: [contract.id, contract],
                });
              } else {
                logger.error('Consumer', `Contract not found: ${contractId}`);
              }
            } catch (e: any) {
              logger.error(
                'Consumer',
                `Error fetching contract ${contractId}: ${e.message}`,
              );
              // Continue processing other contracts even if one fails
            }
          }
        }
      }
      logger.debug('Consumer', `Persisting block: ${block.id}`);
      await connection.executeTransaction(queries);
      logger.debug('Consumer', `Persisted block: ${block.id}`);
    }
    const end = performance.now();
    const secs = Number.parseInt(`${(end - start) / 1000}`);
    logger.debug('Consumer', `Synced blocks: #${from} - #${to} (${secs}s)`);
  }

  async getBlocks(from: number, to: number): Promise<GQLBlock[]> {
    let size = Math.max(to - from, 1);
    size = from === 0 ? size + 1 : size;
    const after = Math.max(to - size, 0);
    const first = size;
    const params = {
      first: first < 0 ? -first : first,
      ...(after ? { after: String(after) } : null),
    };
    logger.debug('Consumer', `Fetching blocks: #${from} - #${to}`);
    const { data } = await client.sdk.blocks(params);
    // checking transactions integrity
    for (const block of data.blocks.nodes) {
      for (const transaction of block.transactions) {
        // Hydrate block on tx so transaction on database keeps blocks in the database
        if (!transaction.status) {
          logger.warn(
            'Consumer',
            `Transaction without status: ${transaction.id} in block #${block.header.height}`,
          );
        } else if (
          ['FailureStatus', 'SuccessStatus'].includes(
            transaction.status.__typename,
          )
        ) {
          (transaction.status as any).block = {
            ...block,
            transactions: [],
            transactionIds: [],
          };
        }
      }
      // Hydrate block on transaction so transaction on database keeps blocks in the database
      (block as any).transactionIds = block.transactions.map(
        (transaction) => transaction.id,
      );
    }
    logger.debug('Consumer', `Blocks fetched: #${from} - #${to}`);
    return data.blocks.nodes as GQLBlock[];
  }

  getContractIds(outputs: GQLOutput[]) {
    return (
      outputs.filter(
        (output: GQLOutput) =>
          output.__typename === 'ContractCreated' && output.contract,
      ) as GQLContractCreated[]
    ).map((i) => i.contract);
  }

  getPredicate(input: GQLInput) {
    if (!['InputCoin', 'InputMessage'].includes(input.__typename)) return;
    const bytecode = (input as GQLInputCoin | GQLInputMessage).predicate;
    if (bytecode === '0x') return;
    let address = '';
    if (input.__typename === 'InputCoin') address = input.owner;
    if (input.__typename === 'InputMessage') address = input.sender;
    return { bytecode, address };
  }

  getAccounts(transaction: GQLTransaction) {
    const accounts = [];
    if (transaction.inputs) {
      for (const input of transaction.inputs) {
        if (input.__typename === 'InputCoin') {
          accounts.push(input.owner);
        }
        if (input.__typename === 'InputMessage') {
          accounts.push(input.recipient);
          accounts.push(input.sender);
        }
        if (input.__typename === 'InputContract') {
          accounts.push(input.contractId);
        }
      }
    }
    if (transaction.outputs) {
      for (const output of transaction.outputs) {
        if (output.__typename === 'ChangeOutput') {
          accounts.push(output.to);
        }
        if (output.__typename === 'CoinOutput') {
          accounts.push(output.to);
        }
        if (output.__typename === 'ContractCreated') {
          accounts.push(output.contract);
        }
        if (output.__typename === 'VariableOutput') {
          accounts.push(output.to);
        }
      }
    }
    return accounts;
  }
}

type Input = {
  from: number;
  to: number;
};
