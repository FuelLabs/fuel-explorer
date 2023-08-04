export function graphqlFetch(
  url: string,
  query: string,
  variables?: any,
  operationName?: string
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      operationName,
      query,
      variables,
    }),
  });
}
