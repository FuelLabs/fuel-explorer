import { logger } from '~/core/Logger';
import { client } from '~/graphql/GraphQLSDK';
import {
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
import { AccountEntity } from '../../domain/Account/AccountEntity';
import AccountDAO from '../../infra/dao/AccountDAO';
import IndexAsset from './IndexAsset';

export default class NewAddBlockRange {
  private accountDAO = new AccountDAO();

  async execute(input: Input) {
    const indexAsset = new IndexAsset();
    const uniqueAccountOwners = new Set<string>();
    const { from, to } = input;
    logger.info(`🔗 Syncing blocks: #${from} - #${to}`);

    const blocksData = await this.getBlocks(from, to);
    if (blocksData.length === 0) {
      logger.info(`🔗 No blocks to sync: #${from} - #${to}`);
      return;
    }

    const start = performance.now();
    const connection = DatabaseConnection.getInstance();

    for (const blockData of blocksData) {
      const queries: { statement: string; params: any }[] = [];
      const block = new Block({ data: blockData });

      // Add block data to queries
      queries.push({
        statement:
          'INSERT INTO indexer.blocks (_id, id, timestamp, data, gas_used, producer) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
        params: [
          block.id,
          block.blockHash,
          block.timestamp,
          block.data,
          block.totalGasUsed,
          block.producer,
        ],
      });

      // Process each transaction within the block
      for (const [index, transactionData] of blockData.transactions.entries()) {
        const transaction = new Transaction(transactionData, index, block.id);

        queries.push({
          statement:
            'INSERT INTO indexer.transactions (_id, tx_hash, timestamp, data, block_id) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING',
          params: [
            transaction.id,
            transaction.transactionHash,
            transaction.timestamp,
            transaction.data,
            transaction.blockId,
          ],
        });

        // Process transaction accounts
        const accounts = this.getAccounts(transactionData);
        for (const accountHash of accounts) {
          queries.push({
            statement:
              'INSERT INTO indexer.transactions_accounts (_id, block_id, tx_hash, account_hash) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
            params: [
              transaction.id,
              transaction.blockId,
              transaction.transactionHash,
              accountHash,
            ],
          });
          uniqueAccountOwners.add(accountHash);
        }

        // Handle assets in transaction receipts
        if (transaction.data?.status?.receipts) {
          try {
            await indexAsset.execute(transaction.data);
          } catch (e: any) {
            logger.error('Error fetching assets', e);
          }
        }

        // Insert inputs and predicates
        if (transactionData.inputs) {
          for (const inputData of transactionData.inputs) {
            queries.push({
              statement:
                'INSERT INTO indexer.inputs (transaction_id, data) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              params: [transaction.id, inputData],
            });

            const predicate = this.getPredicate(inputData);
            if (predicate) {
              queries.push({
                statement:
                  'INSERT INTO indexer.predicates (address, bytecode) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                params: [predicate.address, predicate.bytecode],
              });
            }
          }
        }

        // Insert outputs and contracts
        if (transactionData.outputs) {
          for (const outputData of transactionData.outputs) {
            queries.push({
              statement:
                'INSERT INTO indexer.outputs (transaction_id, data) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              params: [transaction.id, outputData],
            });
          }

          const contractIds = this.getContractIds(transactionData.outputs);
          for (const contractId of contractIds) {
            const contract = (await client.sdk.contract({ id: contractId }))
              .data.contract;
            if (contract) {
              queries.push({
                statement:
                  'INSERT INTO indexer.contracts (contract_hash, data) VALUES ($1, $2) ON CONFLICT DO NOTHING',
                params: [contract.id, contract],
              });
            }
          }
        }
      }

      // Process unique account owners for each block
      for (const owner of uniqueAccountOwners) {
        try {
          const existingAccount = await this.accountDAO.getAccountById(owner);
          const transactionCountIncrement = blockData.transactions.filter(
            (tx) =>
              tx.inputs?.some(
                (input) =>
                  input.__typename === 'InputCoin' && input.owner === owner,
              ),
          ).length;

          let newBalance: bigint;

          if (existingAccount) {
            // Update existing account
            queries.push({
              statement: `
                UPDATE indexer.accounts
                SET transaction_count = transaction_count + $1, recent_transaction_timestamp = $2
                WHERE account_id = $3
              `,
              params: [transactionCountIncrement, block.timestamp, owner],
            });

            newBalance = await this.fetchBalance(owner);

            queries.push({
              statement: `
                UPDATE indexer.accounts
                SET balance = $1
                WHERE account_id = $2
              `,
              params: [newBalance, owner],
            });
          } else {
            // Create a new account entry
            newBalance = await this.fetchBalance(owner);

            const newAccount = AccountEntity.create({
              account_id: owner,
              balance: newBalance,
              transactionCount: transactionCountIncrement,
              first_transaction_timestamp: block.timestamp,
            });

            queries.push({
              statement: `
                INSERT INTO indexer.accounts (account_id, balance, transaction_count, first_transaction_timestamp, recent_transaction_timestamp)
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT DO NOTHING
              `,
              params: [
                newAccount.account_id,
                newAccount.balance,
                newAccount.transactionCount,
                block.timestamp,
                block.timestamp,
              ],
            });
          }
        } catch (err) {
          console.error(`Error processing owner ${owner}:`, err);
        }
      }

      await connection.executeTransaction(queries);
    }

    const end = performance.now();
    const secs = Number.parseInt(`${(end - start) / 1000}`);
    logger.info(`✅ Synced blocks: #${from} - #${to} (${secs}s)`);
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
    const { data } = await client.sdk.blocks(params);
    logger.info(`🔗 Fetching blocks: #${from} - #${to}`);
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

  async fetchBalance(owner: string): Promise<bigint> {
    const response = await client.sdk.balance({
      owner,
      assetId:
        '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
    });
    return BigInt(response.data.balance.amount);
  }

  async fetchAccountDataFromGraphQL(owner: string): Promise<any[]> {
    const allBalances: any[] = [];
    let hasNextPage = true;
    let after: string | null = null;

    while (hasNextPage) {
      const response = await client.sdk.balances({
        filter: { owner },
        first: 1000,
        after,
      });

      if (response.data?.balances?.nodes) {
        const nodes = response.data.balances.nodes.map((node: any) => ({
          amount: BigInt(node.amount),
          assetId: node.assetId,
        }));
        allBalances.push(...nodes);
      }

      hasNextPage = response.data?.balances?.pageInfo?.hasNextPage || false;
      after = response.data?.balances?.pageInfo?.endCursor || null;
    }

    return allBalances;
  }
}

type Input = {
  from: number;
  to: number;
};
