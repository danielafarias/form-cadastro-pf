import { Group } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { PrimaryButton, SecondaryButton } from '@/components/ui/AppButton'

type FormStepNavigationProps = {
  submitLabel: string
  showBack?: boolean
  onBack?: () => void
  backLabel?: string
}

export function FormStepNavigation({
  submitLabel,
  showBack = false,
  onBack,
  backLabel = 'Voltar',
}: FormStepNavigationProps) {
  return (
    <Group justify={showBack ? 'space-between' : 'flex-end'} mt="md">
      {showBack && (
        <SecondaryButton
          type="button"
          onClick={onBack}
          leftSection={<IconArrowLeft size={16} />}
        >
          {backLabel}
        </SecondaryButton>
      )}
      <PrimaryButton
        type="submit"
        rightSection={<IconArrowRight size={16} />}
      >
        {submitLabel}
      </PrimaryButton>
    </Group>
  )
}
