import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'
import { HighlightBadge } from './HighlightBadge'

describe('HighlightBadge', () => {
  it('renderiza conteúdo recebido', () => {
    render(
      <MantineProvider>
        <HighlightBadge>3 etapas</HighlightBadge>
      </MantineProvider>
    )

    expect(screen.getByText('3 etapas')).toBeInTheDocument()
  })
})
