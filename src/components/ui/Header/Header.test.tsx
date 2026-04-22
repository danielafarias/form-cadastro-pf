import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { Header } from './Header'

function renderWithMantine(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>)
}

describe('Header', () => {
  it('renderiza textos padrão', () => {
    renderWithMantine(<Header />)

    expect(screen.getByText('Cadastro e Exportação')).toBeInTheDocument()
    expect(screen.getByText('Pessoa Física')).toBeInTheDocument()
    expect(screen.getByText('3 etapas')).toBeInTheDocument()
  })

  it('renderiza props customizadas', () => {
    renderWithMantine(
      <Header title="Meu Título" subtitle="Meu Subtítulo" stepsLabel="5 etapas" />
    )

    expect(screen.getByText('Meu Título')).toBeInTheDocument()
    expect(screen.getByText('Meu Subtítulo')).toBeInTheDocument()
    expect(screen.getByText('5 etapas')).toBeInTheDocument()
  })
})
