import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EditableTag } from './index';

const meta: Meta<typeof EditableTag> = {
  component: EditableTag,
  title: 'Molecules/EditableTag',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    label: 'Posição',
    value: 'A Site',
    onUpdate: (id, value) => console.log(id, value),
    canDelete: true,
    canHide: true,
  },
};

export const ViewOnly: Story = {
  args: {
    id: '1',
    label: 'Habilidade',
    value: 'Sova Recon Bolt',
    onUpdate: (id, value) => console.log(id, value),
    canDelete: false,
  },
};

export const Hidden: Story = {
  args: {
    id: '1',
    label: 'Habilidade',
    value: 'Sova Recon Bolt',
    onUpdate: (id, value) => console.log(id, value),
    isVisible: false,
  },
};
