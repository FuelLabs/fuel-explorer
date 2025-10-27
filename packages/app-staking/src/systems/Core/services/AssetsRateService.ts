import { FUEL_INDEXER_API, urlJoin } from 'app-commons';

export interface AssetRate {
  symbol: string;
  rate: number;
}

async function handleError(res: Response) {
  try {
    const errorText = await res.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { error: errorText || 'Unknown error', status: res.status };
    }
    return Promise.reject(errorData);
  } catch (_e) {
    return Promise.reject({
      error: 'Could not parse error response',
      status: res.status,
    });
  }
}

export class AssetsRateService {
  static async getAssetsRate(): Promise<AssetRate[]> {
    const res = await fetch(urlJoin(FUEL_INDEXER_API, '/assets_rate'));

    if (res.ok) {
      return res.json();
    }

    return handleError(res);
  }
}
