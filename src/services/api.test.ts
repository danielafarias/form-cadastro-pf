import { describe, expect, it, vi, beforeEach } from 'vitest'

const { getMock, isAxiosErrorMock } = vi.hoisted(() => ({
  getMock: vi.fn(),
  isAxiosErrorMock: vi.fn(),
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({ get: getMock })),
    isAxiosError: isAxiosErrorMock,
  },
  create: vi.fn(() => ({ get: getMock })),
  isAxiosError: isAxiosErrorMock,
}))

import { fetchCepData, fetchProfissoes } from './api'

describe('api service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retorna null para CEP com tamanho inválido', async () => {
    const result = await fetchCepData('12345-67')

    expect(result).toBeNull()
    expect(getMock).not.toHaveBeenCalled()
  })

  it('retorna os dados quando busca CEP com sucesso', async () => {
    const cepResponse = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    }
    getMock.mockResolvedValueOnce({ data: cepResponse })

    const result = await fetchCepData('01001-000')

    expect(getMock).toHaveBeenCalledWith('/ceps/01001000')
    expect(result).toEqual(cepResponse)
  })

  it('retorna null quando a API responde 404', async () => {
    const error404 = { response: { status: 404 } }
    getMock.mockRejectedValueOnce(error404).mockResolvedValueOnce({
      data: { erro: true },
    })
    isAxiosErrorMock.mockReturnValue(true)

    const result = await fetchCepData('01001-000')

    expect(getMock).toHaveBeenNthCalledWith(1, '/ceps/01001000')
    expect(getMock).toHaveBeenNthCalledWith(2, '/01001000/json/')
    expect(result).toBeNull()
  })

  it('faz fallback para o ViaCEP quando CEP não existe no mock', async () => {
    const error404 = { response: { status: 404 } }
    const viaCepResponse = {
      cep: '01001-001',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    }
    getMock.mockRejectedValueOnce(error404).mockResolvedValueOnce({ data: viaCepResponse })
    isAxiosErrorMock.mockReturnValue(true)

    const result = await fetchCepData('01001-001')

    expect(getMock).toHaveBeenNthCalledWith(1, '/ceps/01001001')
    expect(getMock).toHaveBeenNthCalledWith(2, '/01001001/json/')
    expect(result).toEqual({
      id: '01001001',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    })
  })

  it('lança erro quando a falha não é 404', async () => {
    const networkError = new Error('network')
    getMock.mockRejectedValueOnce(networkError)
    isAxiosErrorMock.mockReturnValueOnce(false)

    await expect(fetchCepData('01001-000')).rejects.toThrow('network')
  })

  it('carrega lista de profissões', async () => {
    const profissoes = [
      { id: 1, nome: 'Engenheiro(a)' },
      { id: 2, nome: 'Designer' },
    ]
    getMock.mockResolvedValueOnce({ data: profissoes })

    const result = await fetchProfissoes()

    expect(getMock).toHaveBeenCalledWith('/profissoes')
    expect(result).toEqual(profissoes)
  })
})
