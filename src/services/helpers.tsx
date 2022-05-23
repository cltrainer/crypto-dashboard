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
  const currency = 'USD'
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(value)
}
