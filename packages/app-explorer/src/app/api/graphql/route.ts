import { createExecutor, createSchema } from '@fuel-explorer/graphql';
import { ContextDomain } from '@fuel-explorer/graphql/src/domains/Context';
import { createYoga } from 'graphql-yoga';
import { NextResponse } from 'next/server';
import { requireEnv } from '~/systems/utils/requireEnv';

const { FUEL_PROVIDER: url } = requireEnv(['FUEL_PROVIDER']);

const executor = createExecutor(async ({ body }) => {
  return fetch(url, {
    body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
});

const schema = createSchema(executor);
const { handleRequest } = createYoga({
  schema,
  batching: true,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: {
    Response,
    Request,
  },
  context: async () => {
    return ContextDomain.createContext(url);
  },
});

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
