const knownInvalidCpfs = new Set(['12345678909'])

function calculateVerifierDigit(baseDigits: string, weightStart: number): number {
  let sum = 0
  for (let i = 0; i < baseDigits.length; i++) {
    sum += parseInt(baseDigits[i], 10) * (weightStart - i)
  }

  const remainder = (sum * 10) % 11
  return remainder === 10 ? 0 : remainder
}

export function validateCPF(value: string): boolean {
  const digits = value.replace(/\D/g, '')

  if (digits.length !== 11) return false
  if (/^(\d)\1+$/.test(digits)) return false
  if (knownInvalidCpfs.has(digits)) return false

  const firstVerifier = calculateVerifierDigit(digits.slice(0, 9), 10)
  if (firstVerifier !== parseInt(digits[9], 10)) return false

  const secondVerifier = calculateVerifierDigit(digits.slice(0, 10), 11)
  return secondVerifier === parseInt(digits[10], 10)
}
