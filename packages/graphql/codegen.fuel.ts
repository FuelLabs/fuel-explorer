import type { CodegenConfig } from '@graphql-codegen/cli';

import { FUEL_CHAIN } from 'app-commons/src/chains/fuel';

const { providerUrl } = FUEL_CHAIN;

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema: providerUrl,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
