import { describe, it, expect } from 'vitest'
import { step1Schema, step2Schema, step3Schema } from './index'

describe('step1Schema', () => {
  const validData = {
    nomeCompleto: 'João Silva',
    dataNascimento: '15/06/1990',
    cpf: '529.982.247-25',
    telefone: '(11) 98765-4321',
    email: 'joao@email.com',
  }

  it('valida dados corretos', () => {
    const result = step1Schema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejeita nome muito curto', () => {
    const result = step1Schema.safeParse({ ...validData, nomeCompleto: 'Jo' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('3 caracteres')
    }
  })

  it('rejeita nome com números', () => {
    const result = step1Schema.safeParse({ ...validData, nomeCompleto: 'João 123' })
    expect(result.success).toBe(false)
  })

  it('rejeita data de nascimento inválida', () => {
    const result = step1Schema.safeParse({ ...validData, dataNascimento: '32/13/2000' })
    expect(result.success).toBe(false)
  })

  it('rejeita data futura', () => {
    const result = step1Schema.safeParse({ ...validData, dataNascimento: '01/01/2099' })
    expect(result.success).toBe(false)
  })

  it('rejeita data com ano muito antigo', () => {
    const result = step1Schema.safeParse({ ...validData, dataNascimento: '01/01/1800' })
    expect(result.success).toBe(false)
  })

  it('rejeita CPF com formato inválido', () => {
    const result = step1Schema.safeParse({ ...validData, cpf: '123.456.789' })
    expect(result.success).toBe(false)
  })

  it('rejeita CPF com dígitos iguais', () => {
    const result = step1Schema.safeParse({ ...validData, cpf: '111.111.111-11' })
    expect(result.success).toBe(false)
  })

  it('rejeita CPF com dígitos verificadores errados', () => {
    const result = step1Schema.safeParse({ ...validData, cpf: '123.456.789-00' })
    expect(result.success).toBe(false)
  })

  it('rejeita telefone com formato inválido', () => {
    const result = step1Schema.safeParse({ ...validData, telefone: '11987654321' })
    expect(result.success).toBe(false)
  })

  it('rejeita email inválido', () => {
    const result = step1Schema.safeParse({ ...validData, email: 'nao-é-email' })
    expect(result.success).toBe(false)
  })

  it('rejeita campos obrigatórios vazios', () => {
    const result = step1Schema.safeParse({
      nomeCompleto: '',
      dataNascimento: '',
      cpf: '',
      telefone: '',
      email: '',
    })
    expect(result.success).toBe(false)
  })
})

describe('step2Schema', () => {
  const validData = {
    cep: '01001-000',
    logradouro: 'Praça da Sé',
    bairro: 'Sé',
    cidade: 'São Paulo',
    estado: 'SP',
  }

  it('valida dados corretos', () => {
    const result = step2Schema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejeita CEP com formato inválido', () => {
    const result = step2Schema.safeParse({ ...validData, cep: '01001000' })
    expect(result.success).toBe(false)
  })

  it('rejeita CEP incompleto', () => {
    const result = step2Schema.safeParse({ ...validData, cep: '0100-1' })
    expect(result.success).toBe(false)
  })

  it('rejeita logradouro muito curto', () => {
    const result = step2Schema.safeParse({ ...validData, logradouro: 'Ru' })
    expect(result.success).toBe(false)
  })

  it('rejeita bairro muito curto', () => {
    const result = step2Schema.safeParse({ ...validData, bairro: 'S' })
    expect(result.success).toBe(false)
  })

  it('rejeita cidade muito curta', () => {
    const result = step2Schema.safeParse({ ...validData, cidade: 'S' })
    expect(result.success).toBe(false)
  })

  it('rejeita estado com mais de 2 caracteres', () => {
    const result = step2Schema.safeParse({ ...validData, estado: 'SPO' })
    expect(result.success).toBe(false)
  })

  it('rejeita estado vazio', () => {
    const result = step2Schema.safeParse({ ...validData, estado: '' })
    expect(result.success).toBe(false)
  })
})

describe('step3Schema', () => {
  const validData = {
    empresa: 'Empresa ABC',
    profissao: 'Engenheiro(a) de Software',
    salario: 'R$ 5.000,00',
    tempoEmpresa: '2-5-anos',
  }

  it('valida dados corretos', () => {
    const result = step3Schema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejeita empresa muito curta', () => {
    const result = step3Schema.safeParse({ ...validData, empresa: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejeita profissão vazia', () => {
    const result = step3Schema.safeParse({ ...validData, profissao: '' })
    expect(result.success).toBe(false)
  })

  it('rejeita salário vazio', () => {
    const result = step3Schema.safeParse({ ...validData, salario: '' })
    expect(result.success).toBe(false)
  })

  it('rejeita tempo de empresa vazio', () => {
    const result = step3Schema.safeParse({ ...validData, tempoEmpresa: '' })
    expect(result.success).toBe(false)
  })
})
