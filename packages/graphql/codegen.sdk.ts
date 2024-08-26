import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/graphql/generated/sdk-provider.ts': {
      documents: ['./src/graphql/queries/provider/**.graphql'],
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
        },
      },
    },
    './src/graphql/generated/sdk.ts': {
      documents: ['./src/graphql/queries/sdk/**.graphql'],
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
    './src/graphql/generated/mocks.ts': {
      documents: ['./src/graphql/queries/sdk/**.graphql'],
      schema: [
        './src/graphql/schemas/fuelcore.graphql',
        './src/graphql/schemas/explorer.graphql',
      ],
      plugins: [
        {
          'typescript-mock-data': {
            addTypename: true,
            useTypeImports: true,
            enumsAsTypes: true,
            typesFile: './sdk.ts',
            typesNames: 'keep',
            typesPrefix: 'GQL',
            enumsPrefix: 'GQL',
            generateLibrary: 'faker',
            fieldGeneration: {
              _all: {
                totalAmount: {
                  generator: 'datatype.hexadecimal',
                },
              },
            },
            scalars: {
              Address: {
                generator: 'random.alphaNumeric',
                arguments: [40],
              },
              AssetId: {
                generator: 'random.alphaNumeric',
                arguments: [32],
              },
              ContractId: {
                generator: 'random.alphaNumeric',
                arguments: [32],
              },
              TransactionId: {
                generator: 'random.alphaNumeric',
                arguments: [32],
              },
              UtxoId: {
                generator: 'random.alphaNumeric',
                arguments: [32],
              },
              U64: {
                generator: 'datatype.hexadecimal',
              },
              U16: {
                generator: 'datatype.hexadecimal',
              },
              HexString: {
                generator: 'datatype.hexadecimal',
                arguments: [160],
              },
            },
          },
        },
      ],
    },
  },
};
export default config;
