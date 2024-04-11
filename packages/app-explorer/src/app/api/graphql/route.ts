import { GraphQLServer } from '@fuel-explorer/graphql-new';
import { NextResponse } from 'next/server';

const graphQLServer = new GraphQLServer();
const schema = graphQLServer.schema();
const { handleRequest } = graphQLServer.setup(schema);

const authenticatiohMiddleware = async (request: Request, ctx: Object) => {
  if (process.env.FUEL_EXPLORER_API) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }
  return handleRequest(request, ctx);
};

export {
  authenticatiohMiddleware as GET,
  authenticatiohMiddleware as POST,
  authenticatiohMiddleware as OPTIONS,
};
