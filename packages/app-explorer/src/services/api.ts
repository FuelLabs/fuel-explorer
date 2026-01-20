import { Address, OperationName, bn } from 'fuels';
import { z } from 'zod';
import { createTransactionSummary } from '~/systems/Transaction/utils/txSummary';
import { isValidAddress } from '../systems/Core/utils/address';
import { sdk } from './graphqlClient';

// Validation schemas
const searchSchema = z.object({
  query: z.string().min(1, 'Search query cannot be empty'),
});

const balancesSchema = z.object({
  owner: z.string().nullable(),
});

const predicateSchema = z.object({
  owner: z.string().nullable(),
});

const accountTransactionsSchema = z.object({
  owner: z.string().nullable(),
  cursor: z.string().optional().nullable(),
  dir: z.enum(['after', 'before']).optional(),
});

const recentTransactionsSchema = z.object({
  cursor: z.string().nullable(),
  dir: z.enum(['after', 'before']).optional(),
  last: z.number().optional(),
});

const transactionsByBlockIdSchema = z.object({
  id: z.string(),
  cursor: z.string().nullable(),
  dir: z.enum(['after', 'before']).optional(),
});

// Helper function for address validation
function parseAddressParam(id?: string | null) {
  const isValid = isValidAddress(id);
  if (!id || !isValid) {
    throw new Error('Invalid address');
  }
  const address = Address.fromString(id).toB256();
  return address;
}

// API service class replicating Next.js server actions
export class ApiService {
  // Replicate getBlock server action
  static async fetchBlock(id: string): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = z.object({ id: z.string().nullable() }).safeParse({ id });
      if (!result.success) {
        throw new Error('Invalid block input');
      }

      const input = result.data;
      const blockId = input.id;
      const isAddressValid = isValidAddress(blockId);
      const isValidBlockHeight = !Number.isNaN(Number(blockId));

      if (!isValidBlockHeight && !isAddressValid) {
        throw new Error('Invalid block number or block id');
      }

      const params = isAddressValid ? { id: blockId } : { height: blockId };
      const { data } = await sdk.block(params);

