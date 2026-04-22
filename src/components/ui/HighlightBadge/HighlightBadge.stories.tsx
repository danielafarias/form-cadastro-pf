import type { Meta, StoryObj } from '@storybook/react-vite'
import { HighlightBadge } from './HighlightBadge'

const meta = {
  title: 'UI/HighlightBadge',
  component: HighlightBadge,
  tags: ['autodocs'],
} satisfies Meta<typeof HighlightBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <HighlightBadge>3 etapas</HighlightBadge>,
}
