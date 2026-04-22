# ADR 0004 - Arquitetura de separacao por camadas no front-end

- **Status:** Pendente
- **Data:** 2026-04-22

## Contexto

Com o crescimento do projeto, e necessario organizar o codigo para facilitar manutencao, escalabilidade e reaproveitamento de componentes.

Sem uma convencao clara de arquitetura, tende a ocorrer acoplamento entre regras de negocio, componentes visuais e acesso a dados, dificultando testes e evolucao das features.

## Decisao

Foi definida uma arquitetura com separacao por responsabilidades nos seguintes blocos principais:

- `components/ui`
- `features`
- `features/<feature>/components`
- `services`
- `utils`
- `test`
- `assets`
- arquivos de bootstrap e configuracao de app (`App.tsx`, `main.tsx`, `theme.ts`)

## Estrutura e responsabilidades

### 1) `components/ui`

Componentes visuais reutilizaveis, agnosticos de dominio, sem regra de negocio da feature.

Exemplos: botoes, cards, cabecalho, indicadores visuais e elementos de navegacao de formulario.

### 2) `features`

Modulo de dominio funcional (ex.: formulario), contendo orquestracao da experiencia da feature.

Pode concentrar:
- tela/container principal da feature;
- hooks de comportamento da feature;
- schemas de validacao;
- tipos e estilos especificos.

### 3) `features/<feature>/components`

Componentes especificos da feature, que nao fazem sentido fora do contexto daquele dominio.

Exemplos: passos do formulario, resumo final, componentes de apoio internos da feature.

### 4) `services`

Camada de acesso a dados e integracoes HTTP externas (APIs mockadas ou publicas).

Responsavel por encapsular chamadas de rede e contratos de resposta, evitando espalhar detalhes de infraestrutura pela UI.

### 5) `utils`

Funcoes utilitarias puras e reutilizaveis, sem dependencia de UI ou regra especifica de uma feature.

Exemplos: mascaras, formatadores e funcoes auxiliares de validacao.

### 6) `test`

Configuracao global de testes e utilitarios de suporte aos testes automatizados.

Exemplos: `setup` de ambiente, mocks compartilhados e helpers para renderizacao.

### 7) `assets`

Arquivos estaticos da aplicacao (imagens, icones e recursos visuais) sem logica de negocio.

### 8) Bootstrap e configuracao de app

Arquivos de entrada e composicao global da aplicacao.

Exemplos: `main.tsx` (montagem da app), `App.tsx` (casca principal) e `theme.ts` (tema/design tokens).

## Regras de dependencia

- `components/ui` nao depende de `features`.
- `features` pode consumir `components/ui`, `services` e `utils`.
- Componentes de `features/<feature>/components` podem consumir `components/ui`, hooks/schemas/tipos da propria feature, `services` e `utils` quando necessario.
- `services` nao deve importar componentes de interface.
- `utils` deve permanecer agnostico e nao depende de `features` nem de componentes de UI.
- `test` pode depender das demais camadas para validacao, mas nao deve ser dependencia de codigo de producao.
- `assets` pode ser consumido por UI/features, mas nao contem comportamento.
- Arquivos de bootstrap podem compor `features`, `components/ui` e `theme`, sem conter regra de dominio detalhada.

## Justificativa

- Melhora legibilidade e localizacao de codigo.
- Reduz acoplamento entre apresentacao, dominio e infraestrutura.
- Facilita testes unitarios por camada.
- Aumenta reuso de componentes UI entre features.
- Torna a evolucao do projeto mais previsivel.

## Consequencias

### Positivas

- Organizacao consistente do repositorio.
- Menor risco de regressao em refatoracoes.
- Escalabilidade para novas features sem desorganizar estrutura existente.

### Negativas / Riscos

- Pode haver duvida inicial na classificacao de componentes entre `ui` e `feature`.
- Exige disciplina de arquitetura em revisoes de codigo para manter os limites definidos.

## Diretrizes praticas

- Se um componente e generico e reaproveitavel, deve ficar em `components/ui`.
- Se o componente depende de contexto/regra do formulario, deve ficar em `features/form/components`.
- Integracoes de API devem ser centralizadas em `services`.
- Funcoes auxiliares genericas devem ficar em `utils`.
- Suporte de testes compartilhado deve ficar em `test`.
- Recursos estaticos devem ficar em `assets`.
- Novas features devem seguir o mesmo padrao estrutural deste ADR.
