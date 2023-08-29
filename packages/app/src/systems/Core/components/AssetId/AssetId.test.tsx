import { testA11y, screen, render, click } from '@fuels/jest';
import { composeStory } from '@storybook/react';

import Meta, { Default as DefaultStory } from './AssetId.stories';

const Default = composeStory(DefaultStory, Meta);

describe('Entityitem', () => {
  it('a11y', async () => {
    await testA11y(<Default />);
  });

  it('should render correclty', async () => {
    const { container } = render(<Default />);
    const id = Default.args.id as string;
    expect(
      container.querySelector(`span[data-address="${id}"]`),
    ).toBeInTheDocument();
  });

  it('should copy address', async () => {
    render(<Default />);
    const btn = screen.getAllByLabelText('Copy to clipboard')[0];
    expect(btn).toBeInTheDocument();

    await click(btn);
    expect(await navigator.clipboard.readText()).toBe(Default.args?.id);
  });
});
