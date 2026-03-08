import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tag } from '.';

const meta = {
    title: 'Molecules/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Default Tag',
        active: false,
        disabled: false,
    },
};

export const Active: Story = {
    args: {
        children: 'Active Tag',
        active: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Tag',
        active: false,
        disabled: true,
    },
};
