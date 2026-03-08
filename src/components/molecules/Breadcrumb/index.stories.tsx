import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumb from './index';

const meta = {
    title: 'Molecules/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        entries: [
            { label: 'Home', href: '/' },
            { label: 'Maps', href: '/maps' },
            { label: 'Bind' },
        ],
    },
};

export const SingleEntry: Story = {
    args: {
        entries: [{ label: 'Home' }],
    },
};

export const LongList: Story = {
    args: {
        entries: [
            { label: 'Home', href: '/' },
            { label: 'Competitive', href: '/competitive' },
            { label: 'Maps', href: '/maps' },
            { label: 'Bind', href: '/maps/bind' },
            { label: 'Agents', href: '/maps/bind/agents' },
            { label: 'Jett', href: '/maps/bind/agents/jett' },
            { label: 'Tips' },
        ],
    },
};
