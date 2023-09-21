import tsconfig from './tsconfig.json';

const defConfig = {
  outDir: 'dist',
  splitting: true,
  format: ['cjs', 'esm'],
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  sourcemap: true,
  clean: true,
  target: tsconfig.compilerOptions.target,
};

export default [
  {
    ...defConfig,
    entry: {
      index: 'src/index.tsx',
      register: 'src/register.tsx',
    },
  },
];
