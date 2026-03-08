import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SuggestionCard } from './index';

const meta: Meta<typeof SuggestionCard> = {
  component: SuggestionCard,
  title: 'Molecules/SuggestionCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '1',
    description: 'Adicione o mapa Lotus, eu amo esse mapa. Também amo ascent, mas Lotus é ok',
    postTitle: 'Como tirar inimigos dessa posição',
    postId: '123',
    email: 'reynalurker@outlook.com',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
};

export const WithoutPost: Story = {
  args: {
    id: '2',
    description: 'Seria legal adicionar mais mapas ao conteúdo',
    email: 'player@email.com',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
};
