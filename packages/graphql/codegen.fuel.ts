import type { CodegenConfig } from '@graphql-codegen/cli';

console.log(`process.env.FUEL_PROVIDER_BETA5`, process.env.FUEL_PROVIDER_BETA5);

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema:
        process.env.FUEL_PROVIDER_BETA5 ||
        'https://beta-5.fuel.network/graphql',
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
