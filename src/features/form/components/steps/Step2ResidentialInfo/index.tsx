import { useEffect } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  Stack,
  Loader,
  Alert,
  SimpleGrid,
} from '@mantine/core'
import {
  IconHome,
  IconAlertCircle,
} from '@tabler/icons-react'
import { FormStepHeader, FormStepNavigation } from '@/components/ui'
import { step2Schema, type Step2FormValues } from '@/features/form/schemas'
import { useCepLookup } from '@/features/form/hooks/useCepLookup'
import type { Step2Data } from '@/features/form/types'
import { applyCepMask } from '@/utils/masks'

interface Step2Props {
  initialData?: Partial<Step2Data>
  onNext: (data: Step2Data) => void
  onBack: () => void
}

export function Step2ResidentialInfo({ initialData, onNext, onBack }: Step2Props) {
  const { loading, error: cepError, lookup } = useCepLookup()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      cep: initialData?.cep ?? '',
      logradouro: initialData?.logradouro ?? '',
      bairro: initialData?.bairro ?? '',
      cidade: initialData?.cidade ?? '',
      estado: initialData?.estado ?? '',
    },
  })

  const cepValue = useWatch({
    control,
    name: 'cep',
  })

  useEffect(() => {
    const digits = cepValue?.replace(/\D/g, '') ?? ''
    if (digits.length === 8) {
      lookup(cepValue).then((data) => {
        if (data) {
          setValue('logradouro', data.logradouro, { shouldValidate: true })
          setValue('bairro', data.bairro, { shouldValidate: true })
          setValue('cidade', data.cidade, { shouldValidate: true })
          setValue('estado', data.estado, { shouldValidate: true })
        }
      })
    }
  }, [cepValue, lookup, setValue])

  function onSubmit(data: Step2FormValues) {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="lg">
        <FormStepHeader
          icon={<IconHome size={24} color="var(--mantine-color-violet-6)" />}
          title="Informações Residenciais"
          description="Informe seu endereço completo"
        />

        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <TextInput
              label="CEP"
              placeholder="00000-000"
              error={errors.cep?.message}
              required
              rightSection={loading ? <Loader size="xs" color="violet" /> : null}
              value={field.value}
              onChange={(e) => field.onChange(applyCepMask(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        {cepError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="orange"
            variant="light"
          >
            {cepError}
          </Alert>
        )}

        <TextInput
          label="Endereço"
          placeholder="Rua, Avenida, etc."
          error={errors.logradouro?.message}
          required
          {...register('logradouro')}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Bairro"
            placeholder="Seu bairro"
            error={errors.bairro?.message}
            required
            {...register('bairro')}
          />

          <TextInput
            label="Cidade"
            placeholder="Sua cidade"
            error={errors.cidade?.message}
            required
            {...register('cidade')}
          />
        </SimpleGrid>

        <TextInput
          label="Estado (UF)"
          placeholder="Ex: SP"
          maxLength={2}
          error={errors.estado?.message}
          required
          styles={{ input: { textTransform: 'uppercase' } }}
          {...register('estado', {
            onChange: (e) => {
              e.target.value = e.target.value.toUpperCase()
            },
          })}
        />

        <FormStepNavigation showBack onBack={onBack} submitLabel="Próximo" />
      </Stack>
    </form>
  )
}
