import { route } from 'app-commons';

export const Routes = {
  bridge: route('/bridge'),
  bridgeFromTo: route<[from: string, to: string]>('/bridge?from=:from&to=:to'),
  bridgeHistory: route('/bridge/history'),
  ecosystem: route('/ecosystem'),
  nfts: route('/nfts'),
  blocks: route('/home/blocks'),
  statistics: route('/statistics'),
};
