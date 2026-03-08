**adr-000 — registro retroativo de decisões**
**data:** 2026-03
**contexto:** o projeto evoluiu desde 2021 sem adrs e parte da história ficou só nos commits e na mente dos desenvolvedores. Os desenvolvedores já usavam ADR's em outros projetos desde 2022, porém esse projeto ficou esquecido.
**decisão:** registrar adrs em 2026, inclusive retroativos, para preservar contexto, decisão e impacto.
**consequências:** melhor rastreabilidade técnica; algum contexto antigo pode ficar incompleto.

**adr-001 — adoção de eslint e prettier**
**data:** 2021-11
**contexto:** o projeto precisava reduzir inconsistência de código e melhorar revisão.
**decisão:** adotar eslint para qualidade estática e prettier para formatação automática.
**consequências:** código mais padronizado; mais regras e ajustes no fluxo de desenvolvimento.

**adr-002 — migração de react scripts para next.js**
**data:** 2022-01
**contexto:** a base inicial em react precisava evoluir estrutura, build e modelo de páginas.
**decisão:** migrar a aplicação para next.js.
**consequências:** melhor organização e capacidade de evolução; aumento de complexidade de configuração.

**adr-003 — adoção de testes e2e com cypress**
**data:** 2022-01
**contexto:** testes unitários não cobriam bem fluxos reais da aplicação.
**decisão:** adotar cypress para validar jornadas ponta a ponta.
**consequências:** maior confiança em fluxos críticos; suite mais lenta e mais custosa de manter.

**adr-004 — uso de storybook para documentar interface**
**data:** 2022-02
**contexto:** componentes reutilizáveis estavam crescendo e faltava isolamento para desenvolvimento visual.
**decisão:** adotar storybook como ambiente de documentação e validação de interface.
**consequências:** melhor reuso e visualização; mais custo de manutenção paralela.

**adr-005 — adoção de tailwind css e redução de style modules como padrão principal**
**data:** 2022-02
**contexto:** em 2021 o projeto usava style modules, mas o time buscava mais velocidade e consistência visual.
**decisão:** adotar tailwind css como estratégia principal de estilização.
**consequências:** ganho de produtividade e padronização; classes mais densas no markup e curva de aprendizado.

**adr-006 — reforço de qualidade com linting orientado a arquitetura e testes**
**data:** 2022-05
**contexto:** só eslint básico não cobria acessibilidade, promessas, duplicação, testes e qualidade estrutural.
**decisão:** expandir eslint com airbnb, jsx-a11y, sonarjs, promise, jest, testing-library, cypress, storybook e markdown.
**consequências:** regras mais abrangentes e prevenção de smells; maior rigidez e necessidade de exceções pontuais.

**adr-007 — observabilidade com sentry**
**data:** 2022-08
**contexto:** erros em produção precisavam de rastreabilidade além de logs locais e reprodução manual.
**decisão:** integrar sentry para captura e monitoramento de falhas.
**consequências:** melhor visibilidade operacional; dependência externa e necessidade de curadoria de eventos.

**adr-008 — adoção de next/core-web-vitals como base de lint do framework**
**data:** 2024-11
**contexto:** a aplicação já estava consolidada em next e precisava alinhar lint com práticas do framework.
**decisão:** usar next/core-web-vitals como base do conjunto de regras.
**consequências:** melhor aderência ao ecossistema next; possível conflito com regras herdadas de outras convenções.

**adr-009 — atualização da configuração do eslint para cjs**
**data:** 2025-04
**contexto:** a configuração precisava se manter compatível com o ambiente e a forma de carregamento usada no projeto.
**decisão:** ajustar o arquivo do eslint para cjs.
**consequências:** compatibilidade preservada; mais uma convenção técnica a manter.

**adr-010 — internacionalização como preocupação transversal**
**data:** 2025-01
**contexto:** o projeto começou a espalhar textos de interface por várias telas e componentes.
**decisão:** expandir i18n como base para telas, moléculas e fluxos principais.
**consequências:** melhor escalabilidade de conteúdo; maior disciplina para evitar textos hardcoded.

**adr-011 — evolução para design system modular com storybook e telas reutilizáveis**
**data:** 2024-12
**contexto:** a interface cresceu em atoms, molecules, screens e utilitários compartilhados.
**decisão:** consolidar uma organização orientada a design system com documentação e testes de componentes.
**consequências:** maior reuso e consistência; necessidade de governança sobre nomes, camadas e contratos.

**adr-012 — refatoração ampla da base para sustentação futura**
**data:** 2026-02
**contexto:** após anos de evolução incremental, a base acumulou ajustes, legados e convenções sobrepostas.
**decisão:** executar uma refatoração ampla para reorganizar a aplicação.
**consequências:** melhora de manutenção e coerência interna; risco temporário de regressões e diffs extensos.
