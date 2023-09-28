import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as configDotenv } from 'dotenv';
configDotenv();

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema: process.env.FUEL_PROVIDER_URL,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
