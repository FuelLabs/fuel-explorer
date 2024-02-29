import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const SERVER_URL = process.env.FUEL_PROVIDER || 'http://127.0.0.1:4000/graphql';

const config: CodegenConfig = {
  overwrite: true,
  documents: ['./src/domain/**/*.graphql'],
  schema: SERVER_URL,
  generates: {
    './src/application/schemas/fuelcore.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
    './src/application/schemas/fuelcore-types.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: false,
      },
    },
    './src/generated/types.ts': {
      schema: './src/gql/schemas/generated/fuelcore.graphql',
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