      return { block: data.block, producer: data.block?.producer };
    } catch (error) {
      console.error('Error fetching block:', error);
      throw error;
    }
  }

  // Replicate getTx server action
  static async fetchTransaction(id: string): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = z.object({ id: z.string().nullable() }).safeParse({ id });
      if (!result.success) {
        throw new Error('Invalid transaction input');
      }

      const input = result.data;
      const transactionId = parseAddressParam(input.id);
      const { data } = await sdk.transactionDetails({ id: transactionId });

      if (!data.transaction) {
        return null;
      }

      // Compute summary (transfers only) to enable Simple mode parity with Next.js
      try {
        const operations = (
          await createTransactionSummary({ transaction: data.transaction })
        ).filter((op) => op.name === OperationName.transfer);

        return {
          ...data.transaction,
          summary: operations || [],
        };
      } catch (_) {
        // If summary fails, return raw transaction; Simple will be disabled
        return data.transaction;
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  // Replicate search - searches for blocks, contracts, transactions, and accounts (if they have transactions)
  static async search(query: string): Promise<any> {
    try {
      const result = searchSchema.safeParse({ query });
      if (!result.success) {
        throw new Error('Invalid search input');
      }

      const input = result.data;

      const response = await sdk.search({ query: input.query }).catch((err) => {
        console.error('Error in search:', err);
        return { data: null };
      });

      const searchResult = response?.data?.search ?? null;
      return searchResult;
    } catch (error) {
      console.error('Error in search:', error);
      throw error;
    }
  }

  // Replicate getLastTxs server action
  static async fetchTransactions(params?: {
    cursor?: string;
    direction?: 'forward' | 'backward';
    limit?: number;
  }): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = recentTransactionsSchema.safeParse({
        cursor: params?.cursor || null,
        dir: params?.direction === 'backward' ? 'before' : 'after',
        last: params?.limit || 10,
      });
      if (!result.success) {
        throw new Error('Invalid transactions input');
      }

      const input = result.data;
      const { cursor, dir = 'after', last = 10 } = input;

      const queryParams = { last } as {
        first?: number;
        last?: number;
        before?: string;
        after?: string;
      };

      if (cursor && dir === 'after') {
        queryParams.after = cursor;
      }
      if (cursor && dir === 'before') {
        queryParams.before = cursor;
      }

      const { data } = await sdk.recentTransactions(queryParams);
      return data.transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Replicate getTransactionsByBlockId server action
  static async getTransactionsByBlockId(
    id: string,
    params?: { cursor?: string; direction?: 'forward' | 'backward' },
  ): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = transactionsByBlockIdSchema.safeParse({
        id,
        cursor: params?.cursor || null,
        dir: params?.direction === 'backward' ? 'before' : 'after',
      });
      if (!result.success) {
        throw new Error('Invalid transaction input');
      }

      const input = result.data;
      const blockId = input.id;
      const { cursor, dir = 'after' } = input;

      const queryParams = { last: 10 } as {
        first?: number;
        last?: number;
        before?: string;
        after?: string;
      };

      if (cursor && dir === 'after') {
        queryParams.after = cursor;
      }
      if (cursor && dir === 'before') {
        queryParams.before = cursor;
      }

      const isValidBlockHeight = !Number.isNaN(Number(blockId));
      if (!blockId || (!isValidBlockHeight && !isValidAddress(blockId))) {
        throw new Error('Invalid block number or block id');
      }

      const { data } = await sdk.transactionsByBlockId({
        blockId,
        ...queryParams,
      });

      return data;
    } catch (error) {
      console.error('Error fetching block transactions:', error);
      throw error;
    }
  }

  // Replicate getAccountTransactions server action
  static async getAccountTransactions(
    owner: string,
    params?: { cursor?: string; direction?: 'after' | 'before' },
  ): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = accountTransactionsSchema.safeParse({
        owner,
        cursor: params?.cursor || null,
        dir: params?.direction || 'after',
      });
      if (!result.success) {
        throw new Error('Invalid account transactions input');
      }

      const input = result.data;
      const { cursor, dir = 'after' } = input;
      const PER_PAGE = 10;

      const queryParams = { last: PER_PAGE } as {
        first?: number;
        last?: number;
        before?: string;
        after?: string;
      };

      if (cursor && dir === 'after') {
        queryParams.after = cursor;
      }
      if (cursor && dir === 'before') {
        queryParams.before = cursor;
      }

      const accountOwner = parseAddressParam(input.owner);
      const { data } = await sdk.transactionsByOwner({
        owner: accountOwner,
        ownerType: 'ACCOUNT',
        ...queryParams,
      });

      return data.transactionsByOwner;
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      throw error;
    }
  }

  // Replicate getBalances server action
  static async getAccountBalances(owner: string): Promise<any[]> {
    try {
      // Validate input using the same schema as Next.js
      const result = balancesSchema.safeParse({ owner });
      if (!result.success) {
        throw new Error('Invalid account balances input');
      }

      const input = result.data;
      const accountOwner = parseAddressParam(input.owner);
      const { data } = await sdk.balances({
        first: 100,
        filter: { owner: accountOwner },
      });

      // Process balances like the original
      for (const balance of data.balances.nodes) {
        if (balance.metadata) {
          balance.metadata = JSON.parse(balance.metadata);
        }
      }

      const sortedBalances = data.balances.nodes.sort((a, b) => {
        // first every asset with icon (verifieds)
        if (a.icon && !b.icon) return -1;
        if (!a.icon && b.icon) return 1;
        if (a.icon && b.icon) {
          // then between the ones that have icon, ETH will be first
          if (a.symbol === 'ETH' && b.symbol !== 'ETH') return -1;
          if (a.symbol !== 'ETH' && b.symbol === 'ETH') return 1;
        }
        // then order by those who have symbol first
        if (a.symbol && !b.symbol) return -1;
        if (!a.symbol && b.symbol) return 1;
        return (a.symbol || '').localeCompare(b.symbol || '');
      });

      return sortedBalances.filter((balance) => !bn(balance.amount).isZero());
    } catch (error) {
      console.error('Error fetching account balances:', error);
      throw error;
    }
  }

  // Replicate getPredicate server action
  static async getAccountPredicate(owner: string): Promise<any> {
    try {
      // Validate input using the same schema as Next.js
      const result = predicateSchema.safeParse({ owner });
      if (!result.success) {
        throw new Error('Invalid predicate input');
      }

      const input = result.data;
      const accountOwner = parseAddressParam(input.owner);
      const { data } = await sdk.predicate({ address: accountOwner });

      return data.predicate || null;
    } catch (error) {
      console.error('Error fetching account predicate:', error);
      throw error;
    }
  }

  // Contract methods
  static async getContractBalances(contractId: string): Promise<any[]> {
    try {
      const contract = parseAddressParam(contractId);
      const { data } = await sdk.contractBalances({ filter: { contract } });
      return data.contractBalances.edges || [];
    } catch (error) {
      console.error('Error fetching contract balances:', error);
      throw error;
    }
  }

  static async getContract(contractId: string): Promise<any> {
    try {
      const contract = parseAddressParam(contractId);
      const { data } = await sdk.contract({ id: contract });
      return data.contract;
    } catch (error) {
      console.error('Error fetching contract:', error);
      throw error;
    }
  }

  static async getContractMintedAssets(
    contractId: string,
    params?: { cursor?: string; direction?: 'after' | 'before' },
  ): Promise<any> {
    try {
      const { cursor, direction = 'after' } = params || {};
      const contractIdParam = parseAddressParam(contractId);

      const queryParams: any = { contractId: contractIdParam };
      if (cursor && direction === 'after') {
        queryParams.after = cursor;
      }
      if (cursor && direction === 'before') {
        queryParams.before = cursor;
      }

      const { data } = await sdk.assetsByContract(queryParams);
      return data.assetsByContract;
    } catch (error) {
      console.error('Error fetching contract minted assets:', error);
      throw error;
    }
  }

  static async getContractTransactions(
    contractId: string,
    params?: { cursor?: string; direction?: 'after' | 'before' },
  ): Promise<any> {
    try {
      const { cursor, direction = 'after' } = params || {};
      const contractIdParam = parseAddressParam(contractId);

      const queryParams: any = {
        owner: contractIdParam,
        ownerType: 'CONTRACT',
        first: 10,
      };
      if (cursor && direction === 'after') {
        queryParams.after = cursor;
      }
      if (cursor && direction === 'before') {
        queryParams.before = cursor;
      }

      const { data } = await sdk.transactionsByOwner(queryParams);
      return data.transactionsByOwner;
    } catch (error) {
      console.error('Error fetching contract transactions:', error);
      throw error;
    }
  }

  // Replicate getAsset server action
  static async fetchAccountAssets(_accountId: string): Promise<any[]> {
    try {
      // This would need to be implemented based on the asset query
      // For now, return empty array as it's not clear how this maps to the GraphQL schema
      return [];
    } catch (error) {
      console.error('Error fetching account assets:', error);
      throw error;
    }
  }

  // Legacy method - this is now handled by getAccountTransactions
  static async fetchAccountTransactions(
    accountId: string,
    params?: { cursor?: string; direction?: string },
  ): Promise<any> {
    try {
      // Use the new getAccountTransactions method
      return await ApiService.getAccountTransactions(accountId, {
        cursor: params?.cursor,
        direction: params?.direction === 'backward' ? 'before' : 'after',
      });
    } catch (error) {
      console.error('Error fetching account transactions:', error);
      throw error;
    }
  }

  // Legacy method - not needed as we have specific methods
  static async fetchAccount(_id: string): Promise<any | null> {
    try {
      // Account fetching is not a single operation in Next.js
      // It's composed of balances, predicate, and transactions
      // Return null for now as this method is not used in the current implementation
      return null;
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  }

  // Legacy method - not needed as we have specific GraphQL methods
  static async graphqlQuery<T>(
    _query: string,
    _variables?: Record<string, any>,
  ): Promise<T> {
    try {
      // This method is not used in the Next.js implementation
      // All queries go through the SDK
      throw new Error('Direct GraphQL queries not supported - use SDK methods');
    } catch (error) {
      console.error('GraphQL query error:', error);
      throw error;
    }
  }
}

