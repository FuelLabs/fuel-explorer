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

export default class NewAddBlockRange {
  private accountDAO = new AccountDAO();
  async execute(input: Input) {
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
      const blockTransactionTime = block.timestamp;
      queries.push({
        statement:
          'insert into indexer.blocks (_id, id, timestamp, data, gas_used, producer) values ($1, $2, $3, $4, $5, $6) on conflict do nothing',
        params: [
          block.id,
          block.blockHash,
          block.timestamp,
          block.data,
          block.totalGasUsed,
          block.producer,
        ],
      });
      for (const [index, transactionData] of blockData.transactions.entries()) {
        const transaction = new Transaction(transactionData, index, block.id);
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
          }
          const contractIds = this.getContractIds(transactionData.outputs);
          for (const contractId of contractIds) {
            const contract = (await client.sdk.contract({ id: contractId }))
              .data.contract;
            if (contract) {
              queries.push({
                statement:
                  'insert into indexer.contracts (contract_hash, data) values ($1, $2) on conflict do nothing',
                params: [contract.id, contract],
              });
            }
          }
        }
      }
      // New code starts here: Fetch and save account data
      const owners = this.extractUniqueOwners(blockData.transactions);
      for (const owner of owners) {
        // Fetch existing account if present
        const existingAccount = await this.accountDAO.getAccountById(owner);
        const transactionCountIncrement = blockData.transactions.filter((tx) =>
          tx.inputs?.some(
            (input) =>
              input.__typename === 'InputCoin' && input.owner === owner,
          ),
        ).length;

        let newData: any;
        let newBalance: bigint;

        if (existingAccount) {
          // Increment transaction count by the number of transactions found in the current range
          await this.accountDAO.incrementTransactionCount(
            owner,
            blockTransactionTime,
            transactionCountIncrement,
          );

          newData = await this.fetchAccountDataFromGraphQL(owner);
          newBalance = await this.fetchBalance(owner);

          await this.accountDAO.updateAccountBalance(owner, newBalance);
          await this.accountDAO.updateAccountData(
            owner,
            newData,
            blockTransactionTime,
          );
        } else {
          newBalance = await this.fetchBalance(owner);
          newData = await this.fetchAccountDataFromGraphQL(owner);

          const newAccount = AccountEntity.create({
            account_id: owner,
            balance: newBalance,
            transactionCount: transactionCountIncrement,
            data: newData,
            first_transaction_timestamp: blockTransactionTime,
          });
          await this.accountDAO.save(newAccount, blockTransactionTime);
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

  private async fetchBalance(owner: string): Promise<bigint> {
    const response = await client.sdk.balance({
      owner,
      assetId:
        '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
    });
    return BigInt(response.data.balance.amount);
  }

  // New method to extract unique owners
  extractUniqueOwners(transactions: GQLTransaction[]): string[] {
    const owners = new Set<string>();
    for (const tx of transactions) {
      if (tx.inputs) {
        for (const input of tx.inputs) {
          if (input.__typename === 'InputCoin' && input.owner) {
            owners.add(input.owner);
          }
        }
      }
    }
    return Array.from(owners);
  }

  // New method to fetch account data from GraphQL
  async fetchAccountDataFromGraphQL(owner: string): Promise<any[]> {
    const allBalances: any[] = [];
    let hasNextPage = true;
    let after: string | null = null;

    while (hasNextPage) {
      const response = await client.sdk.balances({
        filter: { owner },
        first: 1000, // Fetch 1000 records at a time
        after, // Use the 'after' cursor for pagination
      });

      if (response.data?.balances?.nodes) {
        // Map the nodes to the desired structure and append to allBalances
        const nodes = response.data.balances.nodes.map((node: any) => ({
          amount: BigInt(node.amount),
          assetId: node.assetId,
        }));
        allBalances.push(...nodes);
      }

      // Check if there is a next page and update the 'after' cursor
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
