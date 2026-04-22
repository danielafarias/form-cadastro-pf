import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCepLookup } from './useCepLookup'
import * as api from '../../../services/api'

vi.mock('../../../services/api')

describe('useCepLookup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inicia com estado padrão', () => {
    const { result } = renderHook(() => useCepLookup())
    expect(result.current.cepData).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('busca CEP com sucesso', async () => {
    const mockData = {
      id: '01001000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    }
    vi.mocked(api.fetchCepData).mockResolvedValue(mockData)

    const { result } = renderHook(() => useCepLookup())

    let returnedData
    await act(async () => {
      returnedData = await result.current.lookup('01001-000')
    })

    expect(returnedData).toEqual(mockData)
    expect(result.current.cepData).toEqual(mockData)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('define erro quando CEP não é encontrado', async () => {
    vi.mocked(api.fetchCepData).mockResolvedValue(null)

    const { result } = renderHook(() => useCepLookup())

    await act(async () => {
      await result.current.lookup('99999-999')
    })

    expect(result.current.cepData).toBeNull()
    expect(result.current.error).toContain('não encontrado')
    expect(result.current.loading).toBe(false)
  })

  it('define erro quando a requisição falha', async () => {
    vi.mocked(api.fetchCepData).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useCepLookup())

    await act(async () => {
      await result.current.lookup('01001-000')
    })

    expect(result.current.cepData).toBeNull()
    expect(result.current.error).toContain('Erro ao buscar')
    expect(result.current.loading).toBe(false)
  })

  it('não busca quando CEP tem menos de 8 dígitos', async () => {
    const { result } = renderHook(() => useCepLookup())

    let returnedData
    await act(async () => {
      returnedData = await result.current.lookup('0100')
    })

    expect(returnedData).toBeNull()
    expect(api.fetchCepData).not.toHaveBeenCalled()
    expect(result.current.loading).toBe(false)
  })

  it('limpa erro e cepData quando CEP é muito curto', async () => {
    vi.mocked(api.fetchCepData).mockResolvedValue(null)

    const { result } = renderHook(() => useCepLookup())

    await act(async () => {
      await result.current.lookup('99999-999')
    })

    expect(result.current.error).toBeTruthy()

    await act(async () => {
      await result.current.lookup('0100')
    })

    expect(result.current.error).toBeNull()
    expect(result.current.cepData).toBeNull()
  })
})
