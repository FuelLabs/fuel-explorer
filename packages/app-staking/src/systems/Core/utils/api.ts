import { COSMOS_INDEXER_API } from 'app-commons';
import { fetchStakingWithFallback } from '~staking/systems/Core/utils/fetchStakingWithFallback';
import { StakingEndpointsService } from '~staking/systems/Staking/services/StakingEndpointsService';

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, init);

  if (res.ok) {
    return res.json();
  }

  const error = await res.json();
  return Promise.reject(error);
};

const cosmosRequest = <T>(
  url: `/${string}`,
  init?: RequestInit,
): Promise<T> => {
  const currentUrls = StakingEndpointsService.getCurrentCosmosCometUrls();
  const baseDomain = currentUrls.COSMOS.REST || '';

  return fetchStakingWithFallback<T>({
    baseDomain,
    path: url,
    system: 'COSMOS',
    endpointType: 'REST',
    init,
  });
};

const cosmosIndexerRequest = <T>(
  url: `/${string}`,
  init?: RequestInit,
): Promise<T> => {
  return fetch(`${COSMOS_INDEXER_API || ''}${url}`, init).then((res) =>
    res.json(),
  );
};

export const api = {
  get: request,
  post: async <TData, TBody>(url: string, body: TBody) => {
    return request<TData>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};

export const cosmosApi = {
  get: cosmosRequest,
  post: async <TData, TBody>(url: string, body: TBody) => {
    return request<TData>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};

export const cosmosIndexerApi = {
  get: cosmosIndexerRequest,
  post: async <TData, TBody>(url: string, body: TBody) => {
    return request<TData>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};
