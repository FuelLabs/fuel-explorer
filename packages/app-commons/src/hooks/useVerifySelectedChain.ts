import { useCallback, useRef } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { ETH_CHAIN_NAME } from '../constants/chainName';
import { useExpectedChainId } from './useExpectedChainId';

export function useVerifySelectedChain() {
  const { chainId: currentChainId } = useAccount();
  const expectedChainId = useExpectedChainId();

  const isExpectedChain =
    !currentChainId || Number(currentChainId) === expectedChainId;

  const { switchChainAsync } = useSwitchChain();

  const isValidatingRef = useRef(false);

  const validateChain = useCallback(async () => {
    if (isValidatingRef.current || isExpectedChain) {
      return false;
    }

    isValidatingRef.current = true;
    try {
      await switchChainAsync({ chainId: expectedChainId });
    } catch (_e) {
      isValidatingRef.current = false;
      throw new Error(`Please switch to ${ETH_CHAIN_NAME} network.`);
    } finally {
      isValidatingRef.current = false;
    }
    return true;
  }, [isExpectedChain, switchChainAsync, expectedChainId]);

  return {
    validateChain,
    expectedChainId,
    isChainSupported: isExpectedChain,
  };
}
