import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TextInput,
  Stack,
  Select,
  Alert,
  Loader,
} from '@mantine/core'
import {
  IconBriefcase,
  IconAlertCircle,
} from '@tabler/icons-react'
import { FormStepHeader, FormStepNavigation } from '@/components/ui'
import { useProfessions } from '@/features/form/hooks/useProfessions'
import { step3Schema, type Step3FormValues } from '@/features/form/schemas'
import type { Step3Data } from '@/features/form/types'
import { applyCurrencyMask } from '@/utils/masks'

interface Step3Props {
  initialData?: Partial<Step3Data>
  onNext: (data: Step3Data) => void
  onBack: () => void
}

const TEMPO_EMPRESA_OPTIONS = [
  { value: 'menos-1-ano', label: 'Menos de 1 ano' },
  { value: '1-2-anos', label: '1 a 2 anos' },
  { value: '2-5-anos', label: '2 a 5 anos' },
  { value: '5-10-anos', label: '5 a 10 anos' },
  { value: 'mais-10-anos', label: 'Mais de 10 anos' },
]

export function Step3ProfessionalInfo({ initialData, onNext, onBack }: Step3Props) {
  const { profissoes, loading: loadingProfissoes, error: profissoesError } = useProfessions()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3FormValues>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      empresa: initialData?.empresa ?? '',
      profissao: initialData?.profissao ?? '',
      salario: initialData?.salario ?? '',
      tempoEmpresa: initialData?.tempoEmpresa ?? '',
    },
  })

  function onSubmit(data: Step3FormValues) {
    onNext(data)
  }

  const profissoesOptions = profissoes.map((p) => ({
    value: p.nome,
    label: p.nome,
  }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="lg">
        <FormStepHeader
          icon={<IconBriefcase size={24} color="var(--mantine-color-violet-6)" />}
          title="Informações Profissionais"
          description="Dados sobre sua carreira e empresa"
        />

        <TextInput
          label="Empresa"
          placeholder="Nome da sua empresa"
          error={errors.empresa?.message}
          required
          {...register('empresa')}
        />

        {profissoesError && (
          <Alert icon={<IconAlertCircle size={16} />} color="orange" variant="light">
            {profissoesError}
          </Alert>
        )}

        <Controller
          name="profissao"
          control={control}
          render={({ field }) => (
            <Select
              label="Profissão"
              placeholder={loadingProfissoes ? 'Carregando...' : 'Selecione sua profissão'}
              data={profissoesOptions}
              error={errors.profissao?.message}
              required
              disabled={loadingProfissoes}
              rightSection={loadingProfissoes ? <Loader size="xs" color="violet" /> : undefined}
              searchable
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="salario"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Salário"
              placeholder="R$ 0,00"
              error={errors.salario?.message}
              required
              value={field.value}
              onChange={(e) => field.onChange(applyCurrencyMask(e.target.value))}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <Controller
          name="tempoEmpresa"
          control={control}
          render={({ field }) => (
            <Select
              label="Tempo de Empresa"
              placeholder="Selecione o tempo na empresa"
              data={TEMPO_EMPRESA_OPTIONS}
              error={errors.tempoEmpresa?.message}
              required
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />

        <FormStepNavigation showBack onBack={onBack} submitLabel="Ver Resumo" />
      </Stack>
    </form>
  )
}
