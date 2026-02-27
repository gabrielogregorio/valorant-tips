import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { Button, ButtonVariantEnum } from '.';
import { Icons } from '../../Atoms/Icons';

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
      options: Object.values(ButtonVariantEnum),
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: ButtonVariantEnum.Primary,
    children: 'Enviar Post',
    className: '',
  },
};

export const Secondary: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariantEnum),
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: ButtonVariantEnum.Secondary,
    children: 'Enviar Post',
    className: '',
  },
};

export const Text: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariantEnum),
    },
  },
  args: {
    leftIcon: <Icons.GearOutline className="h-[14px]" />,
    rightIcon: <Icons.OpenEyeOutline className="h-[14px]" />,
    disabled: false,
    onClick: fn(),
    variant: ButtonVariantEnum.Text,
    children: 'Enviar Post',
    className: '',
  },
};
