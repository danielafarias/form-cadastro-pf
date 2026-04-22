import { Badge } from '@mantine/core'
import type { ReactNode } from 'react'

type HighlightBadgeProps = {
  children: ReactNode
}

export function HighlightBadge({ children }: HighlightBadgeProps) {
  return (
    <Badge
      variant="gradient"
      gradient={{ from: 'violet', to: 'blue', deg: 45 }}
      size="md"
      radius="sm"
    >
      {children}
    </Badge>
  )
}
