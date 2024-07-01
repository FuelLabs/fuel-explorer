import { logger } from '~/core/Logger';
import { client } from '~/graphql/GraphQLSDK';
import { type QueueInputs, QueueNames, mq } from '~/infra/queue/Queue';

type Data = QueueInputs[QueueNames.SYNC_LAST];

export class SyncLastBlocks {
  async execute({ last, watch }: Data) {
    const { data } = await client.sdk.blocks({ last: 1 });
    const lastBlock = data.blocks.nodes[0];
    const blockHeight = Number(lastBlock?.header.height ?? '0');
    const from = blockHeight - last;

    logger.syncer.info(
      `Syncing last ${last} blocks from ${from} to ${blockHeight}`,
    );
    await mq.send('main', QueueNames.SYNC_BLOCKS, { watch, cursor: from });
  }
}

export const syncLastBlocks = async (data: Data) => {
  try {
    const syncLastBlocks = new SyncLastBlocks();
    await syncLastBlocks.execute(data);
  } catch (error) {
    logger.error('Sync last blocks error', error);
    throw new Error('Sync last', { cause: error });
  }
};
