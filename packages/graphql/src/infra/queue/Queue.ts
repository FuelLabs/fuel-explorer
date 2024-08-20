import client, {
  type Channel,
  type Connection,
  type ConsumeMessage,
} from 'amqplib';
import NewAddBlockRange from '~/application/uc/NewAddBlockRange';
import { env } from '~/config';
import { logger } from '~/core/Logger';

const HOST = env.get('RABBITMQ_HOST');
const PORT = env.get('RABBITMQ_PORT');
const USER = env.get('RABBITMQ_USER');
const PASS = env.get('RABBITMQ_PASS');
const MAX_WORKERS = Number(env.get('QUEUE_CONCURRENCY'));
const PROTOCOL = env.get('SSL') ? 'amqps' : 'amqp';

type Payload<D = unknown> = {
  type: QueueNames;
  data: D;
};

export enum QueueNames {
  SYNC_BLOCKS = 'indexer/sync-blocks',
  ADD_BLOCK_RANGE = 'indexer/add-block-range',
  SYNC_MISSING = 'indexer/sync-missing',
  SYNC_LAST = 'indexer/sync-last',
  SYNC_LOST_BLOCKS = 'indexer/sync-lost-blocks',
}
export enum ChannelNames {
  main = 'main',
  block = 'block',
  tx = 'tx',
}

export type QueueInputs = {
  [QueueNames.SYNC_MISSING]: null;
  [QueueNames.SYNC_BLOCKS]: {
    cursor?: number;
    offset?: number;
    watch?: boolean;
  };
  [QueueNames.SYNC_LAST]: {
    last: number;
    watch?: boolean;
  };
  [QueueNames.ADD_BLOCK_RANGE]: {
    from: number;
    to: number;
  };
  [QueueNames.SYNC_LOST_BLOCKS]: {};
};

class RabbitMQConnection {
  connection!: Connection;
  channels: Record<ChannelNames, Channel> = {} as Record<ChannelNames, Channel>;

  async connect() {
    if (this.connection) return this.connection;

    try {
      logger.debug('⌛️ Connecting to Rabbit-MQ Server');
      const url = `${PROTOCOL}://${USER}:${PASS}@${HOST}:${PORT}`;
      this.connection = await client.connect(url);
      logger.debug('✅ Rabbit MQ Connection is ready');
      await this.createChannel(ChannelNames.main, 5);
      await this.createChannel(ChannelNames.block, MAX_WORKERS);
      await this.createChannel(ChannelNames.tx, 100);
      logger.info('🚀 RabbitMQ Connection is ready');
    } catch (error) {
      logger.error('Not connected to MQ Server', error);
    }
    return this.connection;
  }

  async disconnect() {
    logger.debug('🔌 Disconnecting from RabbitMQ');
    const channels = Object.entries(this.channels);
    for (const [_, channel] of channels) {
      await channel.close();
    }
    await this.connection.close();
    logger.info('🔌 Disconnected from RabbitMQ');
    return this.connection;
  }

  async clean() {
    logger.debug('🧹 Cleaning all queues');
    const channels = Object.entries(this.channels);
    const queues = Object.values(QueueNames);
    for (const [_, channel] of channels) {
      for (const queue of queues) {
        await channel.deleteQueue(queue);
      }
    }
    logger.info('🧹 Cleaned all queues');
  }

  async send<Q extends QueueNames, P extends Payload<QueueInputs[Q]>>(
    channelName: keyof typeof ChannelNames,
    queue: Q,
    data?: P['data'],
  ) {
    try {
      const channel = await this.getChannel(ChannelNames[channelName]);
      const payload = { type: queue, data } as P;
      const buffer = Buffer.from(JSON.stringify(payload));
      channel.sendToQueue(queue, buffer, { persistent: true });
    } catch (error) {
      logger.error('Failed to send message to queue', error);
      throw error;
    }
  }

  async consume<Q extends QueueNames, P extends Payload<QueueInputs[Q]>>(
    channelName: keyof typeof ChannelNames,
    queue: Q,
    handler: (data: P['data']) => Promise<void>,
  ) {
    const channel = await this.getChannel(ChannelNames[channelName]);
    await channel.assertQueue(queue, { durable: true });
    await channel.consume(
      queue,
      async (msg) => {
        if (!msg) return;
        const payload = this.parsePayload<P>(msg);
        logger.debug(`📥 Received message from ${queue}`, payload);
        if (payload?.type === queue) {
          await handler(payload.data);
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  }

  async setup() {
    const addBlockRange = new NewAddBlockRange();
    await this.consume(
      'block',
      QueueNames.ADD_BLOCK_RANGE,
      async (data: { from: number; to: number }) => {
        try {
          await addBlockRange.execute(data);
        } catch (error) {
          throw new Error('Add block range failed', { cause: error });
        }
      },
    );
  }

  async assert(queue: string) {
    const channel = await this.getChannel(ChannelNames.block);
    await channel.assertQueue(queue, { durable: true });
  }

  private parsePayload<P extends Payload>(msg: ConsumeMessage | null) {
    const content = msg?.content?.toString();
    if (!content) return null;
    return JSON.parse(content) as P;
  }

  async getActive(queue: QueueNames) {
    logger.debug(`🔗 Getting active workers for ${queue}`);
    const channel = await this.getChannel(ChannelNames.block);
    const data = await channel.checkQueue(queue);
    return data.messageCount;
  }

  private async createChannel(name: ChannelNames, workers: number) {
    if (this.channels[name]) return;
    logger.debug(`🔗 Creating channel ${name}`);
    const channel = await this.connection.createChannel();
    await channel.prefetch(workers);
    this.channels[name] = channel;
    logger.debug(`✅ Channel ${name} is ready`);
  }

  private async getChannel(name: ChannelNames) {
    if (!this.connection) {
      await this.connect();
    }
    const channel = this.channels[name];
    if (!channel) {
      logger.error(`Channel ${name} not found`);
      throw new Error(`Channel ${name} not found`);
    }
    return channel;
  }
}

export const mq = new RabbitMQConnection();
