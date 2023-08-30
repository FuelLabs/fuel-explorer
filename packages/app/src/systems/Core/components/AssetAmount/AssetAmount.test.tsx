import { testA11y, screen, render } from '@fuels/jest';
import { composeStory } from '@storybook/react';

import Meta, * as Stories from './AssetAmount.stories';

const Default = composeStory(Stories.Default, Meta);
const Full = composeStory(Stories.Full, Meta);
const Icons = composeStory(Stories.Icons, Meta);
const HideIcon = composeStory(Stories.HideIcon, Meta);

describe('Entityitem', () => {
  it('a11y', async () => {
    await testA11y(<Full />);
  });

  it('should render default properly', async () => {
    render(<Default />);

    expect(screen.getByText('0.001 ETH')).toBeInTheDocument();
    expect(screen.getByLabelText('Icon ArrowUp')).toBeInTheDocument();
  });

  it('should render in a full version', async () => {
    render(<Full />);
    expect(screen.getByText('0.000000001 ETH')).toBeInTheDocument();
  });

  it('should render both icons', async () => {
    render(<Icons />);
    expect(screen.getByLabelText('Icon ArrowUp')).toBeInTheDocument();
    expect(screen.getByLabelText('Icon ArrowDown')).toBeInTheDocument();
  });

  it('should hide icon', async () => {
    render(<HideIcon />);
    expect(() => screen.getByLabelText('Icon ArrowUp')).toThrow();
  });
});
