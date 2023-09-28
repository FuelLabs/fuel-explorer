import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema:
        process.env.FUEL_PROVIDER_URL || 'http://beta-3.fuel.network/graphql',
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
