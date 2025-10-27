import { useConfig } from 'wagmi';

export const useExpectedChainName = (): string => {
  const config = useConfig();
  return config.chains[0].name;
};
