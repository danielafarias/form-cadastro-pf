import { Box, Container, Group, Text } from '@mantine/core'
import { IconForms } from '@tabler/icons-react'
import { HighlightBadge } from '@/components/ui/HighlightBadge'
import classes from './Header.module.css'

type HeaderProps = {
  title?: string
  subtitle?: string
  stepsLabel?: string
}

export function Header({
  title = 'Cadastro e Exportação',
  subtitle = 'Pessoa Física',
  stepsLabel = '3 etapas',
}: HeaderProps) {
  return (
    <Box component="header" className={classes.header}>
      <Container size="sm">
        <Group justify="space-between" align="center" h="100%">
          <Group gap="sm">
            <Box className={classes.logoIcon}>
              <IconForms size={22} color="white" />
            </Box>
            <div>
              <Text fw={800} size="lg" className={classes.logoText}>
                {title}
              </Text>
              <Text size="xs" c="dimmed" lh={1}>
                {subtitle}
              </Text>
            </div>
          </Group>

          <HighlightBadge>{stepsLabel}</HighlightBadge>
        </Group>
      </Container>
    </Box>
  )
}
