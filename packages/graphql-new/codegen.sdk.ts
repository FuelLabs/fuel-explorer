import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const documents = ['./src/graphql/**/**.graphql'];

const config: CodegenConfig = {
  documents,
  overwrite: false,
  generates: {
    './src/graphql/generated/sdk.ts': {
      schema: [
        './src/graphql/schemas/fuelcore.graphql',
        './src/graphql/schemas/explorer.graphql',
      ],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        nonOptionalTypename: true,
        rawRequest: true,
        useTypeImports: true,
        defaultScalarType: 'string',
        typesPrefix: 'GQL',
        scalars: {
          Boolean: 'boolean',
          Int: 'number',
        },
      },
    },
  },
};
export default config;
