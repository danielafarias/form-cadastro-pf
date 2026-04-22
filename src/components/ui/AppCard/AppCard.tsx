import { Card } from '@mantine/core'
import type { CardProps } from '@mantine/core'

type AppCardProps = CardProps

export function AppCard({ withBorder = true, radius = 'lg', shadow = 'md', ...props }: AppCardProps) {
  return <Card withBorder={withBorder} radius={radius} shadow={shadow} {...props} />
}
