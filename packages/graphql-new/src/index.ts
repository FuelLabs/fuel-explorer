import { GraphQLServer } from './graphql/GraphQLServer';

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();

export { schema };
