import DataCache from '~/infra/cache/DataCache';
import AssetDAO from '~/infra/dao/AssetDAO';

export default class GetAssetsRate {
  async execute(): Promise<Output[]> {
    const assetDAO = new AssetDAO();
    const output = await assetDAO.getAssetsRate();
    return output;
  }

  async executeCached(): Promise<Output[]> {
    const cachedAssetsRate = DataCache.getInstance().get('assetsRate');
    if (cachedAssetsRate) {
      return cachedAssetsRate;
    }

    const output = await this.execute();
    DataCache.getInstance().save('assetsRate', 60000, output);
    return output;
  }
}

type Output = {
  symbol: string;
  rate: number;
};
