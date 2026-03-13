import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CardDash } from '.';

const meta = {
  title: 'Molecules/CardDash',
  component: CardDash,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardDash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-secondary',
  },
};

export const AccentRadiant: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-accent-radiant',
  },
};

export const AccentRose: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-accent-rose',
  },
};

export const AccentPurple: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-accent-purple',
  },
};

export const AccentPacificBlue: Story = {
  args: {
    title: 'POSTS CRIADOS',
    value: 37,
    className: 'bg-accent-pacific-blue',
  },
};
