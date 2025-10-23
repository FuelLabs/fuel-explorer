import { expect, test } from '@playwright/test';

test.describe('Ecosystem', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ecosystem');
  });

  test('Open projects in a new tab', async ({ page, context }) => {
    await page.waitForSelector('article');
    const projects = await page.locator('article').all();

    for (const project of projects) {
      // regex to get only the domain part of url, but excluding "www." when it shows up
      const regex = /(?<=\/\/)(?:www\.)?([^\/]+)/;
      const pageLink = await project.getByRole('link').last();
      const href = (await pageLink.getAttribute('href')) || '';
      const hrefDomain = href.match(regex)?.[1] || '';

      // skip domain that are not of project website
      if (['twitter.com', 'github.com'].indexOf(hrefDomain) === -1) {
        // open project in a new tab
        console.log(`opening project ${hrefDomain}`);
        project.click();
        const newPage = await context.waitForEvent('page');
        const openedPage = newPage.url();
        const openedPageDomain = openedPage.match(regex)?.[1];

        // verify if the domain opened in new page is the same of the link that user has clicked
        expect(openedPageDomain).toBe(hrefDomain);

        await newPage.close();
      }
    }
  });
});
