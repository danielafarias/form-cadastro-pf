# ADR 0002 - Decisao de uso do ViaCEP

- **Status:** Pendente
- **Data:** 2026-04-22

## Contexto

No requisito de busca automatica por CEP, existiam duas alternativas viaveis para implementacao:

- consumir endpoint mockado com `json-server`;
- integrar com um servico publico de CEP.

Para o escopo atual do desafio, o objetivo principal e entregar um fluxo funcional, com baixa complexidade operacional e menor atrito de configuracao.

## Decisao

Foi decidido utilizar o **ViaCEP** como fonte principal de consulta de CEP.

## Justificativa

- Implementacao simples via requisicao HTTP GET.
- Nao exige autenticacao, token ou configuracao de credenciais.
- Reduz esforco de setup para desenvolvimento e validacao local.
- Permite acelerar a entrega do requisito funcional de autopreenchimento de endereco.

## Consequencias

### Positivas

- Menor complexidade inicial de integracao.
- Menos manutencao de infraestrutura local para dados de CEP.
- Fluxo de desenvolvimento mais direto para o time.

### Negativas / Riscos

- Dependencia de disponibilidade de servico externo.
- Possivel impacto por latencia de rede ou instabilidade temporaria.
- Necessidade de tratamento de erro e fallback no front-end para manter boa experiencia do usuario.

## Diretrizes de implementacao

- Consultar ViaCEP ao receber CEP valido.
- Preencher automaticamente `endereco`, `bairro`, `cidade` e `estado` quando houver retorno valido.
- Exibir feedback ao usuario em cenarios de CEP invalido, nao encontrado ou falha de comunicacao.
