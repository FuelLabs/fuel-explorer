import { route } from './utils';

export const Routes = {
  account: route<[id: string, tab: string]>('/account/:id/:tab'),
  bridge: route('/bridge'),
  bridgeFromTo: route<[from: string, to: string]>('/bridge?from=:from&to=:to'),
  bridgeHistory: route('/bridge/history'),
  ecosystem: route('/ecosystem'),
  txLoading: route<[id: string]>('/tx/:id/loading'),
  txSimple: route<[id: string]>('/tx/:id/simple'),
  txAdvanced: route<[id: string]>('/tx/:id/advanced'),
};
