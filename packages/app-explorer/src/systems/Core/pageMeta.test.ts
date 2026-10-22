import { applyPageMeta, escapeHtml, matchPageMeta } from './pageMeta';

describe('matchPageMeta', () => {
  it('matches the bridge history page before the bridge page', () => {
    expect(matchPageMeta('/bridge/history').key).toBe('bridge_history');
    expect(matchPageMeta('/bridge').key).toBe('bridge');
    expect(matchPageMeta('/bridge/').key).toBe('bridge');
  });

  it('matches /blocks before /block and reads the height', () => {
    expect(matchPageMeta('/blocks').key).toBe('blocks');
    const block = matchPageMeta('/block/123/simple');
    expect(block.key).toBe('block');
    expect(block.params).toEqual({ height: '123' });
    expect(block.title).toBe('Block 123 · Fuel Explorer');
  });

  it('needs a path boundary', () => {
    expect(matchPageMeta('/bridgefoo').key).toBe('home');
    expect(matchPageMeta('/stakingx').key).toBe('home');
  });

  it('is case sensitive', () => {
    expect(matchPageMeta('/Bridge').key).toBe('home');
  });

  it('ignores the query string', () => {
    expect(matchPageMeta('/ecosystem?tag=defi').key).toBe('ecosystem');
  });

  it('falls back to the home meta', () => {
    expect(matchPageMeta('/').key).toBe('home');
    expect(matchPageMeta('/unknown').title).toBe('Fuel Explorer');
  });
});

describe('escapeHtml', () => {
  it('escapes the characters that can leave an attribute', () => {
    expect(escapeHtml('a&b<c>"d')).toBe('a&amp;b&lt;c&gt;&quot;d');
  });
});

describe('applyPageMeta', () => {
  const html =
    '<title>__PAGE_TITLE__</title><meta property="og:url" content="__PAGE_URL__" /><meta name="description" content="__PAGE_DESCRIPTION__" />';

  it('fills the tokens and escapes the url', () => {
    const out = applyPageMeta(html, '/tx/abc', 'https://x.test/a?b="1"');
    expect(out).toContain('<title>Transaction · Fuel Explorer</title>');
    expect(out).toContain('https://x.test/a?b=&quot;1&quot;');
    expect(out).not.toContain('__PAGE_');
  });

  it('drops the og:url tag when there is no url', () => {
    const out = applyPageMeta(html, '/', '');
    expect(out).not.toContain('og:url');
  });
});
