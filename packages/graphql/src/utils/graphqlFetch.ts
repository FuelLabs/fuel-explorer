import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type FetchOptions = {
  document: string | DocumentNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>;
  operationName?: string;
};

export function createGraphqlFetch(url: string, log: boolean = false) {
  return async ({ document, variables, operationName }: FetchOptions) => {
    const query = typeof document === 'string' ? document : print(document);

    if (log) {
      console.log(`# -- OPERATION ${new Date().toISOString()}:\n${query}`);
    }

    const fetchResult = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operationName, query, variables }),
    });
    return fetchResult.json();
  };
}
