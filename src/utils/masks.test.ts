import { describe, it, expect } from 'vitest'
import {
  applyCpfMask,
  applyPhoneMask,
  applyDateMask,
  applyCurrencyMask,
  applyCepMask,
  stripMask,
  parseCurrencyToNumber,
} from './masks'

describe('applyCpfMask', () => {
  it('formata CPF completo corretamente', () => {
    expect(applyCpfMask('12345678900')).toBe('123.456.789-00')
  })

  it('formata CPF parcial', () => {
    expect(applyCpfMask('123456')).toBe('123.456')
  })

  it('remove caracteres não numéricos antes de formatar', () => {
    expect(applyCpfMask('123.456.789-00')).toBe('123.456.789-00')
  })

  it('limita a 11 dígitos', () => {
    expect(applyCpfMask('123456789001234')).toBe('123.456.789-00')
  })

  it('retorna string vazia para input vazio', () => {
    expect(applyCpfMask('')).toBe('')
  })

  it('formata 3 dígitos', () => {
    expect(applyCpfMask('123')).toBe('123')
  })

  it('formata com 4 dígitos', () => {
    expect(applyCpfMask('1234')).toBe('123.4')
  })
})

describe('applyPhoneMask', () => {
  it('formata celular (11 dígitos) corretamente', () => {
    expect(applyPhoneMask('11987654321')).toBe('(11) 98765-4321')
  })

  it('formata telefone fixo (10 dígitos)', () => {
    expect(applyPhoneMask('1134567890')).toBe('(11) 3456-7890')
  })

  it('remove caracteres não numéricos', () => {
    expect(applyPhoneMask('(11) 98765-4321')).toBe('(11) 98765-4321')
  })

  it('limita a 11 dígitos', () => {
    expect(applyPhoneMask('119876543211234')).toBe('(11) 98765-4321')
  })

  it('retorna string vazia para input vazio', () => {
    expect(applyPhoneMask('')).toBe('')
  })

  it('formata parcialmente com 2 dígitos', () => {
    expect(applyPhoneMask('11')).toBe('11')
  })
})

describe('applyDateMask', () => {
  it('formata data completa', () => {
    expect(applyDateMask('01012000')).toBe('01/01/2000')
  })

  it('formata data parcial com 2 dígitos', () => {
    expect(applyDateMask('01')).toBe('01')
  })

  it('formata data parcial com 3 dígitos', () => {
    expect(applyDateMask('011')).toBe('01/1')
  })

  it('remove caracteres não numéricos', () => {
    expect(applyDateMask('01/01/2000')).toBe('01/01/2000')
  })

  it('limita a 8 dígitos', () => {
    expect(applyDateMask('010120001234')).toBe('01/01/2000')
  })

  it('retorna string vazia para input vazio', () => {
    expect(applyDateMask('')).toBe('')
  })
})

describe('applyCurrencyMask', () => {
  it('formata valor monetário brasileiro', () => {
    expect(applyCurrencyMask('100000')).toBe('R$\xa01.000,00')
  })

  it('formata centavos', () => {
    expect(applyCurrencyMask('50')).toBe('R$\xa00,50')
  })

  it('retorna string vazia para input vazio', () => {
    expect(applyCurrencyMask('')).toBe('')
  })

  it('remove caracteres não numéricos antes de formatar', () => {
    const result = applyCurrencyMask('R$ 1.000,00')
    expect(result).toBe('R$\xa01.000,00')
  })

  it('formata valor grande', () => {
    const result = applyCurrencyMask('1000000')
    expect(result).toBe('R$\xa010.000,00')
  })
})

describe('applyCepMask', () => {
  it('formata CEP completo', () => {
    expect(applyCepMask('01001000')).toBe('01001-000')
  })

  it('formata CEP parcial', () => {
    expect(applyCepMask('01001')).toBe('01001')
  })

  it('remove caracteres não numéricos', () => {
    expect(applyCepMask('01001-000')).toBe('01001-000')
  })

  it('limita a 8 dígitos', () => {
    expect(applyCepMask('010010001234')).toBe('01001-000')
  })

  it('retorna string vazia para input vazio', () => {
    expect(applyCepMask('')).toBe('')
  })
})

describe('stripMask', () => {
  it('remove pontos e traços do CPF', () => {
    expect(stripMask('123.456.789-00')).toBe('12345678900')
  })

  it('remove parênteses e traços do telefone', () => {
    expect(stripMask('(11) 98765-4321')).toBe('11987654321')
  })

  it('remove traço do CEP', () => {
    expect(stripMask('01001-000')).toBe('01001000')
  })

  it('retorna string vazia para input vazio', () => {
    expect(stripMask('')).toBe('')
  })
})

describe('parseCurrencyToNumber', () => {
  it('converte string de moeda para número', () => {
    expect(parseCurrencyToNumber('R$ 1.000,00')).toBe(1000)
  })

  it('retorna 0 para string vazia', () => {
    expect(parseCurrencyToNumber('')).toBe(0)
  })

  it('converte centavos corretamente', () => {
    expect(parseCurrencyToNumber('50')).toBe(0.5)
  })
})
