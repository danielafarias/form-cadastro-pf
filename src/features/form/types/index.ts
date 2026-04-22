export interface Step1Data {
  nomeCompleto: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
}

export interface Step2Data {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
}

export interface Step3Data {
  empresa: string
  profissao: string
  salario: string
  tempoEmpresa: string
}

export interface FormData extends Step1Data, Step2Data, Step3Data {}

export interface Profissao {
  id: number
  nome: string
}

export interface CepResponse {
  id?: string
  logradouro: string
  bairro: string
  cidade: string
  estado: string
}
