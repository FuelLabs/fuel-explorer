import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { Nav } from "./Nav";

const meta: Meta<typeof Nav> = {
  title: "Layout/Nav",
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Nav>;

const ACCOUNT =
  "fuel10va6297tkerdcn5u8mxjm9emudsmkj85pq5x7t7stkmzmc4nvs3qvn99qz";

const NETWORK = {
  id: "1",
  name: "Mainnet",
  url: "https://mainnet.fuel.sh",
};

export const Usage: Story = {
  render: () => (
    <Nav account={ACCOUNT} network={NETWORK}>
      <Nav.Desktop>
        <Nav.Logo />
        <Nav.Menu>
          <Nav.MenuItem isActive href="#">
            Developers
          </Nav.MenuItem>
          <Nav.MenuItem href="#">Community</Nav.MenuItem>
          <Nav.MenuItem isExternal href="#">
            Labs
          </Nav.MenuItem>
        </Nav.Menu>
        <Nav.Spacer />
        <Nav.Menu>
          <Nav.MenuItem href="#">Bridge</Nav.MenuItem>
          <Nav.MenuItem href="#">Explorer</Nav.MenuItem>
          <Nav.MenuItem href="#">Ecosystem</Nav.MenuItem>
        </Nav.Menu>
        <Nav.ThemeToggle />
        <Nav.Connection />
      </Nav.Desktop>
    </Nav>
  ),
};

export const NoConnection: Story = {
  render: () => (
    <Nav onConnect={action("onConnect")}>
      <Nav.Desktop>
        <Nav.Logo />
        <Nav.Menu>
          <Nav.MenuItem isActive href="#">
            Developers
          </Nav.MenuItem>
          <Nav.MenuItem href="#">Community</Nav.MenuItem>
          <Nav.MenuItem isExternal href="#">
            Labs
          </Nav.MenuItem>
        </Nav.Menu>
        <Nav.Spacer />
        <Nav.Menu>
          <Nav.MenuItem href="#">Bridge</Nav.MenuItem>
          <Nav.MenuItem href="#">Explorer</Nav.MenuItem>
          <Nav.MenuItem href="#">Ecosystem</Nav.MenuItem>
        </Nav.Menu>
        <Nav.ThemeToggle />
        <Nav.Connection />
      </Nav.Desktop>
    </Nav>
  ),
};

export const Mobile: Story = {
  render: () => (
    <Nav account={ACCOUNT} network={NETWORK}>
      <Nav.Mobile>
        <Nav.MobileContent>
          <Nav.Logo />
          <Nav.ThemeToggle />
          <Nav.Connection />
        </Nav.MobileContent>
        <Nav.Menu>
          <Nav.MenuItem isActive href="#">
            Developers
          </Nav.MenuItem>
          <Nav.MenuItem href="#">Community</Nav.MenuItem>
          <Nav.MenuItem isExternal href="#">
            Labs
          </Nav.MenuItem>
          <Nav.MenuItem href="#">Bridge</Nav.MenuItem>
          <Nav.MenuItem href="#">Explorer</Nav.MenuItem>
          <Nav.MenuItem href="#">Ecosystem</Nav.MenuItem>
        </Nav.Menu>
      </Nav.Mobile>
    </Nav>
  ),
  parameters: {
    viewport: {
      defaultViewport: "iphonex",
    },
  },
};
