import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconBriefcase, IconFileText, IconUser } from '@tabler/icons-react'
import { StepIndicator } from './StepIndicator'

const steps = [
  { label: 'Pessoal', icon: IconUser },
  { label: 'Profissional', icon: IconBriefcase },
  { label: 'Revisao', icon: IconFileText },
]

const meta = {
  title: 'UI/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
  args: {
    steps,
    currentStep: 1,
  },
} satisfies Meta<typeof StepIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const InProgress: Story = {}

export const Initial: Story = {
  args: {
    currentStep: 0,
  },
}

export const Completed: Story = {
  args: {
    currentStep: 2,
  },
}
