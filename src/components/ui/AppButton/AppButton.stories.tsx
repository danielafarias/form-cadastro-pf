import type { Meta, StoryObj } from '@storybook/react-vite'
import { PrimaryButton, SecondaryButton } from './AppButton'

const meta = {
  title: 'UI/AppButton',
  component: PrimaryButton,
  tags: ['autodocs'],
} satisfies Meta<typeof PrimaryButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args) => <PrimaryButton {...args}>Continuar</PrimaryButton>,
}

export const Secondary: Story = {
  render: (args) => <SecondaryButton {...args}>Voltar</SecondaryButton>,
}
