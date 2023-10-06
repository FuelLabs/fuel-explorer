import { getTsconfig } from 'get-tsconfig';
import { relative } from 'node:path';

export default {
  '**/*.(md|mdx|json|html|css)': ['prettier --write'],
  '**/*.(t|j)s?(x)': ['prettier --write', 'eslint'],
  '**/*.ts?(x)': (files) => {
    const commands = files.map((file) => {
      const tsConfig = relative(process.cwd(), getTsconfig(file).path);
      return `tsc -p ${tsConfig} --noEmit`;
    });
    return Array.from(new Set(commands));
  },
};
