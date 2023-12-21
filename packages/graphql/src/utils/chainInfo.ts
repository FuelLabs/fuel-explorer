import { Provider } from 'fuels';

export async function getChainInfo(url: string) {
  const provider = await Provider.create(url);
  return provider.getChain();
}
