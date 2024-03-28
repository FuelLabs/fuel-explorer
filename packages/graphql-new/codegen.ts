import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const SERVER_URL = process.env.FUEL_PROVIDER || 'http://127.0.0.1:4000/graphql';
const documents = ['./src/graphql/**/**.graphql'];

const config: CodegenConfig = {
  overwrite: true,
  documents,
  generates: {
    './src/graphql/schemas/fuelcore.graphql': {
      schema: SERVER_URL,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
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
