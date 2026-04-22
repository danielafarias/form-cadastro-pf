import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { StepIndicator } from './StepIndicator'
import type { StepIndicatorItem } from './StepIndicator'

function IconA() {
  return <span data-testid="icon-a" />
}

function IconB() {
  return <span data-testid="icon-b" />
}

function IconC() {
  return <span data-testid="icon-c" />
}

const steps: StepIndicatorItem[] = [
  { label: 'Primeiro', icon: IconA },
  { label: 'Segundo', icon: IconB },
  { label: 'Terceiro', icon: IconC },
]

describe('StepIndicator UI', () => {
  it('renderiza labels e marca primeiro passo como concluído', () => {
    const { container } = render(
      <MantineProvider>
        <StepIndicator currentStep={1} steps={steps} />
      </MantineProvider>
    )

    expect(screen.getByText('Primeiro')).toBeInTheDocument()
    expect(screen.getByText('Segundo')).toBeInTheDocument()
    expect(screen.getByText('Terceiro')).toBeInTheDocument()

    expect(screen.queryByTestId('icon-a')).not.toBeInTheDocument()
    expect(screen.getByTestId('icon-b')).toBeInTheDocument()
    expect(screen.getByTestId('icon-c')).toBeInTheDocument()

    expect(container.querySelectorAll('svg').length).toBeGreaterThan(0)
  })
})
