import { expect, test } from '@playwright/test';

const LOCAL_HOSTS = ['127.0.0.1', 'localhost'];
// Links to a project's social profiles, not its website.
const SOCIAL_HOSTS = [
  'twitter.com',
  'x.com',
  'github.com',
  'discord.gg',
  'discord.com',
];
const PROJECT_PAGE = /^\/ecosystem\/[^/?#]+$/;
// The project list is fetched from GitHub, so the first paint can take a while.
const LIST_TIMEOUT = 30_000;
const PROJECTS_TO_CHECK = 5;

function hostOf(href: string) {
  return new URL(href).hostname.replace(/^www\./, '');
}

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ context, page }) => {
    // Project sites are third-party and go offline or redirect over time.
    // Answer every request outside the app with a stub so the test only
    // checks that the project page opens the project's URL in a new tab.
    await context.route(
      (url) =>
        !LOCAL_HOSTS.includes(url.hostname) &&
        url.hostname !== 'raw.githubusercontent.com',
      (route) =>
        route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<html><body>stub</body></html>',
        }),
    );
    await page.goto('/ecosystem');
  });

  test('A project card opens its project page', async ({ page }) => {
    const cards = page.locator('a[href^="/ecosystem/"]');
    await expect(cards.first()).toBeVisible({ timeout: LIST_TIMEOUT });

    const card = cards.first();
    const href = (await card.getAttribute('href')) ?? '';
    expect(href).toMatch(PROJECT_PAGE);
    const name = (await card.locator('h3').innerText()).trim();

    await card.click();

    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
  });

  test('A project page opens the project website in a new tab', async ({
    page,
    context,
  }) => {
    const cards = page.locator('a[href^="/ecosystem/"]');
    await expect(cards.first()).toBeVisible({ timeout: LIST_TIMEOUT });

    const hrefs: string[] = [];
    for (const card of await cards.all()) {
      const href = (await card.getAttribute('href')) ?? '';
      if (PROJECT_PAGE.test(href) && !hrefs.includes(href)) hrefs.push(href);
    }
    expect(hrefs.length).toBeGreaterThan(0);

    let checked = 0;
    for (const href of hrefs.slice(0, PROJECTS_TO_CHECK)) {
      await page.goto(href);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

      const links = page.locator('dl a[target="_blank"][href^="http"]');
      // Some projects list no website, only social links.
      const site = (await links.all())[0];
      if (!site) continue;
      const siteHref = (await site.getAttribute('href')) ?? '';
      if (SOCIAL_HOSTS.includes(hostOf(siteHref))) continue;

      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        site.click(),
      ]);
      await newPage.waitForLoadState('domcontentloaded');
      expect(hostOf(newPage.url())).toBe(hostOf(siteHref));
      await newPage.close();
      checked++;
    }

    expect(checked).toBeGreaterThan(0);
  });
});
