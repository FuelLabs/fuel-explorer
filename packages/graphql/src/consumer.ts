import { QueueNames, mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.assert(QueueNames.ADD_BLOCK_RANGE);
  await mq.setup();
}

main();
