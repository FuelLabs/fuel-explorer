import { testA11y, screen, render, click } from '@fuels/jest';
import { composeStory } from '@storybook/react';

import Meta, {
  Default,
  Variations as VariationsStory,
} from './EntityItem.stories';

const Variations = composeStory(VariationsStory, Meta);

describe('Entityitem', () => {
  it('a11y', async () => {
    await testA11y(<Variations />);
  });

  it('should render two items', () => {
    render(<Variations />);
    expect(
      screen.getByRole('heading', { name: 'Ethereum' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Contract' }),
    ).toBeInTheDocument();
  });

  it('should copy address', async () => {
    render(<Variations />);
    const btn = screen.getAllByLabelText('Copy to clipboard')[0];
    expect(btn).toBeInTheDocument();

    await click(btn);
    expect(await navigator.clipboard.readText()).toBe(Default.args?.id);
  });
});
