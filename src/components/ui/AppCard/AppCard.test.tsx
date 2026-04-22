import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { AppCard } from './AppCard'

describe('AppCard', () => {
  it('renderiza conteúdo filho', () => {
    render(
      <MantineProvider>
        <AppCard>Conteudo do card</AppCard>
      </MantineProvider>
    )

    expect(screen.getByText('Conteudo do card')).toBeInTheDocument()
  })
})
