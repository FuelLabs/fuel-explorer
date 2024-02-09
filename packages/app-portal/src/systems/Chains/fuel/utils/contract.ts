import { ZeroBytes32, arrayify, concatBytes, hash } from 'fuels';

export function getContractTokenId(
  contractId: `0x${string}`,
  subId = ZeroBytes32,
) {
  const byteContract = arrayify(contractId);
  const byteSubId = arrayify(subId);
  return hash(concatBytes([byteContract, byteSubId]));
}
