import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import * as protobuf from 'protobufjs';

const here = dirname(__dirname);
const root = protobuf.loadSync(join(here, 'proto', 'api.proto'));
root.resolveAll();
const outDir = join(here, 'src', 'generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, 'api.json'),
  `${JSON.stringify(root.toJSON(), null, 2)}\n`,
);
console.log('wrote src/generated/api.json');
