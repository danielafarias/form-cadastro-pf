import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useProfessions } from './useProfessions'
import * as api from '../../../services/api'

vi.mock('../../../services/api')

describe('useProfessions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inicia com estado de carregamento', () => {
    vi.mocked(api.fetchProfissoes).mockResolvedValue([])

    const { result } = renderHook(() => useProfessions())

    expect(result.current.loading).toBe(true)
    expect(result.current.profissoes).toEqual([])
    expect(result.current.error).toBeNull()
  })

  it('carrega profissões com sucesso', async () => {
    const mockProfissoes = [
      { id: 1, nome: 'Engenheiro(a) de Software' },
      { id: 2, nome: 'Médico(a)' },
      { id: 3, nome: 'Advogado(a)' },
    ]
    vi.mocked(api.fetchProfissoes).mockResolvedValue(mockProfissoes)

    const { result } = renderHook(() => useProfessions())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.profissoes).toEqual(mockProfissoes)
    expect(result.current.error).toBeNull()
  })

  it('define erro quando a requisição falha', async () => {
    vi.mocked(api.fetchProfissoes).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useProfessions())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.profissoes).toEqual([])
    expect(result.current.error).toContain('Erro ao carregar')
  })

  it('chama fetchProfissoes ao montar', async () => {
    vi.mocked(api.fetchProfissoes).mockResolvedValue([])

    renderHook(() => useProfessions())

    await waitFor(() => {
      expect(api.fetchProfissoes).toHaveBeenCalledTimes(1)
    })
  })

  it('retorna lista vazia quando não há profissões', async () => {
    vi.mocked(api.fetchProfissoes).mockResolvedValue([])

    const { result } = renderHook(() => useProfessions())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.profissoes).toHaveLength(0)
  })

  it('não atualiza estado após desmontar o hook', async () => {
    let resolveRequest: (value: { id: number; nome: string }[]) => void
    const pendingPromise = new Promise<{ id: number; nome: string }[]>((resolve) => {
      resolveRequest = resolve
    })

    vi.mocked(api.fetchProfissoes).mockReturnValue(
      pendingPromise as unknown as ReturnType<typeof api.fetchProfissoes>
    )

    const { unmount } = renderHook(() => useProfessions())
    unmount()

    resolveRequest!([{ id: 1, nome: 'Engenheiro(a)' }])

    await Promise.resolve()

    expect(api.fetchProfissoes).toHaveBeenCalledTimes(1)
  })
})
