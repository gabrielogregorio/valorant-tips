import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button } from '.';
import { Icons } from '@/atoms/Icons';

const meta = {
  title: 'Molecules/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: 'primary',
    children: 'Enviar Post',
    className: '',
  },
};

export const Secondary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: 'secondary',
    children: 'Enviar Post',
    className: '',
  },
};

export const Text: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text'],
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: 'text',
    children: 'Enviar Post',
    className: '',
  },
};
