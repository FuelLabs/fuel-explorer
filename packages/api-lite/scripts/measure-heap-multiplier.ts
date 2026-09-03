// Measures how much real V8 heap a decoded GQLBlock costs per byte of its
// JSON.stringify() length. Backs BlockStore.ts's HEAP_BYTES_MULTIPLIER
// constant -- re-run this after a decoder change that materially reshapes
// GQLBlock and update that constant if the multiplier moves. Run with
// --expose-gc for accurate deltas.
//
//   npx tsx --expose-gc scripts/measure-heap-multiplier.ts
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { decodeBlock } from '../src/decoder/block';

const fee = {
  gasPriceFactor: '92',
  gasPerByte: '63',
  maxGasPerTx: '30000000',
  gasCosts: {
    ecr1: '3000',
    s256: { LightOperation: { base: '2', unitsPerGas: '214' } },
    vmInitialization: { base: '1', unitsPerGas: '1' },
  },
};

function decodeFixture(height: number) {
  const bytes = readFileSync(
    join(__dirname, '../test/fixtures/blocks', `${height}.bin`),
  );
  return decodeBlock(new Uint8Array(bytes), { chainId: 9889, fee });
}

function measure(height: number) {
  const N = 200;
  const block = decodeFixture(height);
  const jsonBytes = Buffer.byteLength(JSON.stringify(block));

  if (global.gc) global.gc();
  const before = process.memoryUsage().heapUsed;
  const held: unknown[] = [];
  for (let i = 0; i < N; i++) {
    held.push(decodeFixture(height));
  }
  if (global.gc) global.gc();
  const after = process.memoryUsage().heapUsed;
  const perObject = (after - before) / N;
  const multiplier = perObject / jsonBytes;
  console.log(
    `height=${height} jsonBytes=${jsonBytes} heapPerObject=${Math.round(perObject)} multiplier=${multiplier.toFixed(2)}x heldCount=${held.length}`,
  );
  return multiplier;
}

const heights = [62724773, 62724775];
const multipliers = heights.map(measure);
const avg = multipliers.reduce((a, b) => a + b, 0) / multipliers.length;
console.log(`\naverage multiplier: ${avg.toFixed(2)}x`);
