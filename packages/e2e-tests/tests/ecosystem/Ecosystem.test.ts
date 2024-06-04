import { expect, test } from '@playwright/test';

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ecosystem');
  });

  test('Open projects in a new tab', async ({ page, context }) => {
    await page.waitForSelector('article');
    const projects = await page.locator('article').all();

    for (const project of projects) {
      const [openPage] = await Promise.all([
        context.waitForEvent('page'),
        project.click(),
      ]);

      const pageLink = await project.getByRole('link').last();
      const href = await pageLink.getAttribute('href');

      const newPage = await openPage;
      const openedPage = newPage.url();

      expect(openedPage).toBe(href);

      await newPage.close();
    }
  });
});
