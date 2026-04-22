const ETB = new Intl.NumberFormat('en-ET', {
  style: 'currency',
  currency: 'ETB',
  maximumFractionDigits: 2,
})

export function formatETB(amount: number) {
  return ETB.format(amount)
}

