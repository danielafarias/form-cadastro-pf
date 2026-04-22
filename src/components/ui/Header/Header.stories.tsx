import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'

const meta = {
  title: 'UI/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomLabels: Story = {
  args: {
    title: 'Cadastro de Profissional',
    subtitle: 'Pessoa Juridica',
    stepsLabel: '4 etapas',
  },
}
