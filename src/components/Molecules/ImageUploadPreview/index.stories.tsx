import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageUploadPreview } from './ImageLoad';

const meta: Meta<typeof ImageUploadPreview> = {
  component: ImageUploadPreview,
  title: 'Molecules/ImageUploadPreview',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    onImageSelect: (file: File) => console.log('Imagem selecionada:', file),
    onImageRemove: () => console.log('Imagem removida'),
    label: 'Clique para escolher uma imagem',
  },
};

export const WithImage: Story = {
  args: {
    onImageSelect: (file: File) => console.log('Imagem selecionada:', file),
    onImageRemove: () => console.log('Imagem removida'),
    currentImage: 'https://images.unsplash.com/photo-1516594798267-6b6b332c8e50?w=400&h=300&fit=crop',
  },
};
