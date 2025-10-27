import { isB256 } from 'fuels';
import { DatabaseConnectionReplica } from '../database/DatabaseConnectionReplica';
import type PaginatedParams from '../paginator/PaginatedParams';

export default class AssetDAO {
  databaseConnection: DatabaseConnectionReplica;

  constructor() {
    this.databaseConnection = DatabaseConnectionReplica.getInstance();
  }

  async getAssetOwner(assetId: string) {
    if (!isB256(assetId)) return null;
    const [asset] = await this.databaseConnection.query(
      'select a.owner from indexer.assets_contracts a where a.asset_id = $1',
      [assetId],
    );
    if (!asset) return;
    return asset.owner;
  }

  async getByAssetId(assetId: string) {
    const assetData = (
      await this.databaseConnection.query(
        `
			select ac.*, c.name as collection from indexer.assets_contracts ac left join indexer.collections c using (contract_id) where ac.asset_id = $1
		  `,
        [assetId],
      )
    )[0];
    if (!assetData) return;
    return {
      assetId: assetData.asset_id,
      contractId: assetData.contract_id,
      subId: assetData.sub_id,
      name: assetData.name,
      symbol: assetData.symbol,
      decimals: assetData.decimals,
      totalSupply: assetData.total_supply,
      suspicious: false,
      metadata: assetData.metadata,
      collection: assetData.collection,
    };
  }

  async getPaginatedByContractId(
    contractId: string,
    paginatedParams: PaginatedParams,
  ) {
    const direction = paginatedParams.direction === 'before' ? '<' : '>';
    const order = paginatedParams.direction === 'before' ? 'desc' : 'asc';
    const assetsData = await this.databaseConnection.query(
      `
          select
            *
          from
            indexer.assets_contracts c
          where
			c.contract_id = $1 and
			($2::text is null or c._id ${direction} $2)
		order by
			c._id ${order}
		limit
			$3
  		`,
      [contractId.toLowerCase(), paginatedParams.cursor, paginatedParams.last],
    );
    assetsData.sort((a: any, b: any) => {
      return a._id.localeCompare(b._id) * -1;
    });
    if (assetsData.length === 0) {
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
    const startCursor = assetsData[0]._id;
    const endCursor = assetsData[assetsData.length - 1]._id;
    const hasPreviousPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.assets_contracts t where t._id < $1 and t.contract_id = $2)',
        [endCursor, contractId],
      )
    )[0].exists;
    const hasNextPage = (
      await this.databaseConnection.query(
        'select exists(select 1 from indexer.assets_contracts t where t._id > $1 and t.contract_id = $2)',
        [startCursor, contractId],
      )
    )[0].exists;
    const [previousRows] = await this.databaseConnection.query(
      'select count(*)::integer as count from indexer.assets_contracts where _id > $1 and contract_id = $2',
      [startCursor, contractId],
    );
    const [totalCount] = await this.databaseConnection.query(
      'select count(*)::integer as count from indexer.assets_contracts where contract_id = $1',
      [contractId],
    );
    const newNodes = assetsData.map((assetData) => ({
      _id: assetData._id,
      assetId: assetData.asset_id,
      contractId: assetData.contract_id,
      subId: assetData.sub_id,
      name: assetData.name,
      symbol: assetData.symbol,
      decimals: assetData.decimals,
      totalSupply: assetData.total_supply,
      suspicious: false,
      icon: '',
      networks: [],
      rate: null,
    }));
    const edges = newNodes.map((node) => ({
      node,
      cursor: paginatedParams.cursor,
    }));
    const paginatedResults = {
      nodes: newNodes,
      edges,
      pageInfo: {
        startCount: previousRows.count + 1,
        endCount: previousRows.count + paginatedParams.last,
        totalCount: totalCount.count,
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
    };

    return paginatedResults;
  }

  async getAssetsRate() {
    const data = await this.databaseConnection.query(
      'select symbol, rate from indexer.assets_rates where _id in (select max(_id) from indexer.assets_rates group by symbol)',
      [],
    );
    return data.map((assetRate) => ({
      symbol: assetRate.symbol,
      rate: Number(assetRate.rate),
    }));
  }

  async getAssetsRateByAssetId(assetId: string) {
    const [data] = await this.databaseConnection.query(
      'select symbol, rate from indexer.assets_rates where _id = (select max(_id) from indexer.assets_rates where asset_id = $1)',
      [assetId],
    );
    if (!data) return;
    return {
      symbol: data.symbol,
      rate: Number(data.rate),
    };
  }

  async getAssetsRateBySymbol(symbol: string) {
    const [data] = await this.databaseConnection.query(
      'select symbol, rate from indexer.assets_rates where _id = (select max(_id) from indexer.assets_rates where symbol = $1)',
      [symbol],
    );
    if (!data) return;
    return {
      symbol: data.symbol,
      rate: Number(data.rate),
    };
  }
}
