import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TitleAndSubtitle } from '.';

const meta = {
    title: 'Molecules/TitleAndSubtitle',
    component: TitleAndSubtitle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TitleAndSubtitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Escolhe um mapa ai Parça',
        subtitle: 'Confira as melhores dicas para cada mapa',
    },
};

export const OnlyTitle: Story = {
    args: {
        title: 'Escolhe um mapa ai Parça',
    },
};

export const LongText: Story = {
    args: {
        title: 'Este é um título extremamente longo para testar o comportamento do componente em telas menores ou com muito conteúdo',
        subtitle: 'E este é um subtítulo que também resolve ser prolixo para garantir que o layout centralizado e o espaçamento entre elementos continuem funcionando como o esperado pelo design system',
    },
};
