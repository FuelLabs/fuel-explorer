import { route } from '~/systems/Core/utils/route';

export const Pages = {
  home: route('/?page=:page'),
  txSimple: route('/tx/:id/simple'),
  txAdvanced: route('/tx/:id/advanced'),
  blockSimple: route('/block/:id/simple'),
  blockAdvanced: route('/block/:id/advanced'),
  accountAssets: route('/account/:id/assets'),
  accountTxs: route('/account/:id/transactions'),
  accountPredicate: route('/account/:id/predicate'),
  contractAssets: route('/contract/:id/assets'),
  contractCode: route('/contract/:id/code'),
};
