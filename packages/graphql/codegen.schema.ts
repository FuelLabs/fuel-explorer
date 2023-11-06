import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/schemas/fullschema.graphql': {
      schema: `http://localhost:${process.env.SERVER_PORT}/graphql`,
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
