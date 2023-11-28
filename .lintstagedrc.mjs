import { getTsconfig } from 'get-tsconfig';
import { relative } from 'node:path';

export default {
  '**/*.(js|jsx|ts|jsx|md|mdx|json|html|css)': ['prettier --write'],
  '**/*.ts?(x)': (files) => {
    const commands = files.flatMap((file) => {
      const tsConfig = relative(process.cwd(), getTsconfig(file).path);
      return [`tsc -p ${tsConfig} --noEmit`, `eslint .`];
    });
    return Array.from(new Set(commands));
  },
};
