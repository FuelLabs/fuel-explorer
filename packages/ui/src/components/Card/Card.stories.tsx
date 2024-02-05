import type { Meta, StoryObj } from '@storybook/react';
import { IconCalendar } from '@tabler/icons-react';

import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Usage: Story = {
  render: () => (
    <Card className="max-w-sm">
      <Card.Body>Hello world from Fuel</Card.Body>
    </Card>
  ),
};

export const FullVersion: Story = {
  render: () => (
    <Card className="max-w-sm">
      <Card.Header>
        <Card.Title>
          <Icon icon={IconCalendar} />
          Calendar
        </Card.Title>
        <Card.Description>This is a subtitle</Card.Description>
      </Card.Header>
      <Card.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate
        rutrum est non sollicitudin. Donec tortor ligula, bibendum ac luctus ac,
        efficitur a sem.
      </Card.Body>
      <Card.Footer>
        <Button color="gray" variant="ghost">
          Cancel
        </Button>
        <Button variant="solid">Submit</Button>
      </Card.Footer>
    </Card>
  ),
};

export const AsChild: Story = {
  name: 'AsChild',
  render: () => (
    <Card asChild className="max-w-sm">
      <section>
        <Card.Body>Hello world from Fuel</Card.Body>
      </section>
    </Card>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Card as="section" className="max-w-sm">
      <Card.Body>Hello world from Fuel</Card.Body>
    </Card>
  ),
};
