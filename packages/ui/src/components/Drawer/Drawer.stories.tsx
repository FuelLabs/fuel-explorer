import type { Meta, StoryObj } from '@storybook/react';

import { HStack, VStack } from '../Box';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import type { DrawerContentProps } from './Drawer';
import { Drawer } from './Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Overlay/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

function Content(props?: DrawerContentProps) {
  return (
    <Drawer.Content {...props}>
      <Drawer.Header>
        <Drawer.Title>Edit profile</Drawer.Title>
        <Drawer.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Drawer.Description>
      </Drawer.Header>
      <Drawer.Body asChild>
        <VStack>
          <VStack gap="2">
            <label htmlFor="name">Name</label>
            <Input>
              <Input className="w-full" id="name" value="Pedro Duarte" />
            </Input>
          </VStack>
          <VStack gap="2">
            <label htmlFor="username">Username</label>
            <Input>
              <Input className="col-span-3" id="username" value="@peduarte" />
            </Input>
          </VStack>
        </VStack>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.Close>
          <Button type="submit">Save changes</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  );
}

export const Usage: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger>
        <Button variant="solid">Open</Button>
      </Drawer.Trigger>
      <Content />
    </Drawer>
  ),
};

export const Position: Story = {
  render: () => (
    <HStack>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Top</Button>
        </Drawer.Trigger>
        <Content side="top" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Left</Button>
        </Drawer.Trigger>
        <Content side="left" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Bottom</Button>
        </Drawer.Trigger>
        <Content side="bottom" />
      </Drawer>
      <Drawer>
        <Drawer.Trigger>
          <Button variant="solid">Right</Button>
        </Drawer.Trigger>
        <Content side="right" />
      </Drawer>
    </HStack>
  ),
};
