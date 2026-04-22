# ADR 0001 - Requisitos do Projeto

- **Status:** Pendente
- **Data:** 2026-04-22

## Contexto

O projeto exige a construcao de uma aplicacao front-end com foco em formulario multi-etapas, integracao com servicos HTTP, validacoes de dados e qualidade minima garantida por testes.

Este ADR consolida os requisitos funcionais e nao funcionais do desafio para orientar implementacao, validacao e evolucao do produto.

## Decisao

Sera desenvolvida uma aplicacao front-end com:

- React + TypeScript
- Arquitetura baseada em Vite
- Formulario em 3 etapas com persistencia de dados entre navegacoes
- Validacao de formularios com React Hook Form
- Responsividade em diferentes tamanhos de tela

## Requisitos Funcionais

### 1) Formulario em 3 etapas

#### Etapa 1 - Dados Pessoais
- Nome completo
- Data de Nascimento
- CPF
- Telefone
- Email

#### Etapa 2 - Informacoes Residenciais
- CEP
- Endereco
- Bairro
- Cidade
- Estado

#### Etapa 3 - Informacoes Profissionais
- Empresa
- Profissao
- Salario
- Tempo de Empresa

### 2) Busca automatica por CEP

- Ao informar o CEP, deve ser realizado GET para servico mockado (`json-server`).
- O retorno deve preencher automaticamente `endereco`, `bairro`, `cidade` e `estado`.
- E permitido, como alternativa, integrar diretamente com endpoint publico de CEP (ex.: Correios), desde que o comportamento funcional seja equivalente.

### 3) Lista de profissoes

- O campo `profissao` deve carregar opcoes via GET em servico mockado (`json-server`).
- O select deve conter pelo menos 5 opcoes de profissao.

### 4) Resumo e exportacao

- Ao concluir as 3 etapas, deve existir tela de resumo com todos os dados informados.
- O usuario deve conseguir exportar os dados para arquivo PDF.

## Requisitos Nao Funcionais

- Aplicacao responsiva.
- Uso de mascaras e validacoes para:
  - Data de Nascimento
  - Telefone
  - CPF
  - Salario
- Cobertura minima de testes unitarios de 80%.

## Criterios de Aceite

O desafio sera considerado atendido quando:

1. O formulario em 3 etapas estiver completo e funcional.
2. A navegacao entre etapas mantiver os dados preenchidos.
3. A busca de CEP preencher os campos residenciais automaticamente.
4. O campo profissao for populado por API mockada com no minimo 5 opcoes.
5. A tela de resumo consolidar todas as informacoes fornecidas.
6. A exportacao para PDF estiver disponivel e funcional.
7. As mascaras e validacoes obrigatorias estiverem aplicadas.
8. A interface estiver responsiva.
9. A cobertura de testes unitarios for igual ou superior a 80%.

## Consequencias

- Este ADR define a baseline de entrega do desafio.
- Decisoes tecnicas complementares (estado global, estrategia de persistencia, fallback de CEP, abordagem de testes, etc.) devem referenciar este documento.
- Alteracoes futuras nos requisitos devem gerar novo ADR ou atualizacao formal deste, com historico de decisao.
