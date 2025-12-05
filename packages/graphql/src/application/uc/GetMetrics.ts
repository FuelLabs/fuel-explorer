import { setTimeout } from 'node:timers/promises';
import { logger } from '~/core/Logger';
import { client } from '~/graphql/GraphQLSDK';
import BlockDAO from '~/infra/dao/BlockDAO';

const FUEL_CORE_TIMEOUT_MS = 5000;

export default class GetMetrics {
  async getFuelCoreLastBlockHeight() {
    const startTime = Date.now();
    try {
      const { data } = await client.sdk.blocks({ last: 1 });
      const latencyMs = Date.now() - startTime;
      logger.debug('Metrics', `Fuel core response time: ${latencyMs}ms`);
      const blocks = data.blocks;
      const [lastBlock] = blocks.nodes;
      const height = Number(lastBlock?.header.height ?? '0');
      return height;
    } catch (e) {
      const latencyMs = Date.now() - startTime;
      logger.error('Metrics', `Fuel core request failed after ${latencyMs}ms`);
      throw e;
    }
  }

  async getIndexerLastBlockHeight() {
    const blockDAO = new BlockDAO();
    const latestBlock = await blockDAO.findLatestBlockAdded();
    const blockId = latestBlock ? latestBlock.id : 0;
    return blockId;
  }

  async execute(): Promise<any> {
    const indexerLastBlockHeight = await this.getIndexerLastBlockHeight();
    let fuelCoreLastBlockHeight = indexerLastBlockHeight;
    let fuelCoreHealth = 1;
    let fuelCoreLatencyMs = -1;
    const startTime = Date.now();
    try {
      const response = await Promise.race([
        this.getFuelCoreLastBlockHeight(),
        setTimeout(FUEL_CORE_TIMEOUT_MS),
      ]);
      fuelCoreLatencyMs = Date.now() - startTime;
      if (!response) {
        logger.warn(
          'Metrics',
          `Fuel core timeout after ${FUEL_CORE_TIMEOUT_MS}ms`,
        );
        fuelCoreHealth = 0;
      } else {
        fuelCoreLastBlockHeight = response;
      }
    } catch (e: any) {
      fuelCoreLatencyMs = Date.now() - startTime;
      fuelCoreHealth = 0;
      logger.error(
        'Metrics',
        `Fuel core error after ${fuelCoreLatencyMs}ms: ${e.message}`,
      );
    }
    const indexerBlockHeightDelay =
      fuelCoreLastBlockHeight - indexerLastBlockHeight;
    const indexerHealth = indexerBlockHeightDelay < 100 ? 1 : 0;
    return {
      explorer_indexer_fuel_core_last_block_height: fuelCoreLastBlockHeight,
      explorer_indexer_last_block_height_synced: indexerLastBlockHeight,
      explorer_indexer_block_height_sync_delay: indexerBlockHeightDelay,
      explorer_indexer_health: indexerHealth,
      explorer_indexer_fuel_core_health: fuelCoreHealth,
      explorer_indexer_fuel_core_latency_ms: fuelCoreLatencyMs,
    };
  }
}
