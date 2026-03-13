# ADR 0014: Padronização de DX e Organização de Rotas

**Data:** 2026-03-08

## Contexto

Para garantir consistência técnica e facilitar a manutenção, precisávamos definir padrões rígidos sobre onde a lógica mora e como os arquivos são nomeados.

## Decisão

1.  **Componentes como Index**: Para reduzir o número de arquivos e simplificar imports, a implementação do componente deve residir diretamente no `index.tsx` de sua pasta.
2.  **Hibridismo de Casing**:
    - Pastas organizacionais (ex: `atoms`, `auth`) em **lowercase**.
    - Pastas de componentes diretos (ex: `Button`, `LoginForm`) em **PascalCase**.
3.  **Pureza do `src/app`**: A pasta de rotas não deve conter lógica auxiliar. Componentes complexos usados em páginas devem morar em `src/features`.
4.  **Nomenclatura de Rotas**: Devem ser em `camelCase` ou palavra única.

## Consequências

- **Positivas**: Estrutura de rotas limpa, busca global de arquivos eficiente, e redução de boilerplate (`index.ts` desnecessários).
- **Negativas**: Exige movimentação de componentes existentes que violam essas regras.
