import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { Step3ProfessionalInfo } from './index'
import * as professionsHook from '../../../hooks/useProfessions'

vi.mock('../../../hooks/useProfessions')

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

const mockProfissoes = [
  { id: 1, nome: 'Engenheiro(a) de Software' },
  { id: 2, nome: 'Médico(a)' },
  { id: 3, nome: 'Advogado(a)' },
  { id: 4, nome: 'Professor(a)' },
  { id: 5, nome: 'Contador(a)' },
]

const defaultProfissionsHook = {
  profissoes: mockProfissoes,
  loading: false,
  error: null,
}

describe('Step3ProfessionalInfo', () => {
  const onNext = vi.fn()
  const onBack = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(professionsHook.useProfessions).mockReturnValue(defaultProfissionsHook)
  })

  it('renderiza todos os campos', () => {
    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByPlaceholderText(/nome da sua empresa/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/selecione sua profissão/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/R\$ 0,00/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/selecione o tempo na empresa/i)).toBeInTheDocument()
  })

  it('renderiza botões de navegação', () => {
    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver resumo/i })).toBeInTheDocument()
  })

  it('chama onBack quando clica em Voltar', () => {
    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    fireEvent.click(screen.getByRole('button', { name: /voltar/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('aplica máscara de salário', async () => {
    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    const salarioInput = screen.getByPlaceholderText(/R\$ 0,00/i)
    await userEvent.type(salarioInput, '500000')

    expect(salarioInput).toHaveValue('R$\xa05.000,00')
  })

  it('mostra loader quando profissões estão carregando', () => {
    vi.mocked(professionsHook.useProfessions).mockReturnValue({
      ...defaultProfissionsHook,
      loading: true,
      profissoes: [],
    })

    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument()
  })

  it('mostra alerta quando ocorre erro ao carregar profissões', () => {
    vi.mocked(professionsHook.useProfessions).mockReturnValue({
      ...defaultProfissionsHook,
      error: 'Erro ao carregar profissões. Tente novamente.',
    })

    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    expect(screen.getByText(/Erro ao carregar profissões/i)).toBeInTheDocument()
  })

  it('mostra erros de validação quando submete vazio', async () => {
    renderWithMantine(<Step3ProfessionalInfo onNext={onNext} onBack={onBack} />)

    fireEvent.click(screen.getByRole('button', { name: /ver resumo/i }))

    await waitFor(() => {
      expect(screen.getByText(/Empresa é obrigatória/i)).toBeInTheDocument()
    })

    expect(onNext).not.toHaveBeenCalled()
  })

  it('preenche valor inicial de empresa quando fornecido', () => {
    const initialData = {
      empresa: 'Tech Corp',
      profissao: 'Engenheiro(a) de Software',
      salario: 'R$ 5.000,00',
      tempoEmpresa: '2-5-anos',
    }

    renderWithMantine(
      <Step3ProfessionalInfo onNext={onNext} onBack={onBack} initialData={initialData} />
    )

    expect(screen.getByPlaceholderText(/nome da sua empresa/i)).toHaveValue('Tech Corp')
    expect(screen.getByPlaceholderText(/R\$ 0,00/i)).toHaveValue('R$ 5.000,00')
  })

  it('chama onNext com dados corretos quando formulário é válido', async () => {
    const initialData = {
      empresa: '',
      profissao: 'Engenheiro(a) de Software',
      salario: '',
      tempoEmpresa: '2-5-anos',
    }

    renderWithMantine(
      <Step3ProfessionalInfo onNext={onNext} onBack={onBack} initialData={initialData} />
    )

    await userEvent.type(screen.getByPlaceholderText(/nome da sua empresa/i), 'Tech Corp')
    await userEvent.type(screen.getByPlaceholderText(/R\$ 0,00/i), '500000')

    fireEvent.click(screen.getByRole('button', { name: /ver resumo/i }))

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith(
        expect.objectContaining({
          empresa: 'Tech Corp',
          profissao: 'Engenheiro(a) de Software',
          tempoEmpresa: '2-5-anos',
        })
      )
    }, { timeout: 3000 })
  })
})
