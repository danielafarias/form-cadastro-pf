import { Button } from '@mantine/core'
import type { ButtonProps } from '@mantine/core'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type AppButtonProps = ButtonProps &
  ComponentPropsWithoutRef<'button'> & {
    children: ReactNode
  }

export function PrimaryButton({
  children,
  variant = 'gradient',
  gradient = { from: 'violet', to: 'blue', deg: 45 },
  size = 'md',
  ...props
}: AppButtonProps) {
  return (
    <Button variant={variant} gradient={gradient} size={size} {...props}>
      {children}
    </Button>
  )
}

export function SecondaryButton({
  children,
  variant = 'light',
  color = 'violet',
  size = 'md',
  ...props
}: AppButtonProps) {
  return (
    <Button variant={variant} color={color} size={size} {...props}>
      {children}
    </Button>
  )
}
