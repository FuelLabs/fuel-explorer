import { expect, test } from '@playwright/test';

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ecosystem');
  });

  test('Open projects in a new tab', async ({ page, context }) => {
    await page.waitForSelector('[as="article"]');
    const projects = await page.locator('[as="article"]').all();

    for (const project of projects) {
      const [openPage] = await Promise.all([
        context.waitForEvent('page'),
        project.click(),
      ]);

      const pageLink = await project.getByRole('link').last();
      const href = (await pageLink.getAttribute('href')) || '';

      const newPage = await openPage;
      const openedPage = newPage.url();
      // create regex to get only the domain part of url, but excluding www. when it shows up
      const regex = /(?<=\/\/)(?:www\.)?([^\/]+)/;
      const openedPageDomain = openedPage.match(regex);
      const hrefDomain = href.match(regex);

      expect(openedPageDomain).toBe(hrefDomain);

      await newPage.close();
    }
  });
});
