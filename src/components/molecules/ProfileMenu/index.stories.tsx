import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ProfileMenu } from '.';

const meta = {
  title: 'Molecules/ProfileMenu',
  component: ProfileMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Gabriel Gregorio',
    avatarUrl: 'https://github.com/gabrielogregorio.png',
    onEditProfile: fn(),
    onLogout: fn(),
  },
};

export const WithoutAvatar: Story = {
  args: {
    name: 'Gabriel Gregorio',
    onEditProfile: fn(),
    onLogout: fn(),
  },
};

export const SingleName: Story = {
  args: {
    name: 'Admin',
    onEditProfile: fn(),
    onLogout: fn(),
  },
};
