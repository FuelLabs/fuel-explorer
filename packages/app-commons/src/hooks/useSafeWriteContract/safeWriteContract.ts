import type {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  PublicClient,
  WalletClient,
  WriteContractParameters,
  WriteContractReturnType,
} from 'viem';
import { writeContract } from 'viem/actions';
import { ETH_CHAIN } from '../../chains';
import { ContractPausedError } from '../../errors/ContractPausedError';
import { getPausedContracts } from '../usePausedContract/getPausedContracts';
import type { SafeWriteConditions } from './types';

// This is official viem implementation of "writeContract" to infer ABIs properly
// https://github.com/wevm/viem/blob/main/src/actions/wallet/writeContract.ts#L47-L91
interface SafeWriteContractParams<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
> {
  conditions?: SafeWriteConditions;
  client: {
    public: PublicClient | undefined;
    wallet: WalletClient | undefined;
  };
  write: Pick<
    WriteContractParameters<abi, functionName, args>,
    'address' | 'abi' | 'functionName' | 'args' | 'value'
  >;
}

export async function safeWriteContract<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
>({
  client,
  conditions,
  write,
}: SafeWriteContractParams<
  abi,
  functionName,
  args
>): Promise<WriteContractReturnType> {
  if (!client.public || !client.wallet) {
    throw new Error('Client not found in safeWriteContract');
  }

  if (!client.wallet.account) {
    throw new Error('Account not connected');
  }

  // Default and extra pauser check
  const pauserAddresses: Address[] = [write.address];
  if (conditions?.pauser?.length) {
    pauserAddresses.push(...conditions.pauser);
  }

  // Get all paused contracts
  const pausers = await getPausedContracts(client.public, pauserAddresses);
  if (pausers.length > 0) {
    throw new ContractPausedError();
  }

  return writeContract(client.wallet, {
    chain: ETH_CHAIN,
    account: client.wallet.account,
    address: write.address,
    abi: write.abi,
    functionName: write.functionName,
    value: write.value,
    args: write.args,
  } as WriteContractParameters<abi, functionName, args>);
}
