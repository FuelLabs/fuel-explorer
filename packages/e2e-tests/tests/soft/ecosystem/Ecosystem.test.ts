import { expect, test } from '@playwright/test';

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ecosystem');
  });

  test('Open projects in a new tab', async ({ page, context }) => {
    await page.waitForSelector('article');
    const projects = await page.locator('article').all();

    for (const project of projects) {
      const pageLink = await project.getByRole('link').last();
      const href = (await pageLink.getAttribute('href')) || '';
      const hrefDomain = new URL(href).hostname.replace(/^www\./, '');

      // skip domains that are not of project website
      if (!['twitter.com', 'github.com'].includes(hrefDomain)) {
        // open project in a new tab
        console.log(`opening project ${hrefDomain}`);
        project.click();
        const newPage = await context.waitForEvent('page');
        const openedDomain = new URL(newPage.url()).hostname;

        // verify the domain matches (allowing subdomain redirects like o2.app -> trade.o2.app)
        expect(
          openedDomain === hrefDomain ||
            openedDomain.endsWith(`.${hrefDomain}`),
        ).toBe(true);

        await newPage.close();
      }
    }
  });
});
