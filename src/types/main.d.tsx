export interface ErrorResponseFunction {
  (error: Error): void
}

export interface CoinResponse {
  [key: string]: string | number
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
}
