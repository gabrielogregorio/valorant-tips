import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { CheckboxBase } from '.';

const meta = {
  title: 'Molecules/CheckboxBase',
  component: CheckboxBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: false,
    onClick: fn(),
    onChange: fn(),
    id: 'example',
    label: 'SEU NOME',
    isChecked: true,
    autoComplete: 'off',
    errorMessage: '',
    name: 'example',
    placeholder: 'Digite o seu nome',
    isOptional: true,
    className: '',
  },
};

export const NotChecked: Story = {
  args: {
    disabled: false,
    onClick: fn(),
    onChange: fn(),
    id: 'example',
    label: 'SEU NOME',
    isChecked: false,
    autoComplete: 'off',
    errorMessage: '',
    name: 'example',
    placeholder: 'Digite o seu nome',
    isOptional: true,
    className: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onClick: fn(),
    onChange: fn(),
    id: 'example',
    label: 'SEU NOME',
    isChecked: true,
    autoComplete: 'off',
    errorMessage: '',
    name: 'example',
    placeholder: 'Digite o seu nome',
    isOptional: true,
    className: '',
  },
};
