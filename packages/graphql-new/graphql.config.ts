import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema: ['./src/graphql/schemas/**.graphql'],
  documents: ['./src/domain/**/*.graphql'],
};

export default config;
