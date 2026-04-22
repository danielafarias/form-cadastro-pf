import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { StepIndicator } from './index'

describe('StepIndicator (feature)', () => {
  it('renderiza os três passos do formulário', () => {
    render(
      <MantineProvider>
        <StepIndicator currentStep={1} />
      </MantineProvider>
    )

    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument()
    expect(screen.getByText('Residencial')).toBeInTheDocument()
    expect(screen.getByText('Profissional')).toBeInTheDocument()
  })
})
