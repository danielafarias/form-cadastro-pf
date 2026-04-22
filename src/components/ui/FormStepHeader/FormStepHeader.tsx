import { Group, Text, Title } from '@mantine/core'
import type { ReactNode } from 'react'

type FormStepHeaderProps = {
  icon: ReactNode
  title: string
  description: string
}

export function FormStepHeader({ icon, title, description }: FormStepHeaderProps) {
  return (
    <Group gap="sm">
      {icon}
      <div>
        <Title order={3} c="violet.7">{title}</Title>
        <Text size="sm" c="dimmed">{description}</Text>
      </div>
    </Group>
  )
}
