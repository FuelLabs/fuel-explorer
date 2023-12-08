import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema:
        process.env.FUEL_PROVIDER_URL || 'https://beta-5.swayswap.io/graphql',
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
