import { type Page, expect } from '@playwright/test';

/**
 * Home page's "Recent Blocks" tile links to `/block/:height/simple`. Reading
 * the first link's href is the cheapest way to get a real, currently-indexed
 * block height without depending on any transaction the bridge e2e suite may
 * or may not have produced.
 */
export async function getLatestBlockHeightFromHome(page: Page): Promise<{
  height: number;
  href: string;
}> {
  await page.goto('/');
  const blockLink = page.locator('a[href^="/block/"]').first();
  await blockLink.waitFor({ state: 'visible' });
  const href = await blockLink.getAttribute('href');
  if (!href) throw new Error('Recent Blocks link has no href');
  const match = href.match(/^\/block\/(\d+)\/simple$/);
  if (!match) throw new Error(`Unexpected block link href: ${href}`);
  return { height: Number(match[1]), href };
}

/**
 * Text of the CardInfo card whose label is `label` (e.g. "Height", "Producer").
 *
 * CardInfo renders its label (name) unconditionally, but the value below it
 * sits behind its own LoadingWrapper -- so right after navigation the label
 * can be visible while the card's only text is still just the label itself
 * (the value's LoadingWrapper hasn't swapped from its skeleton to the real
 * value yet). Wait for the card's text to actually change before reading it.
 */
export async function cardInfoText(
  page: Page,
  label: string,
  timeout = 15_000,
): Promise<string> {
  const heading = page.getByText(label, { exact: true });
  await heading.waitFor({ state: 'visible' });
  const card = heading.locator('xpath=..');
  await expect(card).not.toHaveText(label, { timeout });
  return (await card.textContent()) ?? '';
}

/** Navigates home -> latest block's simple view, returning its height. */
export async function goToLatestBlock(page: Page): Promise<{ height: number }> {
  const { height, href } = await getLatestBlockHeightFromHome(page);
  await page.locator(`a[href="${href}"]`).first().click();
  await page.waitForURL(new RegExp(`/block/${height}/simple$`));
  return { height };
}
