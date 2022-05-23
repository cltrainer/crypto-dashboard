export const getCurrentTimestamp: () => string = () => {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }
  return new Intl.DateTimeFormat('en-US', options).format(today)
}

export const formatPrice: (value: number) => string = value => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 1 ? 2 : 8 // show more decimal place for price tend to zero
  }
  return new Intl.NumberFormat('en-IN', options).format(value)
}
