import { z } from 'zod'

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
const cepRegex = /^\d{5}-\d{3}$/

function validateDate(value: string): boolean {
  if (!dateRegex.test(value)) return false
  const [day, month, year] = value.split('/').map(Number)
  const date = new Date(year, month - 1, day)
  const now = new Date()
  if (date > now) return false
  if (year < 1900) return false
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

function validateCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1+$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i)
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(digits[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  return remainder === parseInt(digits[10])
}

export const step1Schema = z.object({
  nomeCompleto: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras'),
  dataNascimento: z
    .string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine(validateDate, 'Data de nascimento inválida'),
  cpf: z
    .string()
    .regex(cpfRegex, 'Formato de CPF inválido (000.000.000-00)')
    .refine(validateCpf, 'CPF inválido'),
  telefone: z
    .string()
    .regex(phoneRegex, 'Formato de telefone inválido ((00) 00000-0000)'),
  email: z.string().email('E-mail inválido'),
})

export const step2Schema = z.object({
  cep: z.string().regex(cepRegex, 'Formato de CEP inválido (00000-000)'),
  logradouro: z.string().min(3, 'Endereço é obrigatório'),
  bairro: z.string().min(2, 'Bairro é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  estado: z.string().length(2, 'Estado inválido'),
})

export const step3Schema = z.object({
  empresa: z.string().min(2, 'Empresa é obrigatória'),
  profissao: z.string().min(1, 'Profissão é obrigatória'),
  salario: z.string().min(1, 'Salário é obrigatório'),
  tempoEmpresa: z.string().min(1, 'Tempo de empresa é obrigatório'),
})

export type Step1FormValues = z.infer<typeof step1Schema>
export type Step2FormValues = z.infer<typeof step2Schema>
export type Step3FormValues = z.infer<typeof step3Schema>
