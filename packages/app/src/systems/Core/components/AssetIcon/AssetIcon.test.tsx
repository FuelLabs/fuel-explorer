import { testA11y, screen, render } from '@fuels/jest';
import { composeStory } from '@storybook/react';

import { SIZES_MAP } from './AssetIcon';
import Meta, {
  Sizes as SizesStory,
  Default as DefaultStory,
} from './AssetIcon.stories';

const Default = composeStory(DefaultStory, Meta);
const Sizes = composeStory(SizesStory, Meta);

describe('AssetIcon', () => {
  it('a11y', async () => {
    await testA11y(<Default />);
  });

  it('should render correclty', async () => {
    render(<Default />);
    expect(
      screen.getByRole('img', { name: /Ethereum Logo/ }),
    ).toBeInTheDocument();
  });

  it('should render with right sizes', async () => {
    render(<Sizes />);
    const assets = screen.getAllByRole('img');
    expect(assets[0]).toHaveAttribute('width', String(SIZES_MAP.sm));
    expect(assets[1]).toHaveAttribute('width', String(SIZES_MAP.md));
    expect(assets[2]).toHaveAttribute('width', String(SIZES_MAP.lg));
  });
});
