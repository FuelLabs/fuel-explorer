import { GraphQLServer } from './graphql/GraphQLServer';

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();

export * as mocks from './graphql/generated/mocks';
export * from './graphql/generated/sdk';
export { schema };
