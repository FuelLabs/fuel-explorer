import type { Provider } from 'fuels';
import DataCache from '../cache/DataCache';
import VerifiedAssets from '../cache/VerifiedAssets';
import AssetDAO from '../dao/AssetDAO';

export default class AssetGateway {
  async getAsset(assetId: string, chainId?: number, _provider?: Provider) {
    const assetDAO = new AssetDAO();
    const nonVerifiedAsset = await assetDAO.getByAssetId(assetId);
    const isNFT =
      (nonVerifiedAsset?.decimals === 0 ||
        nonVerifiedAsset?.decimals === null) &&
      nonVerifiedAsset.totalSupply === '1' &&
      nonVerifiedAsset?.contractId;
    const verifiedAssets = await VerifiedAssets.getInstance().fetch();
    for (const verifiedAsset of verifiedAssets) {
      for (const network of verifiedAsset.networks) {
        if (network.type === 'fuel') {
          network.__typename = 'AssetNetworkFuel';
        }
        if (network.type === 'ethereum') {
          network.__typename = 'AssetNetworkEthereum';
        }
      }
    }
    for (const verifiedAsset of verifiedAssets) {
      for (const network of verifiedAsset.networks) {
        if (network.chainId === chainId && network.assetId === assetId) {
          let assetRate = DataCache.getInstance().get(`${assetId}-rate`);
          if (!assetRate) {
            assetRate = await assetDAO.getAssetsRateByAssetId(assetId);
            DataCache.getInstance().save(`${assetId}-rate`, 300000, assetRate);
          }
          const asset = Object.assign(verifiedAsset, {
            assetId: assetId,
            contractId: network.contractId,
            subId: nonVerifiedAsset?.subId,
            decimals: network.decimals,
            totalSupply: nonVerifiedAsset?.totalSupply,
            suspicious: false,
            verified: true,
            metadata: nonVerifiedAsset?.metadata,
            rate: assetRate?.rate || null,
          });
          return asset;
        }
      }
      if (
        nonVerifiedAsset &&
        (nonVerifiedAsset?.symbol === verifiedAsset.symbol ||
          nonVerifiedAsset?.name === verifiedAsset.name)
      ) {
        nonVerifiedAsset.suspicious = true;
      }
    }
    if (!nonVerifiedAsset) return;
    if (isNFT) {
      const owner = await assetDAO.getAssetOwner(assetId);
      const uri = this.parseUrl(
        nonVerifiedAsset.metadata.uri || nonVerifiedAsset.metadata.URI,
      );
      return Object.assign(nonVerifiedAsset, {
        isNFT: true,
        verified: false,
        owner,
        uri,
      });
    }
    return Object.assign(nonVerifiedAsset, {
      verified: false,
      isNFT,
    });
  }

  parseUrl(url: string): string {
    if (!url) return '';
    // Check if the input is a valid CID
    const isCID =
      /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58}|B[A-Z2-7]{58}|z[1-9A-HJ-NP-Za-km-z]{48}|F[0-9A-F]{50})$/.test(
        url,
      );

    if (isCID) {
      // If it's a CID, convert it to an IPFS gateway URL
      return `https://ipfs.io/ipfs/${url}`;
    }
    if (url.startsWith('ipfs://')) {
      // Convert IPFS URI to a gateway URL
      const cid = url.slice(7);
      return `https://ipfs.io/ipfs/${cid}`;
    }
    if (url.startsWith('ar://')) {
      // Convert Arweave URI to a gateway URL
      const id = url.slice(5);
      return `https://arweave.net/${id}`;
    }
    if (url.startsWith('data:')) {
      // Data URIs are returned as-is
      return url;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Assume HTTPS for URLs without a protocol
      return `https://${url}`;
    }
    // Return other URLs as-is
    return url;
  }
}
