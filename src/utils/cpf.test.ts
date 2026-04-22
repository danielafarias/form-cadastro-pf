import { describe, expect, it } from 'vitest'
import { validateCPF } from './cpf'

describe('validateCPF', () => {
  it('valida CPF com máscara', () => {
    expect(validateCPF('529.982.247-25')).toBe(true)
  })

  it('valida CPF sem máscara', () => {
    expect(validateCPF('52998224725')).toBe(true)
  })

  it('rejeita CPF com dígitos repetidos', () => {
    expect(validateCPF('111.111.111-11')).toBe(false)
  })

  it('rejeita CPF com tamanho inválido', () => {
    expect(validateCPF('1234567890')).toBe(false)
  })

  it('rejeita CPF com dígitos verificadores inválidos', () => {
    expect(validateCPF('529.982.247-26')).toBe(false)
  })

  it('rejeita CPF conhecido como inválido', () => {
    expect(validateCPF('123.456.789-09')).toBe(false)
  })
})
