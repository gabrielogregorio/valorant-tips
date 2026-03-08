# Migrar axios para fetch

TRAZER DE VOLTA

commit lint
sentry
prettier
jest
coverage

<div align="center">

# Valorant tips

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)

</div>

<div align="center">

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/aa7397922b484be6943daaa86f16f919)](https://www.codacy.com/gh/gabrielogregorio/valorant-tips/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips&utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/aa7397922b484be6943daaa86f16f919)](https://www.codacy.com/gh/gabrielogregorio/valorant-tips/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips&utm_campaign=Badge_Coverage)

</div>

<div align="center">

![issues open](https://img.shields.io/github/issues/gabrielogregorio/valorant-tips.svg)
![issues closed](https://img.shields.io/github/issues-closed/gabrielogregorio/valorant-tips.svg)
![PR's open](https://img.shields.io/github/issues-pr/gabrielogregorio/valorant-tips.svg)
![PR's closed](https://img.shields.io/github/issues-pr-closed/gabrielogregorio/valorant-tips.svg)

kamban do projeto https://github.com/users/gabrielogregorio/projects/14

</div>

<div align="center">

<a href="https://valorant-tips.vercel.app/" target="blank">Access blog</a>

</div>

## Introduction this project

This project was developed using NextJs, Typescript and api is available at [vavatips-backend](https://github.com/gabrielogregorio/valorant-tips-api).

Access [Valorant tips](https://valorant-tips.vercel.app/) or [storybook](https://gabrielogregorio.github.io/valorant-tips/)

![](/home.png)

## Badges

![GitHub stars](https://img.shields.io/github/stars/gabrielogregorio/vavatips-frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/gabrielogregorio/vavatips-frontend?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/gabrielogregorio/vavatips-frontend)
![GitHub language count](https://img.shields.io/github/languages/count/gabrielogregorio/vavatips-frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/gabrielogregorio/vavatips-frontend) ![statements](./coverage/badge-statements.svg) ![branchs](./coverage/badge-branches.svg) ![functions](./coverage/badge-functions.svg) ![lines](./coverage/badge-lines.svg) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/aa7397922b484be6943daaa86f16f919)](https://www.codacy.com/gh/gabrielogregorio/valorant-tips/dashboard?utm_source=github.com&utm_medium=referral&utm_content=gabrielogregorio/valorant-tips&utm_campaign=Badge_Grade)

## Run Project for development

1.  Fully start the backend, available in the [vavatips backend](https://github.com/gabrielogregorio/vavatips-backend) repository.
2.  With the backend working, create an .env file, based on the .env.example file.

## Contributing with project

Read [Contributing.md](CONTRIBUTING.md)

## Available scripts

### Run

```bash
# Install full dependencies
yarn

# Ignore storybook dependencies, but resolve in lockfile.
yarn install --ignore-optional
# Run in develop mode
# Open in http://localhost:3000
yarn dev

## Run in production mode
yarn build
yarn start

# Run storybook in localhost:6006
yarn run storybook
```

### Tests

```bash
# Tests with react testing library and cypress(e2e)
yarn test
yarn cypress

# Tests in watch mode and coverage
yarn test:watch-all
yarn test:watch-all:coverage

```

### Deploy

```bash
# Deploy storybook to github pages
yarn run deploy-storybook-gh-pages
```

### Generics

```bash

# Check typescript, eslint, unit tests, integration tests, update badges, e2e tests and audit production
yarn dev
yarn check-all

# Prettier fix all
yarn prettier --write .

# Audit dependencies
yarn audit --groups "dependencies"

# Check libs not used
npx depcheck

# Uprade packages
yarn upgrade-interactive --latest
```

## Vscode extensions for this project

| Extension                 | Description                             | Author         |
| ------------------------- | --------------------------------------- | -------------- |
| Eslint                    | For linting code                        | Microsoft      |
| Prettier - Code formatter | For beautifully formate code            | Prettier       |
| Prettier Eslint           | Integration prettier and eslint         | Rebecca Vest   |
| Stylelint                 | For lint in styles                      | Stylelint      |
| Gitignore                 | For use .gitignore                      | CodeZombie     |
| EditorConfig for VS code  | For basics formatter in code            | EditorConfig   |
| Tailwind CSS IntelliSense | For highlight and autocomplete tailwind | Tailwind Labs  |
| TODO Highlight v2         | For highlight FIXME: and TODO:          | Jonathan Clark |

pnpm exec playwright test
Runs the end-to-end tests.

pnpm exec playwright test --ui
Starts the interactive UI mode.

pnpm exec playwright test --project=chromium
Runs the tests only on Desktop Chrome.

pnpm exec playwright test example
Runs the tests in a specific file.

pnpm exec playwright test --debug
Runs the tests in debug mode.

pnpm exec playwright codegen
Auto generate tests with Codegen.

We suggest that you begin by typing:

    pnpm exec playwright test

pnpm exec playwright test

pnpm exec playwright show-report

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Commits e Hooks de Git

Este projeto utiliza **Husky** e **Commitlint** para garantir que todas as mensagens de commit sigam o padrão de **Commits Semânticos** (Conventional Commits).

### Commits Semânticos

As mensagens de commit devem seguir o formato:
`<tipo>(escopo opcional): <descrição>`

Tipos comuns:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Alterações que não afetam o significado do código (espaço em branco, formatação, etc)
- `refactor`: Alteração de código que não corrige um bug nem adiciona uma funcionalidade
- `test`: Adição de testes ou correção de testes existentes
- `chore`: Alterações no processo de build ou ferramentas auxiliares

**Exemplo:** `feat(login): adicionar validação de senha`

### Hooks de Git

Os hooks são executados automaticamente:

- **pre-commit**: Roda o linting (`pnpm lint`) antes de cada commit.
- **commit-msg**: Valida se a mensagem do commit segue o padrão semântico.

Se você precisar rodar manualmente para testar:

- Linting: `pnpm lint`
- Commitlint (último commit): `pnpm commitlint --from HEAD~1 --to HEAD --verbose`
