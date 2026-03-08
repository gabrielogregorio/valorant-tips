import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SelectableCard } from './index';

const meta: Meta<typeof SelectableCard> = {
  component: SelectableCard,
  title: 'Molecules/SelectableCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockImage = 'https://images.unsplash.com/photo-1516594798267-6b6b332c8e50?w=200&h=200&fit=crop';

export const Default: Story = {
  args: {
    id: '1',
    image: mockImage,
    name: 'Sova',
    onClick: () => console.log('Card clicado'),
  },
};

export const Selected: Story = {
  args: {
    id: '1',
    image: mockImage,
    name: 'Sova',
    isSelected: true,
    onClick: () => console.log('Card clicado'),
  },
};

export const SmallSize: Story = {
  args: {
    id: '1',
    image: mockImage,
    name: 'Sova',
    size: 'sm',
    onClick: () => console.log('Card clicado'),
  },
};

export const LargeSize: Story = {
  args: {
    id: '1',
    image: mockImage,
    name: 'Sova',
    size: 'lg',
    onClick: () => console.log('Card clicado'),
  },
};
