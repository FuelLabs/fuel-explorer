import { DatabaseConnection } from '../database/DatabaseConnection';
import PaginatedParams from '../paginator/PaginatedParams';
import Contract from './Contract';

export default class ContractDAO {
  databaseConnection: DatabaseConnection;

  constructor() {
    this.databaseConnection = DatabaseConnection.getInstance();
  }

  async getByHash(hash: string) {
    const contractData = (
      await this.databaseConnection.query(
        `
		  select
			  c.*
		  from
			  indexer.contracts c
		  where
			  c.contract_hash = $1
		  `,
        [hash],
      )
    )[0];
    if (!contractData) return;
    const contract = new Contract(contractData);
    return contract;
  }

  async getPaginatedContracts(paginatedParams: PaginatedParams) {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const contractsData = await this.databaseConnection.query(
      `
		select 
			*
		from 
			indexer.contracts c
		where
			$1::integer is null or c._id ${direction} $1
		order by
			c._id ${order} 
		limit 10
	`,
      [paginatedParams.cursor],
    );
    contractsData.sort((a: any, b: any) => {
      return (a._id - b._id) * -1;
    });
    const contracts: Contract[] = [];
    for (const contractData of contractsData) {
      contracts.push(new Contract(contractData));
    }
    if (contracts.length === 0) {
      return {
        nodes: [],
        edges: [],
        pageInfo: {
          hasNextPage: false,
          hasPreviousPage: false,
          endCursor: '',
          startCursor: '',
        },
      };
    }
    const startCursor = contractsData[0]._id;
    const endCursor = contractsData[contractsData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.contracts where _id < $1)',
        [endCursor],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.contracts where _id > $1)',
        [startCursor],
      )
    )[0].exists;
    const newNodes = contracts.map((n) => n.toGQLNode());
    const edges = newNodes.map((node) => ({
      node,
      cursor: paginatedParams.cursor,
    }));
    const paginatedResults = {
      nodes: newNodes,
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };
    return paginatedResults;
  }
}
