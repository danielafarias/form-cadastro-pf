import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { Step2ResidentialInfo } from './index'
import * as cepHook from '../../../hooks/useCepLookup'

vi.mock('../../../hooks/useCepLookup')

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

const defaultCepHook = {
  cepData: null,
  loading: false,
  error: null,
  lookup: vi.fn().mockResolvedValue(null),
}

describe('Step2ResidentialInfo', () => {
  const onNext = vi.fn()
  const onBack = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(cepHook.useCepLookup).mockReturnValue(defaultCepHook)
  })

  it('renderiza todos os campos', () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Endereço/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Bairro/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument()
  })

  it('renderiza botões de navegação', () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /próximo/i })).toBeInTheDocument()
  })

  it('chama onBack quando clica em Voltar', () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('aplica máscara de CEP', async () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    const cepInput = screen.getByLabelText(/CEP/i)
    await userEvent.type(cepInput, '01001000')

    expect(cepInput).toHaveValue('01001-000')
  })

  it('mostra erros de validação quando submete vazio', async () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))

    await waitFor(() => {
      expect(screen.getByText(/CEP inválido/i)).toBeInTheDocument()
    })

    expect(onNext).not.toHaveBeenCalled()
  })

  it('mostra alerta de erro de CEP quando hook retorna erro', () => {
    vi.mocked(cepHook.useCepLookup).mockReturnValue({
      ...defaultCepHook,
      error: 'CEP não encontrado. Preencha o endereço manualmente.',
    })

    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByText(/CEP não encontrado/i)).toBeInTheDocument()
  })

  it('mostra loader quando CEP está sendo buscado', () => {
    vi.mocked(cepHook.useCepLookup).mockReturnValue({
      ...defaultCepHook,
      loading: true,
    })

    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument()
  })

  it('preenche valores iniciais quando fornecidos', () => {
    const initialData = {
      cep: '01001-000',
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    }

    renderWithMantine(
      <Step2ResidentialInfo onNext={onNext} onBack={onBack} initialData={initialData} />
    )

    expect(screen.getByLabelText(/Endereço/i)).toHaveValue('Praça da Sé')
    expect(screen.getByLabelText(/Cidade/i)).toHaveValue('São Paulo')
  })

  it('chama onNext com dados corretos quando formulário é válido', async () => {
    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    await userEvent.type(screen.getByLabelText(/CEP/i), '01001000')
    await userEvent.type(screen.getByLabelText(/Endereço/i), 'Praça da Sé')
    await userEvent.type(screen.getByLabelText(/Bairro/i), 'Sé')
    await userEvent.type(screen.getByLabelText(/Cidade/i), 'São Paulo')
    await userEvent.type(screen.getByLabelText(/Estado/i), 'SP')

    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith(
        expect.objectContaining({
          logradouro: 'Praça da Sé',
          cidade: 'São Paulo',
        })
      )
    })
  })

  it('preenche endereço automaticamente quando lookup retorna CEP válido', async () => {
    const lookupMock = vi.fn().mockResolvedValue({
      cep: '01001-000',
      logradouro: 'Rua Teste',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
    })

    vi.mocked(cepHook.useCepLookup).mockReturnValue({
      ...defaultCepHook,
      lookup: lookupMock,
    })

    renderWithMantine(<Step2ResidentialInfo onNext={onNext} onBack={onBack} />)

    await userEvent.type(screen.getByLabelText(/CEP/i), '01001000')

    await waitFor(() => {
      expect(lookupMock).toHaveBeenCalled()
      expect(screen.getByLabelText(/Endereço/i)).toHaveValue('Rua Teste')
      expect(screen.getByLabelText(/Bairro/i)).toHaveValue('Centro')
      expect(screen.getByLabelText(/Cidade/i)).toHaveValue('São Paulo')
      expect(screen.getByLabelText(/Estado/i)).toHaveValue('SP')
    })
  })
})
