# ADR 0015: Adoção de Auditoria Automatizada de Acessibilidade (A11y)

## Status

Aceito

## Contexto

Para garantir que o projeto seja inclusivo e atenda aos padrões modernos de web (WCAG), precisamos de uma forma sistemática de validar a acessibilidade da interface, evitando regressões e garantindo qualidade para todos os usuários.

## Decisão

Decidimos implementar uma pipeline de acessibilidade composta por:

1. **Auditoria de Componentes:** Uso de `jest-axe` com Vitest para validar o DOM gerado por componentes individuais.
2. **Auditoria End-to-End:** Uso de `@axe-core/playwright` para auditorias em páginas completas e fluxos de usuário.
3. **Automação (CI):** Execução automática dessas validações em Pull Requests via GitHub Actions.

## Consequências

- **Positivas:** Detecção precoce de problemas de contraste, labels ausentes, estrutura de ARIA incorreta e outros erros comuns de acessibilidade. Melhoria na qualidade do código e na experiência do usuário final.
- **Negativas:** Pequeno aumento no tempo de execução da pipeline de CI devido à instalação do Playwright e execução dos testes.
