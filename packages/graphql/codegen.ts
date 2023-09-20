import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/schemas/fullschema.graphql',
  documents: ['./src/queries/**.graphql'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: true,
        nonOptionalTypename: true,
        useTypeImports: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['sed -i "" s/Dom.Headers/any/g', 'prettier --write'],
  },
};
export default config;
