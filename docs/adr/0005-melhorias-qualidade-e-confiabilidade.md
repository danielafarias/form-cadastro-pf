# ADR 0005 - Melhorias de qualidade e confiabilidade do fluxo de desenvolvimento

- **Status:** Pendente
- **Data:** 2026-04-22

## Contexto

O projeto ja possui base funcional, testes unitarios e estrutura de componentes em evolucao.

Para aumentar confiabilidade, reduzir friccao no time e evitar regressao, e necessario fortalecer o processo de qualidade continua no ciclo de desenvolvimento.

Atualmente, existem oportunidades de melhoria em tres frentes:

- Padronizacao automatica de formatacao de codigo.
- Validacoes automaticas antes de commits.
- Testes ponta a ponta cobrindo jornada real do formulario.

## Decisao

Foi decidido registrar e planejar a adocao das seguintes melhorias:

1. **Automatizacao de formatacao com Prettier**
2. **Validacoes de commit com Husky (hooks de pre-commit/commit-msg)**
3. **Testes E2E com Playwright**

Essas iniciativas devem ser implementadas de forma incremental, priorizando baixo impacto no fluxo atual e ganhos rapidos de qualidade.

## Justificativa

- Diminui divergencia de estilo e ruido em code review.
- Impede commits com problemas basicos de qualidade.
- Aumenta seguranca para evoluir o formulario sem quebrar fluxos principais.
- Complementa os testes unitarios com validacao de comportamento real no navegador.
- Torna o processo de entrega mais previsivel e repetivel.

## Escopo inicial

### 1) Prettier

- Configurar regras de formatacao padrao do projeto.
- Adicionar script dedicado (`format` e `format:check`).
- Integrar com editor para formatacao automatica ao salvar.

### 2) Husky

- Configurar hook de `pre-commit` para executar verificacoes rapidas.
- Integrar com `lint-staged` para validar apenas arquivos alterados.
- Opcionalmente validar padrao de mensagem de commit em `commit-msg`.

### 3) Playwright

- Configurar estrutura base de testes E2E.
- Cobrir caminho feliz do formulario de 3 etapas.
- Validar exibicao de resumo final e cenarios criticos de navegacao.

## Consequencias

### Positivas

- Menor variacao de estilo entre contribuicoes.
- Menor chance de codigo quebrado chegar ao repositorio.
- Maior confianca em deploys e refatoracoes.
- Melhor visibilidade de regressao em fluxos de ponta a ponta.

### Negativas / Riscos

- Aumento inicial de esforco para configurar e estabilizar ferramentas.
- Hooks podem tornar o commit mais lento se mal calibrados.
- Testes E2E exigem manutencao e cuidado com flakiness.

## Diretrizes praticas

- Implementar por etapas, medindo impacto em tempo de desenvolvimento.
- Comecar com regras e hooks simples, evoluindo conforme maturidade do time.
- Priorizar cenarios E2E de maior valor de negocio antes de ampliar cobertura.
- Documentar scripts e convencoes no `README.md` apos implantacao.
