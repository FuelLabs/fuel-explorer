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
};

class RabbitMQConnection {
  connection!: Connection;
  private connected!: Boolean;
  channels: Record<ChannelNames, Channel> = {} as Record<ChannelNames, Channel>;

  constructor() {
    this.connected = false;
  }

  async connect() {
    if (this.connected) return Promise.resolve();
    this.connected = true;

    try {
      console.log('⌛️ Connecting to Rabbit-MQ Server');
      const url = `amqp://${USER}:${PASS}@${HOST}:5672`;
      this.connection = await client.connect(url);
      console.log('✅ Rabbit MQ Connection is ready');
      await this.createChannel(ChannelNames.main, 5);
      await this.createChannel(ChannelNames.block, MAX_WORKERS);
      await this.createChannel(ChannelNames.tx, 100);
      console.log('🛸 Created RabbitMQ Channel successfully');
    } catch (error) {
      console.error(error);
      console.error('Not connected to MQ Server');
    }
  }

  async disconnect() {
    console.log('🔌 Disconnecting from RabbitMQ');
    const channels = Object.entries(this.channels);
    for (const [_, channel] of channels) {
      await channel.close();
    }
    await this.connection.close();
  }

  async clean() {
    const channels = Object.entries(this.channels);
    const queues = Object.values(QueueNames);
    for (const [_, channel] of channels) {
      for (const queue of queues) {
        await channel.deleteQueue(queue);
      }
    }
    console.log('🧹 Cleaned all queues');
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
      console.error(error);
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
        if (payload?.type === queue) {
          await handler(payload.data);
          channel.ack(msg);
        }
      },
      { noAck: false },
    );
  }

  async setup() {
    await this.connect();
    const blockProducer = await BlockProducer.fromSdk();
    const addBlockRange = createAddBlockRange(blockProducer);
    await this.consume('main', QueueNames.SYNC_BLOCKS, syncBlocks);
    await this.consume('main', QueueNames.SYNC_MISSING, syncMissingBlocks);
    await this.consume('main', QueueNames.SYNC_LAST, syncLastBlocks);
    await this.consume('block', QueueNames.ADD_BLOCK_RANGE, addBlockRange);
  }

  private parsePayload<P extends Payload>(msg: ConsumeMessage | null) {
    const content = msg?.content?.toString();
    if (!content) return null;
    return JSON.parse(content) as P;
  }

  async getActive(queue: QueueNames) {
    const channels = Object.values(this.channels);
    const counters = await Promise.all(
      channels.map((c) => c.checkQueue(queue)),
    );
    return counters.reduce((acc, res) => acc + res.messageCount, 0);
  }

  private async createChannel(name: ChannelNames, workers: number) {
    if (this.channels[name]) return;
    const channel = await this.connection.createChannel();
    await channel.prefetch(workers);
    this.channels[name] = channel;
  }

  private async getChannel(name: ChannelNames) {
    if (!this.connected) {
      await this.connect();
    }
    const channel = this.channels[name];
    if (!channel) {
      throw new Error(`Channel ${name} not found`);
    }
    return channel;
  }
}

export const mq = new RabbitMQConnection();
