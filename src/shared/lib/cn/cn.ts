type ClassValue = string | number | false | null | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = []
  const walk = (value: ClassValue) => {
    if (!value && value !== 0) return
    if (Array.isArray(value)) {
      for (const v of value) walk(v)
      return
    }
    if (typeof value === 'string' || typeof value === 'number') {
      const trimmed = String(value).trim()
      if (trimmed) out.push(trimmed)
    }
  }
  for (const input of inputs) walk(input)
  return out.join(' ')
}
