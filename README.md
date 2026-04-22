# Form Completo

O **Form Completo** guia o usuário por um fluxo de 3 etapas para preencher dados pessoais, residenciais e profissionais com validação em tempo real.

No fim do processo, a aplicação exibe um resumo visualmente organizado e permite **exportar o cadastro em PDF**.

## Destaques da aplicação

- Fluxo em 3 etapas com indicador de progresso.
- Validacao de formulário com `react-hook-form` + `zod`.
- Mascaras para campos como CPF, telefone, data, CEP e salario.
- Busca automática de endereco por CEP com fallback para ViaCEP.
- Lista de profissões carregada de uma API mock.
- Geracao de PDF a partir da tela de resumo.
- Interface responsiva com `Mantine`.

## Tecnologias

- React 19
- TypeScript
- Vite
- Mantine UI
- React Hook Form + Zod
- Axios
- json-server
- Vitest + Testing Library

## Como rodar o projeto

### 1) Pré-requisitos

- Node.js 20+ (recomendado)
- Yarn

### 2) Instalar dependências

```bash
yarn
```

### 3) Rodar ambiente de desenvolvimento

```bash
yarn dev
```

Esse comando sobe:

- Frontend Vite em `http://localhost:5173`
- API mock (`json-server`) em `http://localhost:3001`

## Scripts disponiveis

- `yarn dev`: sobe frontend + API mock em paralelo.
- `yarn dev:vite`: sobe apenas o frontend.
- `yarn dev:server`: sobe apenas o `json-server`.
- `yarn build`: gera build de producao.
- `yarn preview`: preview local da build.
- `yarn lint`: executa o ESLint.
- `yarn test`: executa testes em modo watch.
- `yarn test:run`: executa testes uma vez.
- `yarn test:coverage`: executa testes com cobertura.
- `yarn storybook`: inicia o Storybook em `http://localhost:6006`.
- `yarn build-storybook`: gera a documentacao estatica dos componentes.

## API mock e dados

Os dados de desenvolvimento ficam em `db.json` e incluem:

- Base de CEPs para autopreenchimento de endereco.
- Lista de profissões para o passo profissional.

Quando um CEP nao existe no mock local, a aplicacao consulta automaticamente o [ViaCEP](https://viacep.com.br/) como fallback.

Se quiser alterar cenários de teste ou dados exibidos na interface, edite esse arquivo.

## Fluxo do usuario

1. Preenche dados pessoais.
2. Informa CEP e endereco (com busca automatica).
3. Completa dados profissionais.
4. Revisa tudo em um resumo final.
5. Exporta o resultado em PDF.

