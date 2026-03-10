# Agent Instructions

Quando você receber uma tarefa, verifique se todos as SKILS citados foram encontrados. Caso você não encontre alguma delas, notifique e pare a tarefa imediatamente.

# Quais Skils usar dado um prompt?

Depende do prompt, você deve ter cuidado e escolher algumas skils que ajudem a resolver o problema. Não use todas, mas nunca deixe de usar uma skill que ajude a resolver o problema!

- documentation-templates
- documentation
- readme
- frontend-security-coder
- frontend-dev-guidelines
- nextjs-best-practices
- react-nextjs-development
- javascript-testing-patterns
- accessibility-compliance-accessibility-audit
- testing-guide
- docker-expert
- devops-deploy
- e2e-testing-patterns
- e2e-testing
- antigravity-design-expert
- ui-ux-pro-max
- commit

## Todos os acessos a .env devem ser centralizados em um arquivo global. Não devem haver acessos tipo process.env fora desse arquivo. Não saia buscando em todos os arquivos para achar isso, pergunte ao desenvolvedor onde está ele

## Gerenciador de Pacotes

Use o **pnpm**: `pnpm install`, `pnpm dev`, `pnpm test`, etc

## Sempre avalie a necessidade de usar useCallback

# Para execuções de scripts

Opte sempre por deixar os comandos de scripts no package.json, ao invés de espalhar comandos de terminal por todo o código e outros arquivos.

## Contexto e Arquitetura

Ao trabalhar neste projeto, não leia cegamente todas as configurações. Analise se estes arquivos são úteis para a sua tarefa e consulte-os, se necessário:

- **`package.json`**: Para dependências e scripts
- **`docs/adr/`**: Registros de Decisão de Arquitetura (ADRs) para contexto histórico
- **Configurações Globais/Estilos**: `tsconfig.json`, `.prettierrc.js`, `.editorconfig`, `src/app/tailwind.css`

## Zona de Perigo e Arquivos Proibidos

**NUNCA** leia os seguintes arquivos/diretórios. Eles consomem uma quantidade excessiva de tokens e não oferecem nenhum benefício.

- **Arquivos de bloqueio**: `pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`
- **Logs**: Quaisquer arquivos `.log`
- **Cache de compilação/dependências**: `node_modules/`, `.next/`, `build/`, `dist/`
- **Leitura Extensiva**: Evite ao máximo leitura intensiva de arquivos, tente abrir um arquivo, verifique o import, acesse pelo import, e assim por diante.

## Medidas de segurança

- **Confirmação necessária**: Se sua tarefa exigir a iteração/leitura de mais de 50 arquivos, **peça confirmação ao usuário**.
- **Exceções proibidas**: Se você considerar estritamente necessário o uso de um arquivo proibido (como um lock file para depurar a versão de uma dependência), solicite a permissão do usuário primeiro ou peça para ele verificar.

## Commits e segurança

- Jamais use comandos avançados co git, como rebase, reset, etc. Peça ajuda caso exista qualquer conflito. E Use apenas os comandos se solicitado explicitamente e não houver riscos associados.
- Não faça push para a branch main, e nem use comandos com o push -f.
- Sempre verifique as skils e as regras desse projeto

## Idéias gerais de codificação