// Query keys for TanStack Query
export const queryKeys = {
  transaction: (id: string) => ['transaction', id] as const,
  block: (id: string) => ['block', id] as const,
  account: (id: string) => ['account', id] as const,
  transactions: (params?: any) => ['transactions', params] as const,
  accountAssets: (accountId: string) =>
    ['account', accountId, 'assets'] as const,
  accountTransactions: (accountId: string, params?: any) =>
    ['account', accountId, 'transactions', params] as const,
  blockTransactions: (blockId: string, params?: any) =>
    ['block', blockId, 'transactions', params] as const,
  accountBalances: (accountId: string) =>
    ['account', accountId, 'balances'] as const,
  accountPredicate: (accountId: string) =>
    ['account', accountId, 'predicate'] as const,
  accounts: {
    all: ['accounts'] as const,
    details: () => [...queryKeys.accounts.all, 'detail'] as const,
    detail: (address: string) =>
      [...queryKeys.accounts.details(), address] as const,
    transactions: (address: string, params?: any) =>
      [...queryKeys.accounts.detail(address), 'transactions', params] as const,
    balances: (address: string) =>
      [...queryKeys.accounts.detail(address), 'balances'] as const,
  },
  contracts: {
    all: ['contracts'] as const,
    details: () => [...queryKeys.contracts.all, 'detail'] as const,
    detail: (contractId: string) =>
      [...queryKeys.contracts.details(), contractId] as const,
    transactions: (contractId: string, params?: any) =>
      [
        ...queryKeys.contracts.detail(contractId),
        'transactions',
        params,
      ] as const,
    balances: (contractId: string) =>
      [...queryKeys.contracts.detail(contractId), 'balances'] as const,
  },
};
