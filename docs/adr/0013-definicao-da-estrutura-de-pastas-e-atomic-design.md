# ADR 0013: Definição da Estrutura de Pastas e Atomic Design

**Data:** 2026-03-08

## Contexto

O projeto precisava de uma estrutura clara para separar componentes visuais reaproveitáveis de lógicas de domínio complexas, evitando que a pasta de componentes se tornasse um emaranhado de lógicas de negócio.

## Decisão

Foi adotada a combinação de **Atomic Design** para a camada visual e **Feature-Based Architecture** para a logica de domínio:

1.  **Atomic Design (`src/components`)**: Os componentes foram organizados em `atoms`, `molecules` e `organisms`. Eles devem ser o mais genéricos possível.

2.  **Features (`src/features`)**: Componentes com forte acoplamento com o domínio do Valorant foram movidos para esta pasta, organizados por funcionalidade (ex: `auth`, `posts`).
3.  **Hibridismo de Casing**: Pastas de categoria/organização são em minúsculo (`atoms`, `auth`) para segurança de SO; pastas de componentes diretos são em PascalCase (`Button/`, `AgentList/`) para rápida identificação de UI.
4.  **Nomenclatura Descritiva**: Preferimos nomes redundantes e explicativos (ex: `features/agents/AgentList`) em vez de genéricos (ex: `features/agents/List`). Isso melhora a busca global (DX) e a clareza do JSX.
5.  **Componente como Index**: Para reduzir verbosidade de arquivos, o componente principal deve ser o `index.tsx` dentro de sua pasta PascalCase, evitando arquivos de apenas re-export.
6.  **Isolamento (`src/libs`)**: Dependências externas foram encapsuladas para facilitar manutenções futuras.
7.  **Compartilhamento (`src/shared`)**: Lógica pura e recursos globais foram centralizados.

## Consequências

- **Positivas**: Melhora a legibilidade, facilita o teste de componentes isolados e torna a remoção ou adição de novas funcionalidades muito mais rápida.
- **Negativas**: Exige uma pequena curva de aprendizado para novos desenvolvedores entenderem onde cada peça se encaixa.
