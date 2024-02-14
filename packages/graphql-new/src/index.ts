import { GraphQLServer } from './core/GraphQLServer';

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();

export { schema };
