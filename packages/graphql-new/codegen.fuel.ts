import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const SERVER_URL =
  process.env.FUEL_PROVIDER || 'https://beta-5.fuel.network/graphql';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/graphql/schemas/fuelcore.graphql': {
      schema: SERVER_URL,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
