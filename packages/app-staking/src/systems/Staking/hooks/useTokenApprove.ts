import { useQueryClient } from '@tanstack/react-query';
import { FuelToken, TOKENS } from 'app-commons';
import { useEffect } from 'react';
import { type Address, erc20Abi } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { readContractQueryKey } from 'wagmi/query';

type TokenApproveData = {
  token: Address;
  spender: Address;
  amount: bigint;
  options?: {
    onSuccess?: (hash: Address) => void;
  };
};
const { token: tokenV2 } = TOKENS[FuelToken.V2];

export const useTokenApprove = (existingTxHash: Address | undefined) => {
  const {
    data: hash,
    isPending: isApproving,
    writeContract,
    error,
  } = useWriteContract();
  const txHash = existingTxHash ?? hash;
  const queryClient = useQueryClient();
  const { isLoading: isWaitingTokenApproval, isSuccess } =
    useWaitForTransactionReceipt({
      hash: txHash,
      query: {
        enabled: txHash?.startsWith('0x'),
      },
    });

  useEffect(() => {
    if (isSuccess) {
      const queryKey = readContractQueryKey({
        functionName: 'allowance',
        address: tokenV2,
      });
      queryClient.invalidateQueries({
        queryKey,
      });
    }
  }, [queryClient, isSuccess]);

  const approve = ({ token, spender, amount, options }: TokenApproveData) => {
    writeContract(
      {
        address: token,
        abi: erc20Abi,
        functionName: 'approve',
        args: [spender, amount],
      },
      options,
    );
  };

  return {
    approve,
    isApproving,
    isWaitingTokenApproval,
    isApprovalSuccess: isSuccess,
    error,
  };
};
