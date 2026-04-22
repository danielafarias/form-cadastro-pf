import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeIcon } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { FormStepHeader } from './FormStepHeader'

const meta = {
  title: 'UI/FormStepHeader',
  component: FormStepHeader,
  tags: ['autodocs'],
  args: {
    icon: (
      <ThemeIcon size="lg" radius="xl" variant="light" color="violet">
        <IconUser size={18} />
      </ThemeIcon>
    ),
    title: 'Dados pessoais',
    description: 'Informe os dados basicos para iniciar o cadastro.',
  },
} satisfies Meta<typeof FormStepHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
