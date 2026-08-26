import { expect, test } from '@playwright/test';

const LOCAL_HOSTS = ['127.0.0.1', 'localhost'];

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ context, page }) => {
    // Project sites are third-party and go offline or redirect over time.
    // Answer every request outside the app with a stub so the test only
    // checks that the card opens the project's URL in a new tab.
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

  test('Open projects in a new tab', async ({ page, context }) => {
    await page.waitForSelector('article');
    const projects = await page.locator('article').all();
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      const pageLink = project.getByRole('link').last();
      const href = (await pageLink.getAttribute('href')) || '';
      const hrefDomain = new URL(href).hostname.replace(/^www\./, '');

      // skip domains that are not of project website
      if (!['twitter.com', 'github.com'].includes(hrefDomain)) {
        const [newPage] = await Promise.all([
          context.waitForEvent('page'),
          project.click(),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        const openedDomain = new URL(newPage.url()).hostname.replace(
          /^www\./,
          '',
        );

        expect(openedDomain).toBe(hrefDomain);

        await newPage.close();
      }
    }
  });
});
