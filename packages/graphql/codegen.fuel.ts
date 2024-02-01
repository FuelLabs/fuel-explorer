import type { CodegenConfig } from '@graphql-codegen/cli';

import { requireEnv } from './src/utils/requireEnv';

const { FUEL_PROVIDER } = requireEnv(['FUEL_PROVIDER']);

const config: CodegenConfig = {
  generates: {
    './src/schemas/fuelcore.graphql': {
      schema: FUEL_PROVIDER,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};
export default config;
