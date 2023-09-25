import { promises as fs } from 'node:fs';
import path from 'node:path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function types() {
  const filepath = path.resolve(__dirname, '../src/generated/graphql.ts');
  let file = await fs.readFile(filepath, 'utf-8');
  file = file.replace('returnType: ReturnType', 'returnType: _ReturnType');
  file = file.replace('export enum ReturnType {', 'export enum _ReturnType {');
  file = file.replace('Dom.Headers', 'any');
  await fs.writeFile(filepath, file, 'utf-8');
}

async function mocks() {
  const filepath = path.resolve(__dirname, '../src/generated/mocks.ts');
  let file = await fs.readFile(filepath, 'utf-8');
  file = file.replace(', ReturnType, ', ', _ReturnType as ReturnType, ');
  await fs.writeFile(filepath, file, 'utf-8');
}

async function main() {
  await types();
  await mocks();
}

main();
