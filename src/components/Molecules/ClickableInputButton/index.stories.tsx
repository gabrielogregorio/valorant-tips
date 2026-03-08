import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ClickableInputButton } from '.';
import { Icons } from '@/Atoms/Icons';

const meta = {
  title: 'Molecules/ClickableInputButton',
  component: ClickableInputButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ClickableInputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'select',
      options: Object.values(Icons),
    },
  },
  args: {
    icon: 'OpenEyeOutline',
    onClick: fn(),
    ariaLabel: '',
    disabled: false,
    className: '',
  },
};
