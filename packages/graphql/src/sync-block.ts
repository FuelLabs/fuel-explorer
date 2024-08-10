import { AddBlockRange } from './application/uc/AddBlockRange';
import { BlockProducer } from './domain/Block/vo/BlockProducer';

async function main() {
  const block = parseInt(process.argv[2]);
  const blockProducer = await BlockProducer.fromSdk();
  const addBlockRange = new AddBlockRange();
  const input = {
    from: block,
    to: block,
  };
  await addBlockRange.execute(input, blockProducer);
}

main();
