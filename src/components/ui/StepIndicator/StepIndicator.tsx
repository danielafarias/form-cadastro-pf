import { Box, Group, Text, ThemeIcon } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import classes from './StepIndicator.module.css'

export type StepIndicatorItem = {
  label: string
  icon: ComponentType<{ size?: number }>
}

type StepIndicatorProps = {
  currentStep: number
  steps: StepIndicatorItem[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <Box className={classes.wrapper}>
      <Group justify="center" gap={0} wrap="nowrap">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index < currentStep
          const isActive = index === currentStep

          return (
            <Group key={step.label} gap={0} wrap="nowrap">
              <Box className={classes.stepItem}>
                <ThemeIcon
                  size={44}
                  radius="xl"
                  variant={isCompleted || isActive ? 'gradient' : 'light'}
                  gradient={isCompleted || isActive ? { from: 'violet', to: 'blue', deg: 45 } : undefined}
                  color={isCompleted || isActive ? undefined : 'gray'}
                  className={`${classes.stepIcon} ${isActive ? classes.active : ''} ${isCompleted ? classes.completed : ''}`}
                >
                  {isCompleted ? <IconCheck size={20} /> : <Icon size={20} />}
                </ThemeIcon>
                <Text
                  size="xs"
                  fw={isActive ? 700 : 500}
                  c={isActive ? 'violet.7' : isCompleted ? 'violet.5' : 'dimmed'}
                  mt={6}
                  ta="center"
                  className={classes.stepLabel}
                >
                  {step.label}
                </Text>
              </Box>

              {index < steps.length - 1 && (
                <Box
                  className={`${classes.connector} ${index < currentStep ? classes.connectorCompleted : ''}`}
                />
              )}
            </Group>
          )
        })}
      </Group>
    </Box>
  )
}
