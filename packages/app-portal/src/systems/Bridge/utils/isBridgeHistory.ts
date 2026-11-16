import { Routes } from 'app-commons';

/** True for the history route and anything below it, with or without a trailing slash. */
export function isBridgeHistory(pathname: string) {
  const history = Routes.bridgeHistory();
  return pathname === history || pathname.startsWith(`${history}/`);
}
