import client, {
  type Channel,
  type Connection,
  type ConsumeMessage,
} from 'amqplib';
import { createAddBlockRange } from '~/application/uc/AddBlockRange';
import { syncBlocks } from '~/application/uc/SyncBlocks';
import { syncLastBlocks } from '~/application/uc/SyncLastBlocks';
import { syncMissingBlocks } from '~/application/uc/SyncMissingBlocks';
import { env } from '~/config';
import { BlockProducer } from '~/domain/Block/vo/BlockProducer';
import type { GQLBlock } from '~/graphql/generated/sdk';

const HOST = env.get('RABBITMQ_HOST');
const USER = env.get('RABBITMQ_USER');
const PASS = env.get('RABBITMQ_PASS');
const MAX_WORKERS = Number(env.get('QUEUE_CONCURRENCY'));

type Payload<D = unknown> = {
  type: QueueNames;
  data: D;
};

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync-blocks',
  ADD_BLOCK_RANGE = 'indexer/add-block-range',
  SYNC_MISSING = 'indexer/sync-missing',
  SYNC_LAST = 'indexer/sync-last',
}

export type QueueInputs = {
  [QueueNames.SYNC_MISSING]: null;
  [QueueNames.SYNC_BLOCKS]: {
    cursor?: number;
    offset?: number;
    watch?: boolean;
  };
  [QueueNames.ADD_BLOCK_RANGE]: {
    from: number;
    to: number;
    blocks: GQLBlock[];
  };
  [QueueNames.SYNC_LAST]: {
    last: number;
    watch?: boolean;
  };
};

class RabbitMQConnection {
  connection!: Connection;
  channel!: Channel;
  private connected!: Boolean;

  async connect() {
    if (this.connected && this.channel) return;
    this.connected = true;

    try {
      console.log('⌛️ Connecting to Rabbit-MQ Server');
      const url = `amqp://${USER}:${PASS}@${HOST}:5672`;
      this.connection = await client.connect(url);
      console.log('✅ Rabbit MQ Connection is ready');
      this.channel = await this.connection.createChannel();
      await this.channel.prefetch(MAX_WORKERS);
      console.log('🛸 Created RabbitMQ Channel successfully');
    } catch (error) {
      console.error(error);
      console.error('Not connected to MQ Server');
    }
  }

  async disconnect() {
    await this.channel.close();
    await this.connection.close();
  }

  async clean() {
    const names = Object.values(QueueNames);
    for (const name of names) {
      await this.channel.deleteQueue(name);
    }
    await this.channel.deleteExchange('blocks');
    console.log('🧹 Cleaned all queues');
  }

  async send<Q extends QueueNames, P extends Payload<QueueInputs[Q]>>(
    queue: Q,
    data?: P['data'],
  ) {
    try {
      if (!this.channel) {
        await this.connect();
      }
      const payload = { type: queue, data } as P;
      const buffer = Buffer.from(JSON.stringify(payload));
      this.channel.sendToQueue(queue, buffer, { persistent: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async consume<Q extends QueueNames, P extends Payload<QueueInputs[Q]>>(
    queue: Q,
    handler: (data: P['data']) => Promise<void>,
  ) {
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.consume(
      queue,
      async (msg) => {
        if (!msg) return;
        const payload = this.parsePayload<P>(msg);
        if (payload?.type === queue) {
          await handler(payload.data);
          this.channel.ack(msg);
        }
      },
      { noAck: false },
    );
  }

  async setup() {
    await this.connect();
    const blockProducer = await BlockProducer.fromSdk();
    const addBlockRange = createAddBlockRange(blockProducer);
    await this.consume(QueueNames.ADD_BLOCK_RANGE, addBlockRange);
    await this.consume(QueueNames.SYNC_BLOCKS, syncBlocks);
    await this.consume(QueueNames.SYNC_MISSING, syncMissingBlocks);
    await this.consume(QueueNames.SYNC_LAST, syncLastBlocks);
  }

  private parsePayload<P extends Payload>(msg: ConsumeMessage | null) {
    const content = msg?.content?.toString();
    if (!content) return null;
    return JSON.parse(content) as P;
  }

  async getActive(queue: QueueNames) {
    const res = await this.channel.checkQueue(queue);
    return res.messageCount;
  }
}

export const mq = new RabbitMQConnection();
