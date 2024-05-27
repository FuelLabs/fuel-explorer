import type { CodegenConfig } from '@graphql-codegen/cli';
import { requireEnv } from './src/utils/requireEnv';

const { SERVER_PORT } = requireEnv([['SERVER_PORT', '4444']]);

const config: CodegenConfig = {
  overwrite: true,
  documents: ['./src/queries/**.graphql'],
  schema: {
    [`http://localhost:${SERVER_PORT}/graphql`]: {
      headers: {
        Authorization: `Bearer ${process.env.FUEL_EXPLORER_API_KEY}`,
      },
    },
  },
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
        defaultScalarType: 'string',
        scalars: {
          Boolean: 'boolean',
          Int: 'number',
        },
      },
    },
    'src/generated/mocks.ts': {
      plugins: [
        {
          'typescript-mock-data': {
            addTypename: true,
            typesFile: './types.ts',
            typesNames: 'keep',
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
  hooks: {
    afterAllFileWrite: ['pnpm fix:generated'],
  },
};
export default config;
