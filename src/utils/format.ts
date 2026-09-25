/**
 * Format price in FCFA (West African CFA franc)
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' FCFA'
}

/**
 * Format date in French
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Generate order number like #DBS10245
 */
export function generateOrderNumber(): string {
  const num = Math.floor(10000 + Math.random() * 90000)
  return `DBS${num}`
}

/**
 * Calculate discount percentage
 */
export function calcDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0
  return Math.round(((original - current) / original) * 100)
}
