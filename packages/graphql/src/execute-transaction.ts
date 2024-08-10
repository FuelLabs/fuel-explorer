// @ts-nocheck
import { BlockRepository } from './domain/Block/BlockRepository';

async function main() {
  const blockHeight = parseInt(process.argv[2]);
  const transactionId = process.argv[3];
  const res = await BlockRepository.blocksFromNode(1, blockHeight - 1);
  const { blocks } = res;
  for (const block of blocks) {
    for (const transaction of block.transactions) {
      if (transaction.id === transactionId) {
        console.log(JSON.stringify(transaction.status?.receipts));
      }
    }
  }
}

main();
