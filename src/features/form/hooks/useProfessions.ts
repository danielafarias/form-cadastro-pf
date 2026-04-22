import { useState, useEffect } from 'react'
import { fetchProfissoes } from '@/services/api'
import type { Profissao } from '@/features/form/types'

interface UseProfissionsReturn {
  profissoes: Profissao[]
  loading: boolean
  error: string | null
}

export function useProfessions(): UseProfissionsReturn {
  const [profissoes, setProfissoes] = useState<Profissao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchProfissoes()
        if (!cancelled) {
          setProfissoes(data)
        }
      } catch {
        if (!cancelled) {
          setError('Erro ao carregar profissões. Tente novamente.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { profissoes, loading, error }
}
