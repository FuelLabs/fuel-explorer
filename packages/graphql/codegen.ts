import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schemas/fullschema.graphql',
  documents: ['./src/queries/**.graphql'],
  generates: {
    'src/generated/types.ts': {
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
