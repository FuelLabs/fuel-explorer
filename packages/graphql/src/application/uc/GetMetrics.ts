import { client } from '~/graphql/GraphQLSDK';
import BlockDAO from '~/infra/dao/BlockDAO';

export default class GetMetrics {
  async getFuelCoreLastBlockHeight() {
    const { data } = await client.sdk.blocks({ last: 1 });
    const blocks = data.blocks;
    const [lastBlock] = blocks.nodes;
    const height = Number(lastBlock?.header.height ?? '0');
    return height;
  }

  async getIndexerLastBlockHeight() {
    const blockDAO = new BlockDAO();
    const latestBlock = await blockDAO.findLatestBlockAdded();
    const blockId = latestBlock ? latestBlock.id : 0;
    return blockId;
  }

  async execute(): Promise<any> {
    const fuelCoreLastBlockHeight = await this.getFuelCoreLastBlockHeight();
    const indexerLastBlockHeight = await this.getIndexerLastBlockHeight();
    const indexerBlockHeightDelay =
      fuelCoreLastBlockHeight - indexerLastBlockHeight;
    const indexerHealth = indexerBlockHeightDelay < 100 ? 1 : 0;
    return {
      explorer_indexer_fuel_core_last_block_height: fuelCoreLastBlockHeight,
      explorer_indexer_last_block_height_synced: indexerLastBlockHeight,
      explorer_indexer_block_height_sync_delay: indexerBlockHeightDelay,
      explorer_indexer_health: indexerHealth,
    };
  }
}
