# ADR 0003 - Storybook para documentacao de componentes UI

- **Status:** Pendente
- **Data:** 2026-04-22

## Contexto

O projeto possui componentes de interface reutilizaveis e precisa garantir consistencia visual, clareza de uso e facilidade de manutencao.

Sem uma documentacao dedicada de UI, o entendimento de variacoes de componentes, estados e contratos de props fica disperso no codigo e mais dificil de validar em revisoes.

## Decisao

Foi decidido adotar o **Storybook** como ferramenta oficial para documentacao e visualizacao dos componentes de UI.

## Justificativa

- Centraliza a documentacao dos componentes em um unico lugar.
- Facilita validacao visual de estados (default, hover, disabled, loading, erro etc.).
- Melhora comunicacao entre desenvolvimento, design e QA.
- Reduz regressao visual ao tornar comportamento dos componentes mais explicito.
- Acelera onboarding de novas pessoas no projeto.

## Escopo

- Componentes base de UI (ex.: botoes, inputs, cabecalho, navegacao de etapas).
- Variantes visuais e estados relevantes de cada componente.
- Casos de uso mais comuns com controles de props.

## Consequencias

### Positivas

- Maior padronizacao na evolucao da interface.
- Melhor rastreabilidade de mudancas em componentes.
- Reutilizacao mais segura de componentes entre telas.

### Negativas / Riscos

- Custo inicial para criar e manter stories.
- Necessidade de disciplina para manter stories atualizadas junto com mudancas de codigo.

## Diretrizes

- Todo novo componente UI deve incluir pelo menos uma story.
- Alteracoes relevantes de comportamento/estilo devem atualizar stories existentes.
- Sempre que possivel, documentar estados de erro, carregamento e desabilitado.
