import { type Address, type PublicClient, erc20Abi } from 'viem';

export const getTokenApprovalAmount = async ({
  publicClient,
  tokenAddress,
  spenderAddress,
  ownerAddress,
}: {
  publicClient: PublicClient;
  tokenAddress: Address;
  spenderAddress: Address;
  ownerAddress: Address | undefined;
}) => {
  if (!ownerAddress) return BigInt(0);

  return publicClient.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [ownerAddress, spenderAddress],
  });
};
