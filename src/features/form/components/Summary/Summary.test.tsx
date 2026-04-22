import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Summary } from './index'
import type { FormData } from '../../types'

const { html2canvasMock, addImageMock, addPageMock, saveMock } = vi.hoisted(() => ({
  html2canvasMock: vi.fn(),
  addImageMock: vi.fn(),
  addPageMock: vi.fn(),
  saveMock: vi.fn(),
}))

vi.mock('html2canvas', () => ({
  default: html2canvasMock,
}))

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(function MockJsPdf() {
    return {
      internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
      addImage: addImageMock,
      addPage: addPageMock,
      save: saveMock,
    }
  }),
}))

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

const mockData: FormData = {
  nomeCompleto: 'João Silva',
  dataNascimento: '15/06/1990',
  cpf: '529.982.247-25',
  telefone: '(11) 98765-4321',
  email: 'joao@email.com',
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  bairro: 'Sé',
  cidade: 'São Paulo',
  estado: 'SP',
  empresa: 'Tech Corp',
  profissao: 'Engenheiro(a) de Software',
  salario: 'R$ 5.000,00',
  tempoEmpresa: '2-5-anos',
}

describe('Summary', () => {
  const onBack = vi.fn()
  const onRestart = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    html2canvasMock.mockResolvedValue({
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
      height: 500,
      width: 400,
    })
  })

  it('renderiza dados pessoais corretamente', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('15/06/1990')).toBeInTheDocument()
    expect(screen.getByText('529.982.247-25')).toBeInTheDocument()
    expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument()
    expect(screen.getByText('joao@email.com')).toBeInTheDocument()
  })

  it('renderiza dados residenciais corretamente', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText('01001-000')).toBeInTheDocument()
    expect(screen.getByText('Praça da Sé')).toBeInTheDocument()
    expect(screen.getByText('Sé')).toBeInTheDocument()
    expect(screen.getByText('São Paulo')).toBeInTheDocument()
    expect(screen.getByText('SP')).toBeInTheDocument()
  })

  it('renderiza dados profissionais corretamente', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText('Tech Corp')).toBeInTheDocument()
    expect(screen.getByText('Engenheiro(a) de Software')).toBeInTheDocument()
    expect(screen.getByText('R$ 5.000,00')).toBeInTheDocument()
    expect(screen.getByText('2 a 5 anos')).toBeInTheDocument()
  })

  it('renderiza botões de ação', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByRole('button', { name: /editar dados/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /novo cadastro/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /exportar pdf/i })).toBeInTheDocument()
  })

  it('chama onBack quando clica em Editar Dados', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    fireEvent.click(screen.getByRole('button', { name: /editar dados/i }))
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it('chama onRestart quando clica em Novo Cadastro', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    fireEvent.click(screen.getByRole('button', { name: /novo cadastro/i }))
    expect(onRestart).toHaveBeenCalledTimes(1)
  })

  it('renderiza seções com títulos corretos', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument()
    expect(screen.getByText('Informações Residenciais')).toBeInTheDocument()
    expect(screen.getByText('Informações Profissionais')).toBeInTheDocument()
  })

  it('exibe mensagem de cadastro concluído', () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    expect(screen.getByText(/Cadastro Concluído/i)).toBeInTheDocument()
  })

  it('formata tempo de empresa corretamente para outros valores', () => {
    const dataWithDifferentTempo = { ...mockData, tempoEmpresa: 'menos-1-ano' }
    renderWithMantine(
      <Summary data={dataWithDifferentTempo} onBack={onBack} onRestart={onRestart} />
    )
    expect(screen.getByText('Menos de 1 ano')).toBeInTheDocument()
  })

  it('formata "mais-10-anos" corretamente', () => {
    const dataWithMaisTempo = { ...mockData, tempoEmpresa: 'mais-10-anos' }
    renderWithMantine(
      <Summary data={dataWithMaisTempo} onBack={onBack} onRestart={onRestart} />
    )
    expect(screen.getByText('Mais de 10 anos')).toBeInTheDocument()
  })

  it('aciona exportação de PDF ao clicar no botão', async () => {
    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)

    fireEvent.click(screen.getByRole('button', { name: /exportar pdf/i }))

    await vi.waitFor(() => {
      expect(html2canvasMock).toHaveBeenCalled()
    })
  })

  it('salva PDF com nome sanitizado e adiciona nova página quando necessário', async () => {
    html2canvasMock.mockResolvedValueOnce({
      toDataURL: vi.fn().mockReturnValue('data:image/png;base64,mock'),
      height: 4000,
      width: 400,
    })

    renderWithMantine(
      <Summary
        data={{ ...mockData, nomeCompleto: 'João da Silva!' }}
        onBack={onBack}
        onRestart={onRestart}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /exportar pdf/i }))

    await vi.waitFor(() => {
      expect(addPageMock).toHaveBeenCalled()
      expect(saveMock).toHaveBeenCalledWith('cadastro-joo-da-silva.pdf')
    })
  })

  it('captura erro na exportação sem quebrar a tela', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    html2canvasMock.mockRejectedValueOnce(new Error('falha ao gerar canvas'))

    renderWithMantine(<Summary data={mockData} onBack={onBack} onRestart={onRestart} />)
    fireEvent.click(screen.getByRole('button', { name: /exportar pdf/i }))

    await vi.waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled()
    })

    consoleErrorSpy.mockRestore()
  })
})
