import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/generated/sdk.ts': {
      documents: ['./src/generated/fuelcore/**/**.graphql'],
      schema: ['./src/application/graphql/schemas/fuelcore.graphql'],
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
    './src/generated/gql-types.ts': {
      schema: [
        './src/application/graphql/schemas/fuelcore.graphql',
        './src/application/graphql/schemas/explorer.graphql',
      ],
      plugins: ['typescript', 'typescript-operations'],
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
