import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/schemas/fullschema.graphql',
  documents: ['./src/graphql/queries/**.graphql'],
  generates: {
    'src/graphql/generated/types.ts': {
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
    'src/graphql/generated/mocks.ts': {
      plugins: ['typescript-mock-data'],
      config: {
        addTypename: true,
        typesFile: './types.ts',
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
