import type { IGraphQLConfig } from 'graphql-config';

const config: IGraphQLConfig = {
  schema: ['./src/graphql/schemas/**.graphql'],
};

export default config;
