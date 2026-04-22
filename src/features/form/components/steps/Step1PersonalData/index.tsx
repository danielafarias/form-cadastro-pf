import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput, Stack } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { FormStepHeader, FormStepNavigation } from '@/components/ui'
import { step1Schema, type Step1FormValues } from '@/features/form/schemas'
import { applyCpfMask, applyPhoneMask, applyDateMask } from '@/utils/masks'
import type { Step1Data } from '@/features/form/types'

interface Step1Props {
  initialData?: Partial<Step1Data>
  onNext: (data: Step1Data) => void
}

export function Step1PersonalData({ initialData, onNext }: Step1Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      nomeCompleto: initialData?.nomeCompleto ?? '',
      dataNascimento: initialData?.dataNascimento ?? '',
      cpf: initialData?.cpf ?? '',
      telefone: initialData?.telefone ?? '',
      email: initialData?.email ?? '',
    },
  })

  function onSubmit(data: Step1FormValues) {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="lg">
        <FormStepHeader
          icon={<IconUser size={24} color="var(--mantine-color-violet-6)" />}
          title="Dados Pessoais"
          description="Preencha suas informações pessoais"
        />

        <TextInput
          label="Nome Completo"
          placeholder="Digite seu nome completo"
          error={errors.nomeCompleto?.message}
          required
          {...register('nomeCompleto')}
        />

        <Controller
          name="dataNascimento"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Data de Nascimento"
              placeholder="DD/MM/AAAA"
              error={errors.dataNascimento?.message}
              required
              value={field.value}
              onChange={(e) => field.onChange(applyDateMask(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="cpf"
          control={control}
          render={({ field }) => (
            <TextInput
              label="CPF"
              placeholder="000.000.000-00"
              error={errors.cpf?.message}
              required
              value={field.value}
              onChange={(e) => field.onChange(applyCpfMask(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="telefone"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Telefone"
              placeholder="(00) 00000-0000"
              error={errors.telefone?.message}
              required
              value={field.value}
              onChange={(e) => field.onChange(applyPhoneMask(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <TextInput
          label="E-mail"
          placeholder="seu@email.com"
          type="email"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <FormStepNavigation submitLabel="Próximo" />
      </Stack>
    </form>
  )
}
