import { setTimeout } from 'node:timers/promises';
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
  ADD_BLOCK_RANGE = 'indexer/add-block-range',
  NEW_BLOCK = 'indexer/new-block',
}
export enum ChannelNames {
  main = 'main',
  block = 'block',
  tx = 'tx',
}

export type QueueInputs = {
  [QueueNames.ADD_BLOCK_RANGE]: {
    from: number;
    to: number;
  };
  [QueueNames.NEW_BLOCK]: {
    height: number;
    hash: string;
  };
};

class RabbitMQConnection {
  connection!: Connection;
  channels: Record<ChannelNames, Channel> = {} as Record<ChannelNames, Channel>;

  async connect() {
    if (this.connection) return this.connection;
    try {
      const url = `${PROTOCOL}://${USER}:${PASS}@${HOST}:${PORT}`;
      this.connection = await client.connect(url);
      this.connection.on('close', () => {
        logger.error('RabbitMQ', 'Connection closed');
        process.exit(1);
      });
      this.connection.on('error', () => {
        logger.error('RabbitMQ', 'Connection error');
        process.exit(1);
      });
      await this.createChannel(ChannelNames.block, MAX_WORKERS);
    } catch (error) {
      logger.error('RabbitMQ', 'Not connected to MQ Server', error);
      throw error;
    }
    return this.connection;
  }

  async disconnect() {
    const channels = Object.entries(this.channels);
    for (const [_, channel] of channels) {
      await channel.close();
    }
    await this.connection.close();
    return this.connection;
  }

  async clean() {
    const channels = Object.entries(this.channels);
    const queues = Object.values(QueueNames);
    for (const [_, channel] of channels) {
      for (const queue of queues) {
        await channel.deleteQueue(queue);
      }
    }
  }

  async send<Q extends QueueNames, P extends Payload<QueueInputs[Q]>>(
    channelName: keyof typeof ChannelNames,
    queue: Q,
    data?: P['data'],
  ) {
    try {
      const channel = await this.getChannel(ChannelNames[channelName]);
      const payload = { type: queue, data };
      const buffer = Buffer.from(JSON.stringify(payload));
      channel.sendToQueue(queue, buffer, { persistent: true });
    } catch (error) {
      logger.error('RabbitMQ', 'Failed to send message to queue', error);
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
        logger.debug('Consumer', `Consuming message from: ${queue}`);
        if (!msg) return;
        const payload = this.parsePayload<P>(msg);
        if (payload?.type === queue) {
          try {
            await handler(payload.data);
            channel.ack(msg);
          } catch (err: any) {
            logger.debug(
              'Consumer',
              `Failed to consume message from: ${queue}`,
              err.message,
            );
            await setTimeout(5000);
            channel.nack(msg, false, true);
          }
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
    const channel = await this.getChannel(ChannelNames.block);
    const data = await channel.checkQueue(queue);
    return data.messageCount;
  }

  private async createChannel(name: ChannelNames, workers: number) {
    if (this.channels[name]) return;
    const channel = await this.connection.createChannel();
    await channel.prefetch(workers);
    channel.on('close', () => {
      logger.error('RabbitMQ', 'Channel closed');
      process.exit(1);
    });
    channel.on('error', () => {
      logger.error('RabbitMQ', 'Channel error');
      process.exit(1);
    });
    this.channels[name] = channel;
  }

  private async getChannel(name: ChannelNames) {
    if (!this.connection) {
      await this.connect();
    }
    const channel = this.channels[name];
    if (!channel) {
      logger.error('RabbitMQ', `Channel ${name} not found`);
      throw new Error(`Channel ${name} not found`);
    }
    return channel;
  }
}

export const mq = new RabbitMQConnection();
