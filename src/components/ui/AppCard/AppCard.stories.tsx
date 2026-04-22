import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack, Text } from '@mantine/core'
import { AppCard } from './AppCard'

const meta = {
  title: 'UI/AppCard',
  component: AppCard,
  tags: ['autodocs'],
  args: {
    p: 'lg',
    w: 420,
  },
} satisfies Meta<typeof AppCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <AppCard {...args}>
      <Stack gap="xs">
        <Text fw={600}>Cartao padrao</Text>
        <Text size="sm" c="dimmed">
          Use este container para agrupar campos e secoes do formulario.
        </Text>
      </Stack>
    </AppCard>
  ),
}
