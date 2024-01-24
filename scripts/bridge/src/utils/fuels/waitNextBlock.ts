import type { Provider } from 'fuels';
import { setTimeout } from 'timers/promises';

// 5 seconds
const RETRY_DELAY = 5 * 1000;

export async function waitNextBlock(
  provider: Provider,
  blockId: string
): Promise<string> {
  console.log('Checking if a new block is available...', blockId);
  const chain = await provider.getChain();
  const currentBlock = await provider.getBlock(blockId);

  if (chain.latestBlock.height.lte(currentBlock?.height)) {
    console.log(`Waiting for ${RETRY_DELAY}ms and check again`);
    await setTimeout(RETRY_DELAY);
    return waitNextBlock(provider, blockId);
  }

  return chain.latestBlock.id;
}
