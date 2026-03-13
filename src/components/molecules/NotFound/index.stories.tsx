import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotFound } from '.';

const meta = {
  title: 'Molecules/NotFound',
  component: NotFound,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: '',
  },
};
