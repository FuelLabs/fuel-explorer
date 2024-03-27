import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/graphql/generated/sdk-core.ts': {
      documents: ['./src/graphql/generated/fuelcore/**/**.graphql'],
      schema: ['./src/graphql/schemas/fuelcore.graphql'],
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
    './src/graphql/generated/sdk.ts': {
      documents: ['./src/graphql/queries/**.graphql'],
      schema: [
        './src/graphql/schemas/bridge.graphql',
        './src/graphql/schemas/explorer.graphql',
        './src/graphql/schemas/fuelcore.graphql',
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
