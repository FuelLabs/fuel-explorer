import type { FetchRequestOptions } from 'fuels';
import { Provider } from 'fuels';

let requestTimestamps: number[] = [];
const maxRequestsPerSecond = 20;
const waitTime = 1000; // 1 second in milliseconds

export const rateLimitedFetch = async (
  url: string,
  options: FetchRequestOptions
): Promise<Response> => {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(
    (timestamp) => now - timestamp < waitTime
  );

  if (requestTimestamps.length >= maxRequestsPerSecond) {
    console.log(
      `Reached the rate limit of ${maxRequestsPerSecond} requests per second. Waiting for 1 second...`
    );
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    console.log('Done waiting. Resuming requests...');
    // Do not clear the request timestamps. Rely on the filter to remove old ones.
    // Call the function recursively to recheck the limit
    return rateLimitedFetch(url, options);
  }

  // Add a new timestamp for the current request
  requestTimestamps.push(Date.now());

  // Finally, perform the fetch operation
  return fetch(url, options);
};

export async function createProvider(url: string) {
  const provider = await Provider.create(url, { fetch: rateLimitedFetch });
  return provider;
}
