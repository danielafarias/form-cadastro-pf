import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MantineProvider } from '@mantine/core'
import { Step1PersonalData } from './index'

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

describe('Step1PersonalData', () => {
  const onNext = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza todos os campos', () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument()
  })

  it('renderiza botão de próximo', () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)
    expect(screen.getByRole('button', { name: /próximo/i })).toBeInTheDocument()
  })

  it('mostra erros de validação quando submete vazio', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))

    await waitFor(() => {
      expect(screen.getByText(/pelo menos 3 caracteres/i)).toBeInTheDocument()
    })

    expect(onNext).not.toHaveBeenCalled()
  })

  it('aplica máscara de CPF', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    const cpfInput = screen.getByLabelText(/CPF/i)
    await userEvent.type(cpfInput, '12345678900')

    expect(cpfInput).toHaveValue('123.456.789-00')
  })

  it('aplica máscara de telefone', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    const telefoneInput = screen.getByLabelText(/Telefone/i)
    await userEvent.type(telefoneInput, '11987654321')

    expect(telefoneInput).toHaveValue('(11) 98765-4321')
  })

  it('aplica máscara de data', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    const dateInput = screen.getByLabelText(/Data de Nascimento/i)
    await userEvent.type(dateInput, '01061990')

    expect(dateInput).toHaveValue('01/06/1990')
  })

  it('preenche valores iniciais quando fornecidos', () => {
    const initialData = {
      nomeCompleto: 'João Silva',
      dataNascimento: '01/01/1990',
      cpf: '529.982.247-25',
      telefone: '(11) 98765-4321',
      email: 'joao@email.com',
    }

    renderWithMantine(<Step1PersonalData onNext={onNext} initialData={initialData} />)

    expect(screen.getByLabelText(/Nome Completo/i)).toHaveValue('João Silva')
    expect(screen.getByLabelText(/E-mail/i)).toHaveValue('joao@email.com')
  })

  it('chama onNext com dados corretos quando formulário é válido', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    await userEvent.type(screen.getByLabelText(/Nome Completo/i), 'João Silva')
    await userEvent.type(screen.getByLabelText(/Data de Nascimento/i), '15061990')
    await userEvent.type(screen.getByLabelText(/CPF/i), '52998224725')
    await userEvent.type(screen.getByLabelText(/Telefone/i), '11987654321')
    await userEvent.type(screen.getByLabelText(/E-mail/i), 'joao@email.com')

    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))

    await waitFor(() => {
      expect(onNext).toHaveBeenCalledWith(
        expect.objectContaining({
          nomeCompleto: 'João Silva',
          email: 'joao@email.com',
        })
      )
    })
  })

  it('mostra erro de email inválido', async () => {
    renderWithMantine(<Step1PersonalData onNext={onNext} />)

    await userEvent.type(screen.getByLabelText(/Nome Completo/i), 'João Silva')
    await userEvent.type(screen.getByLabelText(/E-mail/i), 'email-invalido')
    fireEvent.click(screen.getByRole('button', { name: /próximo/i }))

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/i)).toBeInTheDocument()
    })
  })
})
