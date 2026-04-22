import { useState, useCallback } from 'react'
import { fetchCepData } from '@/services/api'
import type { CepResponse } from '@/features/form/types'

interface UseCepLookupReturn {
  cepData: CepResponse | null
  loading: boolean
  error: string | null
  lookup: (cep: string) => Promise<CepResponse | null>
}

export function useCepLookup(): UseCepLookupReturn {
  const [cepData, setCepData] = useState<CepResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const lookup = useCallback(async (cep: string): Promise<CepResponse | null> => {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      setCepData(null)
      setError(null)
      return null
    }

    setLoading(true)
    setError(null)

    try {
      const data = await fetchCepData(cep)
      if (data) {
        setCepData(data)
        return data
      } else {
        setError('CEP não encontrado. Preencha o endereço manualmente.')
        setCepData(null)
        return null
      }
    } catch {
      setError('Erro ao buscar CEP. Preencha o endereço manualmente.')
      setCepData(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { cepData, loading, error, lookup }
}
