import axios from 'axios'
import type { CepResponse, Profissao } from '@/features/form/types'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
})

const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 5000,
})

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

async function fetchCepFromViaCep(digits: string): Promise<CepResponse | null> {
  try {
    const response = await viaCepApi.get<ViaCepResponse>(`/${digits}/json/`)
    const data = response.data

    if (!data || data.erro) {
      return null
    }

    return {
      id: digits,
      logradouro: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return null
    }
    throw error
  }
}

export async function fetchCepData(cep: string): Promise<CepResponse | null> {
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return null

  try {
    const response = await api.get<CepResponse>(`/ceps/${digits}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return fetchCepFromViaCep(digits)
    }
    throw error
  }
}

export async function fetchProfissoes(): Promise<Profissao[]> {
  const response = await api.get<Profissao[]>('/profissoes')
  return response.data
}
