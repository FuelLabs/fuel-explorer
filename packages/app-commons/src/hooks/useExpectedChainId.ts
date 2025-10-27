import { useConfig } from 'wagmi';

export const useExpectedChainId = (): number => {
  const config = useConfig();
  return config.chains[0].id;
};
