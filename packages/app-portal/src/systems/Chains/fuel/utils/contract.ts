import { zeroPadValue } from 'ethers';
import { ZeroBytes32, concat, sha256 } from 'fuels';

export function getContractTokenId(
  contractId: `0x${string}`,
  erc20Address: `0x${string}`,
  tokenId = ZeroBytes32,
) {
  const subId = sha256(concat([zeroPadValue(erc20Address, 32), tokenId]));
  const assetId = sha256(concat([contractId, subId]));

  return assetId;
}
