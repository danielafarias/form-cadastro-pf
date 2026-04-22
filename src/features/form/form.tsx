import { useState } from 'react'
import { Box, Container } from '@mantine/core'
import { AppCard, Header } from '@/components/ui'
import { StepIndicator } from '@/features/form/components/StepIndicator'
import { Step1PersonalData } from '@/features/form/components/steps/Step1PersonalData'
import { Step2ResidentialInfo } from '@/features/form/components/steps/Step2ResidentialInfo'
import { Step3ProfessionalInfo } from '@/features/form/components/steps/Step3ProfessionalInfo'
import { Summary } from '@/features/form/components/Summary'
import type { FormData, Step1Data, Step2Data, Step3Data } from '@/features/form/types'
import classes from './Form.module.css'

const TOTAL_STEPS = 3

const initialFormData: FormData = {
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  telefone: '',
  email: '',
  cep: '',
  logradouro: '',
  bairro: '',
  cidade: '',
  estado: '',
  empresa: '',
  profissao: '',
  salario: '',
  tempoEmpresa: '',
}

export function Form() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  function handleStep1Next(data: Step1Data) {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(1)
  }

  function handleStep2Next(data: Step2Data) {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(2)
  }

  function handleStep3Next(data: Step3Data) {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep(3)
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  function handleRestart() {
    setFormData(initialFormData)
    setCurrentStep(0)
  }

  const isSummary = currentStep === TOTAL_STEPS

  return (
    <Box className={classes.page}>
      <Header />
      <Container size="sm" pb="xl">
        {!isSummary && (
          <AppCard className={classes.indicatorCard} mb="md">
            <StepIndicator currentStep={currentStep} />
          </AppCard>
        )}

        <AppCard p="xl" className={classes.formCard}>
          {currentStep === 0 && (
            <Step1PersonalData
              initialData={formData}
              onNext={handleStep1Next}
            />
          )}
          {currentStep === 1 && (
            <Step2ResidentialInfo
              initialData={formData}
              onNext={handleStep2Next}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <Step3ProfessionalInfo
              initialData={formData}
              onNext={handleStep3Next}
              onBack={handleBack}
            />
          )}
          {isSummary && (
            <Summary
              data={formData}
              onBack={handleBack}
              onRestart={handleRestart}
            />
          )}
        </AppCard>
      </Container>
    </Box>
  )
}
