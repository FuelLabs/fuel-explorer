import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4444/graphql',
  documents: ['./src/queries/**.graphql'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        nonOptionalTypename: true,
        rawRequest: true,
        useTypeImports: true,
      },
    },
    'src/generated/mocks.ts': {
      plugins: ['typescript-mock-data'],
      config: {
        addTypename: true,
        typesFile: './graphql.ts',
        typesNames: 'keep',
        scalars: {
          Tai64Timestamp: 'unix_time',
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['pnpm fix:generated'],
  },
};
export default config;
