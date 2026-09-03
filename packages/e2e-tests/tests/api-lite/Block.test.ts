import { expect, test } from '@playwright/test';
import { cardInfoText, goToLatestBlock } from './helpers';

test.describe('Block page (api-lite)', () => {
  test('shows the height and the producer for the latest block', async ({
    page,
  }) => {
    const { height } = await goToLatestBlock(page);

    const heightText = await cardInfoText(page, 'Height');
    expect(heightText).toContain(String(height));

    const producerText = await cardInfoText(page, 'Producer');
    expect(producerText.replace('Producer', '').trim().length).toBeGreaterThan(
      0,
    );
  });
});
