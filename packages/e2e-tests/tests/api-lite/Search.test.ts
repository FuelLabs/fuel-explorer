import { expect, test } from '@playwright/test';
import { getLatestBlockHeightFromHome } from './helpers';

test.describe('Search (api-lite)', () => {
  test('finds a block by height and navigates to it', async ({ page }) => {
    const { height } = await getLatestBlockHeightFromHome(page);

    // The header renders both a desktop and a mobile search input (only
    // one visible at a time via CSS), so the placeholder alone is ambiguous.
    const searchInput = page
      .getByPlaceholder('Search by block, transaction, contract, address...')
      .and(page.locator(':visible'));
    await searchInput.fill(String(height));
    await searchInput.press('Enter');

    // SearchResultDropdown renders a "Block Height" label immediately
    // followed by the Dropdown.Item holding the link to the block.
    const label = page.getByText('Block Height', { exact: true });
    await expect(label).toBeVisible();
    const link = label
      .locator('xpath=following-sibling::*[1]')
      .getByRole('link');
    await expect(link).toBeVisible();
    await link.click();

    await expect(page).toHaveURL(new RegExp(`/block/${height}/simple$`));
  });
});
