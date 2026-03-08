import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { ClickableInputButton } from '.';
import { Icons } from '../../atoms/Icons';

const meta = {
    title: 'Molecules/ClickableInputButton',
    component: ClickableInputButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        icon: {
            control: 'select',
            options: Object.keys(Icons),
        },
    },
} satisfies Meta<typeof ClickableInputButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        icon: 'AddOutline',
        ariaLabel: 'Add item',
        onClick: fn(),
    },
};

export const Disabled: Story = {
    args: {
        icon: 'XOutline',
        ariaLabel: 'Delete item',
        disabled: true,
        onClick: fn(),
    },
};

export const VisibilityToggle: Story = {
    args: {
        icon: 'OpenEyeOutline',
        ariaLabel: 'Hide item',
        onClick: fn(),
    },
};
