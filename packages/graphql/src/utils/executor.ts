import type { Executor } from '@graphql-tools/utils';
import { print } from 'graphql';

export type GraphQLExecutor = Executor<{ url: string }>;
export type ExecutorParams = {
  body: string;
  query: string;
};

export function createExecutor(
  cb: (params: ExecutorParams) => Promise<any>,
): GraphQLExecutor {
  return async ({ document, variables, operationName }) => {
    const query = typeof document === 'string' ? document : print(document);
    const body = JSON.stringify({ operationName, query, variables });
    return cb({ query, body });
  };
}

export function createGraphqlFetch(
  url: string,
  log?: boolean,
): GraphQLExecutor {
  return createExecutor(async ({ query, body }) => {
    if (log) {
      console.log(`# -- OPERATION ${new Date().toISOString()}:\n${query}`);
    }
    const fetchResult = await fetch(url, {
      body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return fetchResult.json();
  });
}
