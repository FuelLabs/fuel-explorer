import { getFooterLinks } from './footerLinks';

describe('getFooterLinks', () => {
  it('keeps every link in the regular build', () => {
    const labels = getFooterLinks(false).Environment.map((l) => l.label);
    expect(labels).toEqual(['Block Explorer', 'Ecosystem', 'Wallet', 'Bridge']);
  });

  it('drops the app.fuel.network links in explorer-only builds', () => {
    const labels = getFooterLinks(true).Environment.map((l) => l.label);
    expect(labels).toEqual(['Wallet']);
  });

  it('leaves the other columns alone in explorer-only builds', () => {
    const regular = getFooterLinks(false);
    const explorerOnly = getFooterLinks(true);
    expect(explorerOnly.FUEL).toEqual(regular.FUEL);
    expect(explorerOnly.GetStarted).toEqual(regular.GetStarted);
    expect(explorerOnly.Build).toEqual(regular.Build);
  });
});
