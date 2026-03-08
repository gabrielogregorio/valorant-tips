# ADR 0013: Definição da Estrutura de Pastas e Atomic Design

**Data:** 2026-03-08

## Contexto

O projeto precisava de uma estrutura clara para separar componentes visuais reaproveitáveis de lógicas de domínio complexas, evitando que a pasta de componentes se tornasse um emaranhado de lógicas de negócio.

## Decisão

Foi adotada a combinação de **Atomic Design** para a camada visual e **Feature-Based Architecture** para a logica de domínio:

1.  **Atomic Design (`src/components`)**: Os componentes foram organizados em `Atoms`, `Molecules` e `Organisms`. Eles devem ser o mais genéricos possível.
2.  **Features (`src/features`)**: Componentes que possuem forte acoplamento com o domínio do Valorant foram movidos para esta pasta. Cada subpasta representa uma funcionalidade completa.
3.  **Isolamento (`src/libs`)**: Dependências externas foram encapsuladas para facilitar manutenções futuras.
4.  **Compartilhamento (`src/shared`)**: Lógica pura e recursos globais foram centralizados.

## Consequências

- **Positivas**: Melhora a legibilidade, facilita o teste de componentes isolados e torna a remoção ou adição de novas funcionalidades muito mais rápida.
- **Negativas**: Exige uma pequena curva de aprendizado para novos desenvolvedores entenderem onde cada peça se encaixa.
