// TypeScript interfaces
export interface Transaction {
  id: string;
  time?: string;
  status: {
    __typename: string;
  };
  gasUsed?: string;
  fee?: string;
}

export interface Block {
  id: string;
  height: string;
  time?: string;
  transactionCount?: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface TransactionConnection {
  pageInfo: PageInfo;
  nodes: Transaction[];
}

export interface Asset {
  assetId: string;
  name?: string;
  symbol?: string;
  decimals: number;
  contractId?: string;
}

export interface Balance {
  amount: string;
  assetId: string;
  asset?: Asset;
}

export interface EcosystemProject {
  id: string;
  name: string;
  description?: string;
  category?: string;
  url?: string;
  logoUrl?: string;
}

export class ApiService {
  private baseUrl: string;
  private graphqlUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    this.graphqlUrl = `${this.baseUrl}/graphql`;
  }

  // Search functionality
  async search(query: string) {
    const graphqlQuery = `
      query Search($query: String!) {
        search(query: $query) {
          ... on Transaction {
            id
            status {
              __typename
            }
          }
          ... on Block {
            id
            height
          }
          ... on Account {
            address
          }
          ... on Contract {
            id
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { query },
      }),
    });

    const { data } = await response.json();
    return data?.search ?? null;
  }

  // Transaction methods
  async getTransaction(txId: string) {
    const graphqlQuery = `
      query TransactionDetails($id: String!) {
        transaction(id: $id) {
          id
          time
          status {
            __typename
            ... on SuccessStatus {
              time
              receipts {
                receiptType
              }
            }
            ... on FailureStatus {
              time
              reason
            }
          }
          gasUsed
          fee
          inputs {
            __typename
          }
          outputs {
            __typename
          }
          operations {
            name
            from {
              address
            }
            to {
              address
            }
            assetsSent {
              amount
              assetId
              asset {
                name
                symbol
                decimals
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: { id: txId },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data?.transaction;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  async getTransactions(first = 10, after?: string) {
    const graphqlQuery = `
      query Transactions($first: Int!, $after: String) {
        transactions(first: $first, after: $after, orderBy: TIME_DESC) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursorpnpm
          }
          nodes {
            id
            time
            status {
              __typename
            }
            gasUsed
            fee
          }
        }
      }
    `;

    try {
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: { first, after },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return (
        result.data?.transactions || {
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: '',
            endCursor: '',
          },
          nodes: [],
        }
      );
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Block methods
  async getBlock(blockId: string) {
    const graphqlQuery = `
      query Block($id: String, $height: String) {
        block(id: $id, height: $height) {
          id
          height
          producer
          consensus {
            __typename
            ... on PoAConsensus {
              signature
            }
          }
          header {
            transactionsCount
          }
          time {
            full
            fromNow
            rawUnix
          }
        }
      }
    `;

    // Determine if blockId is a height (number) or block hash
    const isBlockHeight = !Number.isNaN(Number(blockId));
    const variables = isBlockHeight ? { height: blockId } : { id: blockId };

    try {
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphqlQuery,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data?.block;
    } catch (error) {
      console.error('Error fetching block:', error);
      throw error;
    }
  }

  async getBlocks(first = 10, after?: string) {
    const graphqlQuery = `
      query Blocks($first: Int!, $after: String) {
        blocks(first: $first, after: $after, orderBy: HEIGHT_DESC) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            height
            time
            transactionCount
            producer {
              address
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(this.graphqlUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: graphqlQuery,
          variables: { first, after },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return (
        result.data?.blocks || {
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: '',
            endCursor: '',
          },
          nodes: [],
        }
      );
    } catch (error) {
      console.error('Error fetching blocks:', error);
      throw error;
    }
  }

  async getTransactionsByBlockId(blockId: string, first = 10, after?: string) {
    const graphqlQuery = `
      query TransactionsByBlockId($blockId: String!, $first: Int!, $after: String) {
        transactions(filter: { blockId: $blockId }, first: $first, after: $after) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            time
            status {
              __typename
            }
            gasUsed
            fee
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { blockId, first, after },
      }),
    });

    const { data } = await response.json();
    return data?.transactions;
  }

  // Asset information
  async getAsset(assetId: string) {
    const graphqlQuery = `
      query Asset($assetId: String!) {
        asset(assetId: $assetId) {
          assetId
          name
          symbol
          decimals
          contractId
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { assetId },
      }),
    });

    const { data } = await response.json();
    return data?.asset;
  }

  // Statistics
  async getStatistics() {
    const graphqlQuery = `
      query Statistics {
        statistics {
          nodes {
            totalTransactions
            totalContracts
            totalAccounts
            totalGasUsed
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
      }),
    });

    const { data } = await response.json();
    return data?.statistics?.nodes;
  }

  // Transactions per second
  async getTPS() {
    const graphqlQuery = `
      query TPS {
        tps {
          current
          average
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
      }),
    });

    const { data } = await response.json();
    return data;
  }

  // Dashboard blocks
  async getBlocksDashboard() {
    const graphqlQuery = `
      query BlocksDashboard {
        blocks(first: 5, orderBy: HEIGHT_DESC) {
          nodes {
            id
            height
            time
            transactionCount
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
      }),
    });

    const { data } = await response.json();
    return data?.blocks?.nodes;
  }

  // Account balances
  async getAccountBalances(address: string) {
    const graphqlQuery = `
      query AccountBalances($address: String!) {
        balances(filter: { owner: $address }, first: 100) {
          nodes {
            amount
            assetId
            asset {
              name
              symbol
              decimals
              contractId
            }
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { address },
      }),
    });

    const { data } = await response.json();
    return data?.balances?.nodes || [];
  }

  async getContractBalances(contractId: string) {
    const graphqlQuery = `
      query ContractBalances($contractId: String!) {
        contractBalances(filter: { contract: $contractId }, first: 100) {
          edges {
            cursor
            node {
              amount
              assetId
              name
              symbol
              decimals
              icon
              suspicious
              amountInUsd
            }
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { contractId },
      }),
    });

    const { data } = await response.json();
    return data?.contractBalances?.edges || [];
  }

  async getContractMintedAssets(
    contractId: string,
    params?: { cursor?: string; direction?: 'after' | 'before' },
  ) {
    const { cursor, direction = 'after' } = params || {};
    const graphqlQuery = `
      query ContractMintedAssets($contractId: String!, $cursor: String, $direction: String!) {
        assetsByContract(contractId: $contractId, first: 10, ${direction}: $cursor) {
          edges {
            cursor
            node {
              id
              name
              symbol
              decimals
              totalSupply
              contractId
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { contractId, cursor, direction },
      }),
    });

    const { data } = await response.json();
    return data?.assetsByContract || { edges: [], pageInfo: {} };
  }

  // Account transactions
  async getAccountTransactions(address: string, first = 10, after?: string) {
    const graphqlQuery = `
      query AccountTransactions($address: String!, $first: Int!, $after: String, $ownerType: String) {
        transactionsByOwner(owner: $address, first: $first, after: $after, ownerType: $ownerType) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            time
            status {
              __typename
            }
            gasUsed
            fee
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { address, first, after, ownerType: 'account' },
      }),
    });

    const { data } = await response.json();
    return data?.transactionsByOwner;
  }

  // Contract information
  async getContract(contractId: string) {
    const graphqlQuery = `
      query Contract($contractId: String!) {
        contract(id: $contractId) {
          id
          bytecode
          salt
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { contractId },
      }),
    });

    const { data } = await response.json();
    return data?.contract;
  }

  // Contract transactions
  async getContractTransactions(
    contractId: string,
    first = 10,
    after?: string,
  ) {
    const graphqlQuery = `
      query ContractTransactions($contractId: String!, $first: Int!, $after: String, $ownerType: String) {
        transactionsByOwner(owner: $contractId, first: $first, after: $after, ownerType: $ownerType) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          nodes {
            id
            time
            status {
              __typename
            }
            gasUsed
            fee
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { contractId, first, after, ownerType: 'contract' },
      }),
    });

    const { data } = await response.json();
    return data?.transactionsByOwner;
  }

  // Predicate information
  async getPredicate(address: string) {
    const graphqlQuery = `
      query Predicate($address: String!) {
        predicate(address: $address) {
          address
          bytecode
          name
          description
          abi
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { address },
      }),
    });

    const { data } = await response.json();
    return data?.predicate;
  }

  async getPredicateMetadata(bytecode: string | null) {
    if (!bytecode) {
      return null;
    }

    // This would typically fetch from an ecosystem API
    // For now, return null as predicate metadata is not implemented
    return null;
  }

  // Check transaction status
  async checkTxStatus(txId: string) {
    const graphqlQuery = `
      query CheckTxStatus($txId: String!) {
        transaction(id: $txId) {
          id
          status {
            __typename
          }
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { txId },
      }),
    });

    const { data } = await response.json();
    return data?.transaction;
  }

  // NFT fetching
  async fetchNFT(assetId: string, tokenId: string) {
    const graphqlQuery = `
      query FetchNFT($assetId: String!, $tokenId: String!) {
        nft(assetId: $assetId, tokenId: $tokenId) {
          assetId
          tokenId
          name
          description
          image
          attributes
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { assetId, tokenId },
      }),
    });

    const { data } = await response.json();
    return data?.nft;
  }

  // Ecosystem projects
  async fetchProjects(): Promise<EcosystemProject[]> {
    // Use the ecosystem service for real data
    const { fetchProjects } = await import('./ecosystemService');
    const result = await fetchProjects({});
    return result.initialProjects.map((project) => ({
      id: project.name.toLowerCase().replace(/\s+/g, '-'),
      name: project.name,
      description: project.description,
      category: project.tags?.[0] || 'Other',
      url: project.url,
      logoUrl: project.image,
    }));
  }

  // Exchange information
  async fetchExchangeInfo() {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=fuel&vs_currencies=usd',
      );

      if (!response.ok) {
        throw new Error('Failed to fetch exchange info');
      }

      const data = await response.json();
      const fuelPrice = data.fuel?.usd;

      if (!fuelPrice) {
        throw new Error('Fuel price not available');
      }

      return {
        price: `$${fuelPrice.toFixed(4)}`,
        marketCap: 'N/A', // CoinGecko simple price doesn't include market cap
        volume24h: 'N/A', // CoinGecko simple price doesn't include volume
        change24h: 'N/A', // CoinGecko simple price doesn't include change
      };
    } catch (error) {
      console.error('Failed to fetch exchange info:', error);
      throw new Error('Failed to fetch exchange info');
    }
  }

  // Contract metadata
  async fetchContractMetadata(contractId: string) {
    const graphqlQuery = `
      query ContractMetadata($contractId: String!) {
        contract(id: $contractId) {
          id
          bytecode
          salt
          name
          description 
          abi
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { contractId },
      }),
    });

    const { data } = await response.json();
    return data?.contract;
  }

  // Predicate metadata
  async fetchPredicateMetadata(address: string) {
    const graphqlQuery = `
      query PredicateMetadata($address: String!) {
        predicate(address: $address) {
          address
          bytecode
          name
          description
          abi
        }
      }
    `;

    const response = await fetch(this.graphqlUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: { address },
      }),
    });

    const { data } = await response.json();
    return data?.predicate;
  }

  // Check if transaction exists
  async txExists(txId: string): Promise<boolean> {
    try {
      const tx = await this.checkTxStatus(txId);
      return !!tx;
    } catch {
      return false;
    }
  }
}
