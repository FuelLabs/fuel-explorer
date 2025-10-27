import type { WriteContractErrorType } from 'wagmi/actions';

export const getShortError = (
  error: WriteContractErrorType | Error | string | null | undefined,
): string => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') return error;

  if ('shortMessage' in error) {
    return error.shortMessage;
  }

  return error?.message;
};
