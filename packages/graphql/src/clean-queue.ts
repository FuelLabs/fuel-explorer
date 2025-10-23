import { mq } from './infra/queue/Queue';

async function main() {
  await mq.connect();
  await mq.clean();
}

main();
