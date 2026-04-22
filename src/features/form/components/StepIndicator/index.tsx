import {
  StepIndicator as UIStepIndicator,
  type StepIndicatorItem,
} from '@/components/ui'
import {
  IconUser,
  IconHome,
  IconBriefcase,
} from '@tabler/icons-react'

interface StepIndicatorProps {
  currentStep: number
}

const STEPS: StepIndicatorItem[] = [
  { label: 'Dados Pessoais', icon: IconUser },
  { label: 'Residencial', icon: IconHome },
  { label: 'Profissional', icon: IconBriefcase },
]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return <UIStepIndicator currentStep={currentStep} steps={STEPS} />
}
