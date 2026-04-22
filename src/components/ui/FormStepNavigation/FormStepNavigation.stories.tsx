import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStepNavigation } from './FormStepNavigation'

const meta = {
  title: 'UI/FormStepNavigation',
  component: FormStepNavigation,
  tags: ['autodocs'],
  args: {
    submitLabel: 'Avancar',
  },
} satisfies Meta<typeof FormStepNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const NextOnly: Story = {}

export const WithBack: Story = {
  args: {
    showBack: true,
    backLabel: 'Etapa anterior',
  },
}
