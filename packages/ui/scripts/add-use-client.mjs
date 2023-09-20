import { promises as fs } from 'fs';
import { globby } from 'globby';
import path from 'path';
import * as url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '../dist');

async function main() {
  const files = await globby([`${DIST_DIR}/**/*.js`, `${DIST_DIR}/**/*.mjs`]);

  for (const file of files) {
    let content = await fs.readFile(file, 'utf-8');
    if (content.includes("//! 'use client';")) {
      content = `'use client'\n${content}`;
    }
    await fs.writeFile(file, content);
  }
}

main();
